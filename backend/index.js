import express, {response} from "express";
import {PORT,mongoDB_URL} from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import studentRouter from "./routes/studentRoute.js";
import advisorRouter from "./routes/advisorRoute.js";


const app = express();
app.use(express.json());

// Allow requests from any origin
/*
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
*/ 


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/student',studentRouter);
app.use('/advisor',advisorRouter);


// run using `nodemon index.js`
app.get('/test', (req,res) => {
    res.json('testing');
    console.log("INIT TEST");
});


mongoose
    .connect(mongoDB_URL)
    .then(()=>{
        console.log('Connect to mongoDB Successfully!');

        // Start the server
        //app.listen(PORT, ()=>{
        //    console.log(`Server Started on PORT: ${PORT}`);
        //});
        app.listen(PORT,'0.0.0.0' ,()=>{
           console.log(`Server Started on PORT: ${PORT}`);
        });

    })
    .catch((error)=>{
        console.log(error);
    });