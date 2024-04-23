import express from 'express';
import { AdvisorModel } from '../dataModels/advisorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StudentModel } from '../dataModels/studentModel.js';
import { AppointmentModel } from '../dataModels/appointmentModel.js';
const advisorRouter = express.Router();


// use bcryptSalt to encrypt password
const bcryptSalt = bcrypt.genSaltSync(10);
advisorRouter.post('/register', async (req, res) => {
    // get the request body 
    const { name, email, userName, password } = req.body;
    // create a new student from request body
    // use bcrypt to hash the password
    try {
        const newAdvisor = await AdvisorModel.create({
            name,
            email,
            userName,
            password: bcrypt.hashSync(password, bcryptSalt),
            isLeadAdvisor: false
        });
        res.json(newAdvisor);
        console.log(`New advisor added: ${name} `);
    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
});


//jwt secret to securely transmit message
const jwtSecret = "a134asd8b8d9d0a89f8b7e72dv2";
const refreshSecret = "a134aadf9asb81129sdfass2";
advisorRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Email and password are required');
        return res.status(400).json({ 'message': 'Email and password are required.' });
    }


    // check if the email is in the DB
    const checkAdvisor = await AdvisorModel.findOne({ email });
    // if not, send back status
    if (!checkAdvisor) {
        console.log('Email is not in DB');
        return res.status(401).json('Email is not in DB');
    }

    if (checkAdvisor) {
        //check if the password matched
        const passOk = bcrypt.compareSync(password, checkAdvisor.password);

        if (passOk) {
            // AccessToken
            const role = checkAdvisor.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": checkAdvisor.email,
                        "role": role
                    }
                },
                jwtSecret,
                { expiresIn: '30min' }
            );

            // RefreshToken 
            const refreshToken = jwt.sign(
                { "username": checkAdvisor.email },
                refreshSecret,
                { expiresIn: '1d' }
            );


            checkAdvisor.refreshToken = refreshToken;
            const result = await checkAdvisor.save();
            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            res.json({ role, accessToken });

        } else {
            res.status(400).json('Password Incorrect');
        }
    }
});


// get all student in the db
advisorRouter.get('/fetchAllStudent', async (req, res) => {
    try {
        // Populate the field assigned advisor
        const students = await StudentModel.aggregate([
            {
                $lookup: {
                    from: "advisors", // Collection name of advisors
                    localField: "assignedAdvisor",
                    foreignField: "_id",
                    as: "assignedAdvisor"
                }
            },
            {
                $addFields: {
                    assignedAdvisor: { $arrayElemAt: ["$assignedAdvisor.name", 0] },
                    assignedAdvisorId: { $arrayElemAt: ["$assignedAdvisor._id", 0] }
                }
            }
        ]);
        
        return res.status(200).json({
            individualStudent: students
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// make an appointment for students and advisor
advisorRouter.post('/makeAppointment', async (req, res) => {
    const { studentId, advisorId, dateTime, task, description, recurrence } = req.body;

    try {
        
        const student = await StudentModel.findById(studentId);
        const advisor = await AdvisorModel.findById(advisorId);

        // Check if both student and advisor exist
        if (!student || !advisor) {
            console.log(res.status(404));
            return res.status(404).json({ message: 'Student or advisor not found.' });
        }

        // Check if the advisor is the corresponding advisor to the student
        if (!student.assignedAdvisor[0].equals(advisor._id)) {
            console.log(res.status(403));
            return res.status(403).json({ message: 'Advisor is not assigned to the student.' });
        }

        // Check if there's an existing appointment with the same date and time
        const existingAppointment = await AppointmentModel.findOne({ dateTime });
        if (existingAppointment) {
            console.log(res.status(409));
            return res.status(409).json({ message: 'An appointment already exists at the specified date and time.' });
        }

        // Check if the dateTime is in the future
        if (new Date(dateTime) <= new Date()) {
            console.log(res.status(400));
            return res.status(400).json({ message: 'Appointment date must be in the future.' });
        }
        
        
        // Create a new appointment
        const newAppointmentData = {
            student: studentId,
            advisor: advisorId,
            dateTime,
            task,
            description,
        };


        // Add recurrence data if provided
        if (recurrence) {
            newAppointmentData.recurrence = recurrence;
        }

        const newAppointment = await AppointmentModel.create(newAppointmentData);

        // Add the new appointment to the student's appointments
        student.appointments.push(newAppointment._id);

        // Add the new appointment to the advisor's appointments
        advisor.appointments.push(newAppointment._id);

        // Save changes to both student and advisor documents
        await student.save();
        await advisor.save();

        res.status(201).json(newAppointment);
        console.log('New appointment created:', newAppointment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create appointment.', error });
    }
});


//assign student to advisor and vice versa
async function assignAdvisorToStudent(advisorId, studentId) {
    try {
        const student = await StudentModel.findById(studentId);
        const advisor = await AdvisorModel.findById(advisorId);

        // Check if both student and advisor exist
        if (!student || !advisor) {
            throw new Error('Student or advisor not found.');
        }
 
        // Check if the advisor already has the student in their list of assigned students
        if (advisor.assignedStudents.includes(studentId)) {
            throw new Error('Advisor already assigned to the student.');
        }

        // Assign the advisor to the student and the student to the advisor
        student.assignedAdvisor = advisorId;
        advisor.assignedStudents.push(studentId);

        await Promise.all([student.save(), advisor.save()]);
        return { success: true, message: 'Advisor successfully assigned to student.' };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Endpoint to assign a student to an advisor or an advisor to a student
advisorRouter.post('/assign', async (req, res) => {
    try {
        const { advisorId, studentId } = req.body;
        const result = await assignAdvisorToStudent(advisorId, studentId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Fetch all appointment tied to the advisor ID
    // get appointment id from advisor
    // get those appointment id from appointmentModel
    // return all data of each appointment as an array of appointment
// Not done
advisorRouter.post('/getAllAppointment', async (req, res) => {
    try {
      // Get advisor id from the request body
      const { advisorId } = req.body;
  
      // Find the advisor in the database
      const advisor = await AdvisorModel.findById(advisorId);
      if (!advisor) {
        console.log('Advisor not found');
        throw new Error('Advisor not found.');
      }
  
      // Fetch the appointments for the advisor including studentName and advisorName
      const appointments = await AppointmentModel.find({ advisor: advisorId })
        .populate({
          path: 'student',
          select: 'name',
          model: 'Student'
        }) // Populate studentName field
        .populate({
          path: 'advisor',
          select: 'name',
          model: 'Advisor'
        }); // Populate advisorName field
  
      // Map appointments and create a new array with required fields
      const mappedAppointments = appointments.map(appointment => ({
        id: appointment._id,
        student: appointment.student._id,
        studentName: appointment.student.name, 
        advisor: appointment.advisor._id,
        advisorName: appointment.advisor.name, 
        start: appointment.dateTime,
        title: appointment.task,
        description: appointment.description,
        recurrence: appointment.recurrence
      }));
  
      return res.status(200).json(mappedAppointments);
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

advisorRouter.post('/editAppointmentRecurrence', async (req, res) => {
    try {
        // Get advisor ID, appointment ID, and recurrence data from request body
        const { appointmentId, frequency, interval } = req.body;

        // Find the appointment by ID
        const appointment = await AppointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Update the recurrence
        appointment.recurrence.frequency = frequency;
        appointment.recurrence.interval = interval;

        await appointment.save();

        return res.status(200).json({
            message: 'Recurrence updated successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to Update Appointment 500' });
    }
});


export default advisorRouter;