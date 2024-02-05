// this will create a structure(or schema) for book database using mongoose
import mongoose from "mongoose";


//  'mongoose.Schema.Types.ObjectId' refer to the '_id' field of each document
    // this mean that you can refer to the '_id' field of another document
    // often use to establish relationships between docs
const appointmentSchema = mongoose.Schema(
    //this is an object that contain title, author and publishYear
    //another object at the end that contain timestamps 
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
        advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Advisor' },
        dateTime: { type: Date},
        description: { type: String }
    }
);

export const AppointmentModel = mongoose.model('Appointment',appointmentSchema);