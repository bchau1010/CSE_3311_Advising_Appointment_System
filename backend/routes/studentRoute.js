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
    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
});

//jwt secret to securely transmit message
const jwtSecret = "a134asd8b8d9d0a89f8b7e72dv2";

studentRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    // check if the email is in the DB
    const checkStudent = await StudentModel.findOne({email});

    if (checkStudent){
        //check if the password matched
        const passOk = bcrypt.compareSync(password, checkStudent.password);
        
        if(passOk){
            // make jwt sign the email and id, to make sure it matched the DB instances
            jwt.sign({email: checkStudent.email, id: checkStudent._id}, jwtSecret, {},(error,token)=>{
                if(error) throw error;
                res.cookie('token', token).json('Password Matched!');
            });
            
        }else{
            res.status(422).json('Password Incorrect');
        }
    }else{
        res.json('student not found');
    }
});




export default studentRouter;