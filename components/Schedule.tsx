"use client";

import { db } from "@vercel/postgres"; // Connect to Vercel Postgres
import { useState, useEffect } from "react";

import {
  Inject,
  Day,
  Month,
  Resize,
  DragAndDrop,
  ScheduleComponent,
  EventSettingsModel,
  ResourcesDirective,
  ResourceDirective,
  TimelineViews,
  ViewsDirective,
  ViewDirective,
  Week,
} from "@syncfusion/ej2-react-schedule";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { L10n, loadCldr } from "@syncfusion/ej2-base";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Confirm",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Book Room",
    },
  },
});

const Schedule = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const fetchedBookings = await db.booking.findMany();
      setBookings(fetchedBookings);
    };

    fetchBookings();
  }, []);

  const roomData = [
    { RoomText: "Lille rum", Id: 1, RoomColor: "#ffaa00" },
    { RoomText: "Stor rum", Id: 2, RoomColor: "#f8a398" },
    { RoomText: "Frokost rum", Id: 3, RoomColor: "#7499e1" },
  ];

  const eventSettings: EventSettingsModel = {
    dataSource: bookings, // from the Vercel database
  };

  return (
    <ScheduleComponent
      startHour='07:00'
      currentView='Week'
      eventSettings={eventSettings}
    >
      <ViewsDirective>
        <ViewDirective option='Day' />
        <ViewDirective option='Week' dateFormat='dd-MMM-yyyy' />
        <ViewDirective option='Month' showWeekNumber={true} />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective
          field='RoomId'
          title='Choose meeting room'
          name='Rooms'
          allowMultiple={false}
          dataSource={roomData}
          textField='RoomText'
          idField='Id'
          colorField='RoomColor'
        ></ResourceDirective>
      </ResourcesDirective>
      <Inject
        services={[Day, Week, Month, Resize, DragAndDrop, TimelineViews]}
      />
    </ScheduleComponent>
  );
};

export default Schedule;
