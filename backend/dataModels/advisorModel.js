// this will create a structure(or schema) for book database using mongoose
import mongoose from "mongoose";


const advisorSchema = mongoose.Schema(
    //this is an object that contain title, author and publishYear
    //another object at the end that contain timestamps 
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        contactDetail: {

        }
    },
    {
        timestamps: true,
    }
);

export const AdvisorModel = mongoose.model('Advisor',advisorSchema);