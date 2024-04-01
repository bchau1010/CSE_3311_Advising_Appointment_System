import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Grid } from '@mui/material';
import axios from 'axios';

const AppointmentForm = (props) => {
    const [formData, setFormData] = useState({
        dateTime: '',
        task: '',
        description: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Props Data:', props.selectedData);
            const { studentId, advisorId } = props.selectedData[0];
            console.log('Request Data:', studentId, advisorId);
    
            const requestData = {
                studentId,
                advisorId,
                dateTime: formData.dateTime,
                task: formData.task,
                description: formData.description
            };
    
            console.log('Sending Request:', requestData);
    
            const response = await axios.post("http://localhost:4000/advisor/makeAppointment", requestData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
    
            console.log('Response:', response.data);
            alert('Appointment has been created successfully! '); // Display success alert
    
            // Reset form data after submission
            setFormData({
                dateTime: '',
                task: '',
                description: ''
            });
    
        } catch (err) {
            if (!err?.response) {
                alert('No Server Response');
            } else if (err.response.status !== 400) {
                alert(err.response.data.message);
            } else if (err.response.status === 400){
                alert('Appointment date must be in the future.');
            }else{
                alert('Make Appointment Failed');
            }
        }
    };
    


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={6}>
                    <div className="bg-white py-6 sm:py-8 lg:py-12">
                        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                            <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                                <div className="sm:col-span-2">
                                    <label htmlFor="dateTime" className="mb-0 inline-block text-sm text-gray-800 sm:text-base">Select the date and time for the Appointment</label>
                                </div>
                                <DateTimePicker
                                    name="dateTime"
                                    value={formData.dateTime}
                                    onChange={(value) => handleChange({ target: { name: 'dateTime', value } })}
                                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                                />
                                <div className="sm:col-span-2">
                                    <label htmlFor="task" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Reason for the Appointment</label>
                                    <select
                                        name="task"
                                        value={formData.task}
                                        onChange={handleChange}
                                        className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring">
                                        <option value="option1">Select an Option</option>
                                        <option value="add/drop course">Add/Drop Course</option>
                                        <option value="change degree plan">Change Degree Plan</option>
                                        <option value="general advising">General Advising</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                                </div>
                                <div className="flex items-center justify-between sm:col-span-2">
                                    <button type="submit" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}

export default AppointmentForm;
