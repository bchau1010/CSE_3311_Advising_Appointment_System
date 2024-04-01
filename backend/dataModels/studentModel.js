// this will create a structure(or schema) for book database using mongoose
import mongoose from "mongoose";


const studentSchema = mongoose.Schema(
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
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            required: true,
        },
        contactDetail: {
            address:{type: String, default: null},
            email: {
                type: String,
                required: false,
                default: null
            }
        },
        reminderPreference: {
            reminder: {type: Boolean},
            text: {type: Number, default: null},
            phone: {
                type: Number,
                required: false, 
                default: null
            },
            email: {
                type: String,
                required: false,
                default: null
            }
        },
        appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
        assignedAdvisor: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Advisor', unique: true,default: null }
        ],
        role:{
            type: Number,
            required: true,
            default: 1
        },
        refreshToken: String
    }
);

export const StudentModel = mongoose.model('Student',studentSchema);