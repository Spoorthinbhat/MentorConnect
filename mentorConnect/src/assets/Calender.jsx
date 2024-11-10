// import '@fullcalendar/bootstrap5';
// import bootstrap5Plugin from '@fullcalendar/bootstrap5';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import FullCalendar from '@fullcalendar/react';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from 'react';

// const ClassCalendar = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/schedule');
//         const data = await response.json();

//         // Format the class data for FullCalendar
//         const formattedEvents = data.flatMap(classData =>
//           classData.slots.flatMap(slot =>
//             slot.times.map(time => ({
//               title: classData.title,
//               start: `${slot.date}T${time.startTime}`,
//               end: `${slot.date}T${time.endTime}`,
//               description: classData.description,
//               maxParticipants: classData.maxParticipants,
//               bookedSeats: time.bookedSeats,
//               participants: time.participants,
//               skillLevel: classData.skillLevel,
//             }))
//           )
//         );

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   return (
//     <div className="calendar-container h-5/6 w-5/6 mx-auto mt-6 overflow-hidden" >
//       <FullCalendar
//       className="h-full"
//         plugins={[dayGridPlugin, timeGridPlugin, bootstrap5Plugin]}
//         initialView="dayGridMonth"
//         events={events}
//         themeSystem='bootstrap5'
//         // height={auto}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay',
//         }}
//         showNonCurrentDates={false}
//         eventClick={(info) => {
//           // Display additional details when an event is clicked
//           alert(
//             `Class: ${info.event.title}\n` +
//             `Description: ${info.event.extendedProps.description}\n` +
//             `Skill Level: ${info.event.extendedProps.skillLevel}\n` +
//             `Max Participants: ${info.event.extendedProps.maxParticipants}\n` +
//             `Booked Seats: ${info.event.extendedProps.bookedSeats}\n` +
//             `Participants: ${info.event.extendedProps.participants.join(', ')}`
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default ClassCalendar;
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

const ClassCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/schedule');
        const data = await response.json();

        const formattedEvents = data.flatMap(classData =>
          classData.slots.flatMap(slot =>
            slot.times.map(time => ({
              title: classData.title,
              start: `${slot.date}T${time.startTime}`,
              end: `${slot.date}T${time.endTime}`,
              description: classData.description,
              maxParticipants: classData.maxParticipants,
              bookedSeats: time.bookedSeats,
              skillLevel: classData.skillLevel,
              mentorId: classData.mentorId, // Assuming this exists in your data
              mentorName: classData.mentorName, // Assuming this exists in your data
              backgroundColor: getEventColor(time.bookedSeats, classData.maxParticipants),
              borderColor: getEventColor(time.bookedSeats, classData.maxParticipants),
            }))
          )
        );

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const getEventColor = (bookedSeats, maxParticipants) => {
    const availability = (bookedSeats / maxParticipants) * 100;
    if (availability >= 90) return '#dc3545';
    if (availability >= 70) return '#ffc107';
    return '#28a745';
  };

  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    const bookedSeats = event.extendedProps.bookedSeats;
    const maxParticipants = event.extendedProps.maxParticipants;
    
    return (
      <div className="p-1">
        <div className="fw-bold small">{event.title}</div>
        <div className="small">
          <span className={`badge ${bookedSeats === maxParticipants ? 'bg-danger' : 'bg-secondary'}`}>
            {bookedSeats}/{maxParticipants}
          </span>
        </div>
      </div>
    );
  };

  const handleEventClick = (info) => {
    const event = info.event;
    const availableSeats = event.extendedProps.maxParticipants - event.extendedProps.bookedSeats;
    const isFull = availableSeats === 0;
    
    const dialog = document.createElement('div');
    dialog.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">${event.title}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card mb-3">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Class Details</h6>
                <p class="card-text">${event.extendedProps.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge bg-info">Level: ${event.extendedProps.skillLevel}</span>
                  <span class="badge ${isFull ? 'bg-danger' : 'bg-success'}">
                    ${availableSeats} seats available
                  </span>
                </div>
              </div>
            </div>
            
            <div class="card mb-3">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Schedule</h6>
                <p class="mb-0">
                  <strong>Date:</strong> ${event.start.toLocaleDateString()}
                </p>
                <p class="mb-0">
                  <strong>Time:</strong> ${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                  ${event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-outline-primary" onclick="window.location.href='/mentor/${event.extendedProps.mentorId}'">
              View Mentor Profile
            </button>
            <button type="button" class="btn btn-primary ${isFull ? 'disabled' : ''}" 
              ${isFull ? 'disabled' : `onclick="window.location.href='/book/${event.extendedProps.mentorId}/${event.start.toISOString()}'"`}>
              ${isFull ? 'Class Full' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    `;

    const existingDialog = document.querySelector('.event-dialog');
    if (existingDialog) {
      existingDialog.remove();
    }

    dialog.className = 'modal event-dialog d-block';
    document.body.appendChild(dialog);

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop show';
    document.body.appendChild(backdrop);

    const closeDialog = () => {
      dialog.remove();
      backdrop.remove();
      document.removeEventListener('click', handleOutsideClick);
    };

    const handleOutsideClick = (e) => {
      if (e.target === dialog || e.target.classList.contains('btn-close')) {
        closeDialog();
      }
    };
    
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 100);
  };

  const calendarStyles = {
    '.fc': {
      border: '1px solid #dee2e6',
      borderRadius: '0.375rem',
      overflow: 'hidden'
    },
    '.fc td, .fc th': {
      border: '1px solid #dee2e6'
    },
    '.fc-theme-bootstrap5 .fc-scrollgrid': {
      border: 'none'
    },
    '.fc .fc-toolbar': {
      padding: '0.75rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    },
    '.fc-theme-bootstrap5 .fc-scrollgrid td': {
      border: '1px solid #dee2e6'
    },
    // Button styles
    '.fc .fc-button': {
      backgroundColor: '#0d6efd',
      border: 'none',
      color: '#ffffff',
      padding: '0.375rem 0.75rem',
      fontSize: '1rem',
      borderRadius: '0.25rem',
    //   margin: '0 0.25rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '40px',
      height: '38px',
      margin: '5px'
    },
    '.fc .fc-button:hover': {
      backgroundColor: '#0b5ed7',
      color: '#ffffff'
    },
    // Event styling
    '.fc-event': {
      borderRadius: '3px',
      padding: '2px',
      marginBottom: '1px',
      fontSize: '0.8rem',
      cursor: 'pointer'
    },
    '.fc-time-grid-event': {
      padding: '2px 4px'
    },
    // Event content styling
    '.event-content': {
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    '.event-title': {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      lineHeight: '1.2',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    '.event-seats': {
      fontSize: '0.7rem',
      marginTop: '2px'
    },
    '.seats-badge': {
      padding: '1px 4px',
      borderRadius: '3px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      display: 'inline-block'
    },
    '.seats-badge.full': {
      backgroundColor: 'rgba(220, 53, 69, 0.3)'
    },
    // Time slots
    '.fc-timegrid-slot': {
      height: '3rem !important'
    },
    '.fc-timegrid-event': {
      minHeight: '2rem'
    },
    '.fc-timegrid-event .fc-event-main': {
      padding: '2px 4px'
    },
    // Ensure text is visible in month view
    '.fc-daygrid-event': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.fc-daygrid-event .fc-event-title': {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    // Responsive font sizes
    '@media (max-width: 768px)': {
      '.event-title': {
        fontSize: '0.7rem'
      },
      '.event-seats': {
        fontSize: '0.65rem'
      }
    }
  };

  return (
    <div className="container-fluid h-100 w-5/6">
      <div className="card shadow h-100">
        <div className="card-header bg-white py-2 border-bottom">
          <h2 className="card-title h5 mb-0">Class Schedule</h2>
        </div>
        <div className="card-body p-2">
          <style>
            {Object.entries(calendarStyles)
              .map(([selector, styles]) => `
                ${selector} {
                  ${Object.entries(styles)
                    .map(([property, value]) => `${property}: ${value};`)
                    .join('\n')}
                }
              `)
              .join('\n')}
          </style>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, bootstrap5Plugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            themeSystem="bootstrap5"
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            height="90vh"
            aspectRatio={2}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            slotDuration="00:30:00"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
              hour12: false
            }}
            className="fc-theme-bootstrap5"
          />
        </div>
      </div>
    </div>
  );
};

export default ClassCalendar;