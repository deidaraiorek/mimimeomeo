import React, { useState } from 'react';
import { Datepicker } from "flowbite-react";
import 'flowbite';

const EventInput = ({ value, setvalue, content }) => {
    const [focus, setfocus] = useState(false);

    const handleFocus = () => {
        setfocus(true) //if focus => true all the time
    }

    const handleBlur = () => {
        if (value == "") {
            setfocus(false)
        }
    }
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={focus ? "" : content}
                className='p-3 rounded-lg w-full'
            />
        </div>
    )
}

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, seteventName] = useState("");
    const [eventDescription, seteventDescription] = useState("");
    const [eventLocation, seteventLocation] = useState("");
    return (
        <div className='flex flex-col gap-3 justify-center ml-10 m-3 mb-5 max-w-sm'>
            <Datepicker
                inline
                value={selectedDate}
                onChange={setSelectedDate}
                displayFormat="MMMM d, yyyy" // Format of the displayed date
            />
            {selectedDate && (
                <p>Selected Date: {selectedDate.toLocaleDateString()}</p> // Display selected date
            )}
            <EventInput value={eventName} setvalue={seteventName} content="Name of the event" />
            <EventInput value={eventLocation} setvalue={seteventLocation} content="Location" />
            <EventInput value={eventDescription} setvalue={seteventDescription} content="Description" />
            <button className='w-full flex items-center justify-center gap-1 p-2 bg-gradient-to-r from-pink-200 to-purple-100 rounded-full border shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
                <p className='font-bold text-white text-center'>Add</p>
            </button>
        </div>
    );
};

export default CustomDatePicker;
