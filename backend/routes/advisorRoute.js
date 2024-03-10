import express from 'express';
import {AdvisorModel} from '../dataModels/advisorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    if (!checkAdvisor){
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


export default advisorRouter;