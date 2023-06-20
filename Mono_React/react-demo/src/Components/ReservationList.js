import React from 'react';
import '../Css/ReservationList.css';

function ReservationList({ restaurants }) {
    /* const confirmDelete = (index) => {
        const result = window.confirm('Are you sure you want to delete this restaurant?');
        if (result) {
          onDeleteReservation(index);
        }
      };
    
      const confirmEdit = (index) => {
        const reservation = reservations[index];
        if(reservation.status==='Returned'){
            window.alert("Restaurant is already returned");
        }
        else{
            const result = window.confirm('Are you sure you want to edit this reservation?');
            if (result) {
          onEditReservation(index);
            }
        }
      }; */

  return (
    <div>
      <h2>All restaurants</h2>
      {restaurants.length > 0 ? (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Seats</th>
              <th>Address</th>
              <th>Owner Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.title}</td>
                <td>{restaurant.seats}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.ownerName}</td>
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
