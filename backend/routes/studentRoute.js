import express from 'express';
import { StudentModel } from '../dataModels/studentModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const studentRouter = express.Router();


/*
studentRouter.post('/',async(request,response)=>{
    try {
        // Validate the request first
        if(!request.body.name||!request.body.email||!request.body.userName||!request.body.password||!request.body.major){
            return response.status(400).send({
                message:'Send all required field'
            })
        }

        const newStudent={
            name: request.body.name,
            email: request.body.email,
            userName: request.body.userName,
            password: request.body.password,
            major: request.body.major
        };
        // wait for the StudentModel to create a newStudent
        const student = await StudentModel.create(newStudent);
        // send the response status and the newly created student to the client
        return response.status(201).send(student);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
*/


// use bcryptSalt to encrypt password
const bcryptSalt = bcrypt.genSaltSync(10);

studentRouter.post('/register', async (req, res) => {
    // get the request body 
    const { name, email, userName, password, major } = req.body;

    // create a new student from request body
    // use bcrypt to hash the password
    try {
        const newStudent = await StudentModel.create({
            name,
            email,
            userName,
            password: bcrypt.hashSync(password, bcryptSalt),
            major
        });
        res.json(newStudent);
        console.log(`New student added: ${name} `);
    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
});

//jwt secret to securely transmit message
const jwtSecret = "a134asd8b8d9d0a89f8b7e72dv2";
const refreshSecret = "a134aadf9asb81129sdfass2";

studentRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Email and password are required');
        return res.status(400).json({ 'message': 'Email and password are required.' });
    }
    

    // check if the email is in the DB
    const checkStudent = await StudentModel.findOne({ email });
    // if not, send back status
    if (!checkStudent){
        console.log('Email is not in DB');
        return res.status(401).json('Email is not in DB');
    }

    if (checkStudent) {
        //check if the password matched
        const passOk = bcrypt.compareSync(password, checkStudent.password);

        if (passOk) {
            // make jwt sign the email and id, to make sure it matched the DB instances
            /*jwt.sign({ email: checkStudent.email, id: checkStudent._id }, jwtSecret, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token', token).json('Password Matched!');
            }); 
            */
            // AccessToken
            const role = checkStudent.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": checkStudent.email,
                        "role": role
                    }
                },
                jwtSecret,
                { expiresIn: '30min' }
            );

            // RefreshToken 
            const refreshToken = jwt.sign(
                { "username": checkStudent.email },
                refreshSecret,
                { expiresIn: '1d' }
            );


            checkStudent.refreshToken = refreshToken;
            const result = await checkStudent.save();
            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            res.json({ role, accessToken });

        } else {
            res.status(400).json('Password Incorrect');
        }
    }
});




export default studentRouter;