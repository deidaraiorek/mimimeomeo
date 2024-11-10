import React from 'react'
import CustomDatePicker from '../../components/specialdate/CustomDatePicker'
import ShowEvent from '../../components/specialdate/ShowEvent'
import useCheckStatus from '../../components/CheckStatus'
import { useState, useEffect } from 'react'
import axios from 'axios'
import API_ROUTES from '../../constants/apiRoutes'
import specialdatebg from '../../assets/images/specialdatebg.png'

const SpecialDates = () => {
  const { coupleEmail, coupleId } = useCheckStatus();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(API_ROUTES.SHOW_EVENT(coupleId));
        if (response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        const errorMessage = error.response?.data || "An error occurred while fetching events.";
        console.error("Error fetching events:", error.message);
      }
    };

    getEvents();
  }, [coupleId])

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Add new event to the list
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(API_ROUTES.DELETE_EVENT(eventId));
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };

  return (
    <div className='flex min-h-screen p-2'
    style={{
      backgroundImage: `url(${specialdatebg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div>
        <CustomDatePicker addEvent={addEvent} />
      </div>
      <div className='flex-grow pt-3 '>
        <ShowEvent events={events} deleteEvent={deleteEvent} />
      </div>
    </div>
  )
}

export default SpecialDates
