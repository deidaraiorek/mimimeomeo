import React from "react";
import CustomDatePicker from "../../components/specialdate/CustomDatePicker";
import ShowEvent from "../../components/specialdate/ShowEvent";
import useCheckStatus from "../../components/CheckStatus";
import { useState, useEffect } from "react";
import axios from "axios";
import API_ROUTES from "../../constants/apiRoutes";
import specialdatebg from "../../assets/images/specialdatebg.png";
import { createClient } from "@supabase/supabase-js";

const SpecialDates = () => {
  const { coupleEmail, coupleId } = useCheckStatus();
  const supabase = createClient(
    "https://pzzbmwmmtstgswoqibtg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6emJtd21tdHN0Z3N3b3FpYnRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzMxMDU4OSwiZXhwIjoyMDQyODg2NTg5fQ.wvL6juRWbv_wJysyGhtFMLEuoL4t2OIqRI7cVQ0GhGg"
  );

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(API_ROUTES.SHOW_EVENT(coupleId));
        if (response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data || "An error occurred while fetching events.";
        console.error("Error fetching events:", error.message);
      }
    };

    getEvents();
  }, [coupleId]);
  useEffect(() => {
    const eventsChannel = supabase
      .channel("public:Event")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Event",
          filter: `coupleId=eq.${coupleId}`,
        },
        (payload) => {
          const { eventType, new: newEvent, old: oldEvent } = payload;
          if (eventType === "INSERT") {
            setEvents((prevEvents) => [...prevEvents, newEvent]);
          } else if (eventType === "UPDATE") {
            console.log("updateing event:", oldEvent);

            setEvents((prevEvents) =>
              prevEvents.map((event) =>
                event.id === newEvent.id ? newEvent : event
              )
            );
          } else if (eventType === "DELETE") {
            setEvents((prevEvents) =>
              prevEvents.filter((event) => event.id !== oldEvent.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      supabase.removeChannel(eventsChannel);
    };
  }, [coupleId]);

  return (
    <div
      className="flex min-h-screen p-2"
      style={{
        backgroundImage: `url(${specialdatebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <CustomDatePicker />
      </div>
      <div className="flex-grow pt-3 ">
        <ShowEvent events={events} />
      </div>
    </div>
  );
};

export default SpecialDates;