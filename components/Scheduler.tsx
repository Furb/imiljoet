"use client";
import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  Week,
  Month,
  Agenda,
  ViewsDirective,
  ViewDirective,
  BookingSettingsModel,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  PopupOpenBookingArgs,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

// Define the main Scheduler component
export default function Scheduler() {
  // State to store and manage booking data
  const [bookings, setBookings] = useState([]);

  // UseEffect to fetch and format data upon component mounting
  useEffect(() => {
    // Fetch data from the API
    fetch("/api/bookings")
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // Map over the data to convert date strings to Date objects
        const formattedData = data.map(
          (booking: {
            StartTime: string | number | Date;
            EndTime: string | number | Date;
          }) => ({
            ...booking,
            StartTime: new Date(booking.StartTime),
            EndTime: new Date(booking.EndTime),
          })
        );
        setBookings(formattedData); // Update the state with formatted data
      })
      .catch((error) => console.error("Error fetching bookings:", error)); // Log errors if any
  }, []);

  const fieldsData = {
    subject: {
      title: "Who is booking",
      default: "",
    },
    description: {
      title: "Description (optional)",
    },
  };

  // Define event settings for the Scheduler using the state-managed data
  const eventSettings: BookingSettingsModel = {
    dataSource: bookings,
    fields: fieldsData,
  };

  const onPopupOpen = (args: PopupOpenBookingArgs): void => {
    if (args.type === "QuickInfo") {
      args.duration = 60;
      args.cancel = true;
    }

    if (args.type === "Editor") {
      // Check if it's a new booking (no ID), then change the title
      if (args.data && !args.data.Id) {
        const titleElement = args.element.querySelector(".e-title-text");
        if (titleElement) {
          titleElement.innerHTML = "Book Room";
        }
      }

      // Change Room field name and duration if necessary
      const statusElement = args.element.querySelector(
        "#Room"
      ) as HTMLInputElement;
      statusElement?.setAttribute("name", "Rooms");
      args.duration = 60;
    }
  };

  // Return the JSX for the ScheduleComponent
  return (
    <>
      <h2>Syncfusion React Schedule Component</h2>
      <ScheduleComponent
        width='100%'
        height='550vh'
        startHour='07:00'
        currentView='Week'
        timeFormat='HH:mm'
        selectedDate={new Date()}
        eventSettings={eventSettings}
        popupOpen={onPopupOpen}
      >
        <ViewsDirective>
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective
            field='RoomId'
            title='Choose meeting room'
            name='Rooms'
            allowMultiple={false}
            dataSource={[
              { RoomText: "Room 1", Id: 1, RoomColor: "#ffaa00" },
              { RoomText: "Room 2", Id: 2, RoomColor: "#f8a398" },
              { RoomText: "Room 3", Id: 3, RoomColor: "#7499e1" },
            ]}
            textField='RoomText'
            idField='Id'
            colorField='RoomColor'
          />
        </ResourcesDirective>
        <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </>
  );
}
