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
            type: String,
            default:null
        },
        assignedStudents: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Student',default: null }
        ],
        appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment',default: null }],
        role: {
            type: Number,
            required: true,
            default: 2
        },
        refreshToken: String
    },
    {
        timestamps: true,
    }
);

export const AdvisorModel = mongoose.model('Advisor',advisorSchema);