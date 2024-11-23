import React from 'react';
import axios from 'axios';
import API_ROUTES from '../../constants/apiRoutes';

const ShowEvent = ({ events }) => {
    const deleteEvent = async (eventId) => {
        try {
          await axios.delete(API_ROUTES.DELETE_EVENT(eventId));
        } catch (error) {
          console.error("Error deleting event:", error.message);
        }
      };
    return (
        <div className="show-event-container">
            {events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-3">
                    {events.map((event) => (
                        <div key={event.id} className="relative flex p-4 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                            <div className="flex flex-col items-center text-purple-900  mr-7 justify-between">
                                <div className='text-center'>
                                    <p className="text-sm font-bold uppercase text-xl">
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="absolute top-2 right-2 h-6 w-6 rounded-full bg-transparent hover:bg-purple-200/30 transition-all duration-200"
                                onClick={() => deleteEvent(event.id)}
                            >
                                ×
                            </button>
                            <div>
                                <div className='text-purple-800'>{event.location}</div>
                                <div><strong>{event.name}</strong></div>
                                <div className="text-wrap">{event.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

            ) : (
                <div className="flex-grow flex items-center justify-center h-screen">
                    <p className="text-center">No events found for your couple.</p>
                </div>
            )}
        </div>
    );
};

export default ShowEvent;
