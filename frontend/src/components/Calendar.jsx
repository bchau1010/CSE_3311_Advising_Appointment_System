import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { formatDate } from '@fullcalendar/core';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

class CalendarDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEvents: [
        {
          id: "12315",
          title: "APPOINTMENT 1",
          start: "2024-02-04",
        },
        {
          id: "5123",
          title: "APPOINTMENT 2",
          start: "2024-02-04T12:00:00",
        },
      ]
    };
  }

  handleDateClick = (arg) => {
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

  handleEventClick = (arg) => {
    if (window.confirm(`Are you sure you want to make this event recurrent? '${arg.event.title}'`)) {
      const updatedEvents = this.state.currentEvents.filter(event => event.id !== arg.event.id);
      this.setState({ currentEvents: updatedEvents }); // Update currentEvents state
    }
  };

  render() {
    const { currentEvents } = this.state;

    return (
      <>
        
        <Typography variant="h5">Events</Typography>
        <List>
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                margin: "10px 0",
                borderRadius: "2px",
              }}
            >
              <ListItemText
                primary={event.title}
                secondary={
                  <Typography>
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }
              />
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
          events={currentEvents} // Pass currentEvents from state
          eventClick={this.handleEventClick}
          dateClick={this.handleDateClick}
        />
      </>
    );
  }
}

export default CalendarDemo;
