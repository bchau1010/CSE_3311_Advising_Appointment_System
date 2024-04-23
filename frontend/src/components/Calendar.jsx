import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { formatDate } from '@fullcalendar/core';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

/*Fetch the current appointment for advisor1 (done)
    Click empty tile to make new appointment(done)
      
    Click on existing appointment to view, edit and delete it
      viewing (done)
        Need delete button (maybe)
        Need edit button (inside of view)
          Edit need to include recurrence and time range
*/

class CalendarDemo extends React.Component {

  // need to replace these with MongoDB
  /* 
  constructor(props) {
    super(props);
    this.state = {
      currentEvents: [
        {
          id: "12315",
          title: "APPOINTMENT 1",
          start: "2024-04-04",
        },
        {
          id: "5123",
          title: "APPOINTMENT 2",
          start: "2024-04-04T12:00:00",
        },
      ]
    };
  }
  */
  state = {
    currentAppointment: [] // Define currentAppointment in the state
  };


  // get the appointments for advisor1

  async componentDidMount() {
    try {
      // advisor 1 65f2660b785a0c45f1ede4e9
      // advisor 2 65f26611785a0c45f1ede4eb
      // advisor 3 65f26619785a0c45f1ede4ed
      const response = await axios.post('advisor/getAllAppointment', { advisorId: "65f2660b785a0c45f1ede4e9" });
      const appointments = response.data;
      console.log(response.data);
      console.log("Appointment: ", appointments);

      if (appointments && appointments.length > 0) {
        const updatedAppointments = appointments.map(appointment => ({
          id: appointment._id,
          title: appointment.task,
          start: appointment.dateTime,
          studentName: appointment.student.name, // Update to access student name
          advisorName: appointment.advisor.name // Update to access advisor name
        }));


        this.setState(this.state.currentAppointment = appointments);
        console.log("currentAppointment after setState:", this.state.currentAppointment);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }



  //Handle click for empty tile, should go to the 
  // make appointment for student
  // auto enter date for it using the selected date from the calendar UI
  handleClick = (arg) => {
    const title = prompt("Please enter a new title for your appointment, please also specify the time");
    if (title) {
      const newEvent = {
        id: new Date().toISOString(),
        title,
        start: arg.date,
        allDay: arg.allDay,
      };
      this.setState({ currentEvents: [...this.state.currentEvents, newEvent] }); // Update currentEvents state
    }
  };

  //click on empty date to go to make a new appointment, working
  handleDateClick = () => {
    window.location.href = "/advisorHome";
  }


  // Handle existing appointment,
  // allow them to view, edit, and delete appointment
  // including delete, edit time
  handleEventClick = async(arg) => {
    if(window.confirm(`Appointment Title:  ${arg.event.title} \n\n`
    + `Appointment Start Date:  ${arg.event.start} \n\n`
    + `Appointment Recurrence: every ${arg.event.extendedProps.interval} ${arg.event.extendedProps.frequency} \n\n`
    +`Are you sure you want to make this event recurrent? '${arg.event.title}'`)){
      const frequency = prompt("Please enter the recurrence frequency (e.g., 'days', 'weeks', 'months', 'years', 'N/A'):");
      const interval = prompt("Please enter the recurrence interval(number):");
      const appointmentId  = arg.event.id;

      try {
        const response = await axios.post('/advisor/editAppointmentRecurrence', {
          appointmentId,
          frequency,
          interval
        });
        console.log(response);
  
        if (response.status === 200) {
          const updatedAppointments = this.state.currentEvents.filter(event => event.id !== arg.event.id);
          this.setState({ currentEvents: updatedAppointments });
          window.prompt(response.data.message);
        } else {
          window.prompt(response.data.message);
        }
      } catch (error) {
        console.error("Error updating recurrence:", error);
        window.confirm(error);
      }
      
    };
    

    


    
  };


  render() {
    const { currentAppointment } = this.state;
    return (
      <>
        <Typography variant="h5">Events</Typography>
        <List>
          {currentAppointment.map((event) => (
            <ListItem
              key={event.id}

              sx={{
                margin: "10px 0",
                borderRadius: "2px",
              }}>
              <ListItemText
                primary={event.studentName + ", " + event.title}
                secondary={
                  <Typography>
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                } />
            </ListItem>
          ))}
        </List>


        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}

          events={currentAppointment.map(event => ({
            title: event.studentName + ", " + event.title,
            start: event.start,
            id: event.id,
            
            extendedProps:{
              frequency: event.recurrence.frequency,
              interval: event.recurrence.interval,
            },
          }))}
          


          eventClick={this.handleEventClick}
          dateClick={this.handleDateClick}
        />
        {console.log(currentAppointment)}

      </>
    );
  }
}

export default CalendarDemo;
