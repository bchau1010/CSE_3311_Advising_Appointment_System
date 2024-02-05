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
            address:{},
            email: {
                type: String,
                required: false
            }

        },
        reminderPreference: {
            phone: {
                type: Number,
                required: false
            },
            email: {
                type: String,
                required: false
            }
        },
        appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],

    }
);

export const StudentModel = mongoose.model('Student',studentSchema);