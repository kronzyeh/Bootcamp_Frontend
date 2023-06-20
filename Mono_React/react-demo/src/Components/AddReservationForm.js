import React from 'react';

function ReservationForm(props) {
  return (
    <div>
      <h2>Add a new restaurant</h2>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="usernameInput">Title:</label>
        <input
          type="text"
          id="titleInput"
          name="title"
          value={props.title}
          onChange={props.handleChange}
          required
        />

        <label htmlFor="seatsInput">Seats:</label>
        <input
          type="text"
          id="seatsInput"
          name="seats"
          value={props.seats}
          onChange={props.handleChange}
          required
        />
        <label htmlFor="addressInput">Address:</label>
        <input
          type="text"
          id="addressInput"
          name="address"
          value={props.address}
          onChange={props.handleChange}
          required
        />
        <label htmlFor="ownerNameInput">Owner Name:</label>
        <input
          type="text"
          id="ownerNameInput"
          name="ownerName"
          value={props.ownerName}
          onChange={props.handleChange}
          required
        />

        <button type="submit">Add restaurant</button>
      </form>
    </div>
  );
}

export default ReservationForm;
