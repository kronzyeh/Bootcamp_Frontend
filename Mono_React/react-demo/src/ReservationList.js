import React from 'react';
import './ReservationList.css';

function ReservationList({ reservations, onDeleteReservation, onEditReservation }) {
    const confirmDelete = (index) => {
        const result = window.confirm('Are you sure you want to delete this reservation?');
        if (result) {
          onDeleteReservation(index);
        }
      };
    
      const confirmEdit = (index) => {
        const reservation = reservations[index];
        if(reservation.status==='Returned'){
            window.alert("Reservation is already returned");
        }
        else{
            const result = window.confirm('Are you sure you want to edit this reservation?');
            if (result) {
          onEditReservation(index);
            }
        }
      };

  return (
    <div>
      <h2>Reservation List</h2>
      {reservations.length > 0 ? (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Username</th>
              <th>Book Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>
                {reservation.status === 'Returned' ? (
                    <img className="status-image" src="https://hotemoji.com/images/dl/7/white-heavy-check-mark-emoji-by-twitter.png" title="Returned" alt="Returned" />
                ) : (
                    <img className="status-image" src="https://icon-library.com/images/icon-pending/icon-pending-10.jpg" title="Pending" alt="Default" />
                )}
                </td>
                <td>{reservation.username}</td>
                <td>{reservation.bookName}</td>
                <td>{reservation.startDate}</td>
                <td>{reservation.endDate.toISOString().slice(0, 10)}</td>
                <td>
                  <button
                    onClick={() => confirmDelete(index)}
                    className="delete-button"
                    title="Delete reservation"
                  >
                    X
                    </button>
                    <button
                    onClick={() => confirmEdit(index)}
                    className="edit-button"
                    title="Update reservation status"
                  >
                    ?
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations added yet.</p>
      )}
    </div>
  );
}

export default ReservationList;
