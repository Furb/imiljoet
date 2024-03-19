import React, { useState } from "react";
import { Modal } from "@syncfusion/ej2-react-popups";
import { InputsComponent } from "@syncfusion/ej2-react-inputs";
import { DateTimePicker } from "@syncfusion/ej2-react-calendars";
import { Button } from "@syncfusion/ej2-react-buttons";

const NewEventPopup = ({ isOpen, onClose, onSubmit }) => {
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(startTime.getTime() + 30 * 60000)
  ); // 30 minutes after start time
  const [roomId, setRoomId] = useState(1); // Assuming room ID 1 is selected by default

  const handleSubmit = () => {
    const newEvent = {
      Subject: subject,
      StartTime: startTime,
      EndTime: endTime,
      RoomId: roomId,
    };
    onSubmit(newEvent);
    onClose(); // Close the popup after submit
  };

  // ... JSX for rendering form fields, dropdown for room selection, and submit button

  return (
    <Modal
      visible={isOpen}
      isModal={true}
      modalClose={onClose}
      effect='SlideDown'
    >
      <div className='new-event-popup'>
        {/* Form fields and dropdown for subject, start/end time, room selection */}
        <Inputs
          label='Subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <DateTimePicker
          label='Start Time'
          value={startTime}
          onChange={(e) => setStartTime(e.value)}
        />
        <DateTimePicker
          label='End Time'
          value={endTime}
          onChange={(e) => setEndTime(e.value)}
        />
        {/* Room selection dropdown (implementation depends on your room data structure) */}
        <select
          value={roomId}
          onChange={(e) => setRoomId(parseInt(e.target.value))}
        >
          {/* Populate options based on your room data */}
        </select>
        <Button content='Create' onClick={handleSubmit} primary />
      </div>
    </Modal>
  );
};

export default NewEventPopup;
