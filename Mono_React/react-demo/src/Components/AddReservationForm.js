import React from 'react';

function ReservationForm(props) {
  return (
    <div>
      <h2>Add a new reservation</h2>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="usernameInput">Username:</label>
        <input
          type="text"
          id="usernameInput"
          name="username"
          value={props.username}
          onChange={props.handleChange}
          required
        />

        <label htmlFor="bookNameInput">Book name:</label>
        <input
          type="text"
          id="bookNameInput"
          name="bookName"
          value={props.bookName}
          onChange={props.handleChange}
          required
        />

        <label htmlFor="startDateInput">Start Date:</label>
        <input
          type="date"
          id="startDateInput"
          name="startDate"
          value={props.startDate}
          onChange={props.handleChange}
          required
        />

        <button type="submit">Add Reservation</button>
      </form>
    </div>
  );
}

export default ReservationForm;
