import React, { useState } from 'react';
import { Datepicker } from "flowbite-react";
import 'flowbite';
import { AddIcon } from '../../assets/icon';
import API_ROUTES from '../../constants/apiRoutes';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import useCheckStatus from '../CheckStatus'

const EventInput = ({ value, setvalue, content, isTextArea }) => {
    return (
        <div>
            {isTextArea ? (
                <textarea
                    placeholder={content}
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    className="w-full px-4 py-2 mt-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-0 resize-none"
                    rows={3} // Initial number of rows
                    style={{ overflowY: 'auto' }} // Automatically scrolls if too much text
                />
            ) : (
                <input
                    type="text"
                    placeholder={content}
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    className="w-full px-4 py-2 mt-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-0"
                />
            )}
        </div>
    )
}

const CustomDatePicker = ({addEvent}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, seteventName] = useState("");
    const [eventDescription, seteventDescription] = useState("");
    const [eventLocation, seteventLocation] = useState("");
    const { coupleEmail, coupleId } = useCheckStatus()
    const handleAddevent = async () => {
        if (!eventName) {
            toast.error("Please enter the event name.", { duration: 2000 });
            return;
        }
        if (!selectedDate) {
            toast.error("Please select a date for the event.", { duration: 2000 });
            return;
        }
        if (!eventLocation) {
            toast.error("Please enter the event location.", { duration: 2000 });
            return;
        }
        if (!eventDescription) {
            toast.error("Please enter a description for the event.", { duration: 2000 });
            return;
        }
        const eventData = {
            name: eventName,
            date: selectedDate,
            location: eventLocation,
            description: eventDescription,
            coupleId: coupleId,
        }

        seteventName('');
        setSelectedDate('');
        seteventLocation('');
        seteventDescription('');
        try {
            const response = await axios.post(API_ROUTES.ADD_EVENT, eventData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            toast.success("You created a new event!", { duration: 1000 });
            addEvent(response.data)

        } catch (error) {
            const errorMessage = error.response?.data;
            toast.error(errorMessage || "An error occurred", { duration: 1000 });
            console.error(error.message);
        }
    }

    return (
        <div className='flex flex-col gap-3 justify-center m-3 mb-5 max-w-sm'>
            <Toaster position="top-left" reverseOrder={false} />
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
            <EventInput value={eventDescription} setvalue={seteventDescription} content="Description" isTextArea={true} />
            <button
                className='w-full flex items-center justify-center gap-1 p-2 bg-purple-200 rounded-full hover:bg-purple-300'
                onClick={handleAddevent}>
                {AddIcon}
                <p className='font-bold text-white text-center'>Add</p>
            </button>
        </div>
    );
};

export default CustomDatePicker;
