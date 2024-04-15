"use client";

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

import { L10n } from "@syncfusion/ej2-base";
import { meetingRoomBookingData } from "@/lib/datasource";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Confirm",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Meeting rooms I Miljøet",
    },
  },
});

const Schedule = () => {
  const roomData = [
    { RoomText: "Room 1", Id: 1, RoomColor: "#ffaa00" },
    { RoomText: "Room 2", Id: 2, RoomColor: "#f8a398" },
    { RoomText: "Big room", Id: 3, RoomColor: "#7499e1" },
  ];

  const fieldsData = {
    id: "bookingId",
    subject: {
      name: "Booking",
      title: "Who is booking",
      default: "",
    },
    description: {
      title: "Description (optional)",
    },
  };

  const eventSettings: EventSettingsModel = {
    dataSource: meetingRoomBookingData,
    fields: fieldsData,
  };

  return (
    <ScheduleComponent
      startHour='07:00'
      currentView='Week'
      timeFormat='HH:mm'
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
