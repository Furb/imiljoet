"use client";
import {
  Inject,
  Day,
  Month,
  Resize,
  DragAndDrop,
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  TimelineViews,
  ViewsDirective,
  ViewDirective,
  Week,
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { L10n } from "@syncfusion/ej2-base";
import { Internationalization } from "@syncfusion/ej2-base";

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
  const fieldsData = {
    id: "Id",
    subject: { name: "Subject", title: "Hvem" },
    endTime: { name: "EndTime", title: "Slut" },
  };

  const data = [
    {
      Id: 1,
      Subject: "Dont waste it",
      StartTime: new Date(2024, 3, 15, 10, 0),
      EndTime: new Date(2024, 3, 16, 12, 30),
      IsAllDay: false,
    },
    {
      Id: 2,
      Subject: "Green survey",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 12, 30),
      IsAllDay: false,
      Status: "Completed",
      Priority: "High",
    },
  ];

  const roomData = [
    { RoomText: "Lille rum", Id: 1, RoomColor: "#ffaa00" },
    { RoomText: "Stor rum", Id: 2, RoomColor: "#f8a398" },
    { RoomText: "Frokost rum", Id: 3, RoomColor: "#7499e1" },
  ];

  return (
    <ScheduleComponent
      startHour='07:00'
      eventSettings={{ dataSource: data, fields: fieldsData }}
      currentView='Week'
    >
      <ViewsDirective>
        <ViewDirective option='Day' />
        <ViewDirective option='Week' dateFormat='dd-MMM-yyyy' />
        <ViewDirective option='Month' showWeekNumber={true} />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective
          field='RoomId'
          title='Vælg lokale'
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
