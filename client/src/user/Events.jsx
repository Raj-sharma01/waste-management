import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

const Events = () => {
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsList = [
    {
      id: 1,
      title: "Single Day Event",
      start: "2024-04-12T10:30:00",
      end: "2024-04-12T11:30:00",
      backgroundColor: "#31e054", // Set background color for the event
      venue: "Event Venue 1"
    },
    {
      id: 2,
      title: "Multi-Day Event",
      start: "2024-04-14T10:30:00",
      end: "2024-04-16T11:30:00",
      backgroundColor: "#31e054", // Set background color for the event
      venue: "Event Venue 2"
    },
    {
      id: 3,
      title: "Training Session",
      start: "2024-04-16T09:00:00",
      end: "2024-04-16T12:00:00",
      backgroundColor: "#31e054",
      venue: "Event Venue 3"
    }
  ];

  const handleDateClick = (arg) => {
    // Change calendar view to timeGridDay when a day is clicked
    arg.view.calendar.gotoDate(arg.date);
    arg.view.calendar.changeView('timeGridDay');
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo)
    const event = clickInfo.event;
    setSelectedEvent({
      title: event.title,
      start: event.start,
      end: event.end,
      venue: event.extendedProps.venue
    });
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="p-4 lg:px-8">
        <div className="hidden sm:block text-sm">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={calendarView}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={"auto"}
            events={eventsList}
            eventClick={handleEventClick} // Handle event click event
            dateClick={handleDateClick} // Handle date click event
          />
        </div>
        {/* small screen  */}
        <div className="sm:hidden text-xs">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={calendarView}
            height={"auto"}
            events={eventsList}
            eventClick={handleEventClick} // Handle event click event
            dateClick={handleDateClick} // Handle date click event
          />
        </div>
      </div>
      {/* Modal */}
      {selectedEvent && (
        <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg w-96">
          <div className="flex justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">{selectedEvent.title}</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="p-4">
            <p className="mb-2"><strong>Start Time:</strong> {selectedEvent.start.toLocaleString()}</p>
            <p className="mb-2"><strong>End Time:</strong> {selectedEvent.end.toLocaleString()}</p>
            <p className="mb-2"><strong>Venue:</strong> {selectedEvent.venue}</p>
          </div>
        </div>
      </div>
      
      )}
    </>
  );
};

export default Events;
