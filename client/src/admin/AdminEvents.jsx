import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const Events = () => {
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [eventsList, setEventsList]=useState([]);
  const onSubmit = async (data) => {
    try {
      setShowForm(false);
      console.log(data)
      const response = await axios.post('/api/admin/createEvent', data);
      console.log("res = ",response.data);
      // You may want to update the eventsList state after successful submission
      // reset(); // Reset form fields
      if(response.data.success){
        toast.success("event created")
      }
      else{
        toast.error("could not create event")
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Error creating event:', error)
    }
    finally{
      reset();
    }
  };



  const handleDateClick = () => {
    setShowForm(true);
  };

  const handleEventClick = (clickInfo) => {
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

  const getAllEvents = async() =>{
    const res=await axios.get('api/user/getAllEvents');
    console.log(res.data.events);
    setEventsList(res.data.events)
  }

  useEffect(()=>{
    getAllEvents()
  },[])

  return (
    <>
      <div className="p-4 lg:px-8">
        <div className="hidden sm:block text-sm">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={calendarView}
            headerToolbar={{
              start: 'today prev,next',
              center: 'title',
              end: '',
            }}
            height={'auto'}
            events={eventsList}
            eventClick={handleEventClick} // Handle event click event
            dateClick={handleDateClick} // Handle date click event
            dayCellClassNames="cursor-pointer"
          />
        </div>
        {/* small screen  */}
        <div className="sm:hidden text-xs">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={calendarView}
            headerToolbar={{
              start: 'today prev,next',
              center: 'title',
              end: '',
            }}
            height={'auto'}
            events={eventsList}
            eventClick={handleEventClick} // Handle event click event
            dateClick={handleDateClick} // Handle date click event
            dayCellClassNames="cursor-pointer"

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
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* Form modal */}
      {showForm && (
        <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-80">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Create Event</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => { reset(); setShowForm(false); }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 w-24">Title:</label>
                    <input type="text" id="title" {...register('title', { required: 'Title is required' })} className={`flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.title && 'border-red-500'}`} />
                  </div>
                  {errors.title && <span className="text-red-500 text-xs block mt-1">{errors.title.message}</span>}
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="start" className="block text-sm font-medium text-gray-700 w-24">Start:</label>
                    <input type="datetime-local" id="start" {...register('start', { required: 'Start time is required' })} className={`flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.start && 'border-red-500'}`} />
                  </div>
                  {errors.start && <span className="text-red-500 text-xs block mt-1">{errors.start.message}</span>}
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="end" className="block text-sm font-medium text-gray-700 w-24">End:</label>
                    <input type="datetime-local" id="end" {...register('end', { required: 'End time is required' })} className={`flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.end && 'border-red-500'}`} />
                  </div>
                  {errors.end && <span className="text-red-500 text-xs block mt-1">{errors.end.message}</span>}
                </div>
                <div className="flex items-center space-x-3">
                  <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 w-24">Background:</label>
                  <input type="color" id="backgroundColor" {...register('backgroundColor')} className="flex-1 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" defaultValue="#31e054" />
                </div>
                <div className="flex items-center space-x-3">
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700 w-24">Venue:</label>
                  <input type="text" id="venue" {...register('venue')} className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div className="flex items-center space-x-3">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 w-24">URL:</label>
                  <input type="url" id="url" {...register('url')} className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div className="flex justify-end mt-4 space-x-3">
                  <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150">Create</button>
                  <button type="button" onClick={() => { reset(); setShowForm(false); }} className="text-gray-600 hover:text-gray-800 focus:outline-none transition duration-150">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
