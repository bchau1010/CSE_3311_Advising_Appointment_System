import mongoose from "mongoose";


//  'mongoose.Schema.Types.ObjectId' refer to the '_id' field of each document
    // this mean that you can refer to the '_id' field of another document
    // often use to establish relationships between docs
const appointmentSchema = mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required:true},
        advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Advisor',required: true },
        dateTime: { type: Date, required: true},
        task: {type: String, required: true},
        description: { type: String,required:true},
        recurrence: {
            frequency: { type: String, enum: ['days', 'weeks', 'months','years','N/A'], default: 'N/A'},
            // Indicate how often, ie every 2 weeks, every 3 months, etc
            interval: { type: Number, default: 0 },
            // Optional field for specifying end date for recurring appointments
            endDate: { type: Date } 
        }
    }
);

export const AppointmentModel = mongoose.model('Appointment',appointmentSchema);