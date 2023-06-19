import React, { useState, useEffect } from 'react';
import ReservationForm from './AddReservationForm';
import ReservationList from './ReservationList';
import SearchBar from './SearchBar';
import "./App.css"

function App() {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({
    username: '',
    bookName: '',
    startDate: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);

  const handleChange = (event) => {
    setReservation((prevReservation) => ({
      ...prevReservation,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Adding 30 days
  

    setReservations((prevReservations) => [
      ...prevReservations,
      { ...reservation, endDate, status: 'Pending' },
    ]);
    setReservation({
      username: '',
      bookName: '',
      startDate: '',
    });
  };

  const handleDeleteReservation = (index) => {
    setReservations((prevReservations) =>
      prevReservations.filter((_, i) => i !== index)
    );
  };

  const handleEditReservation = (index) => {
    const updatedReservations = reservations.map((reservation, idx) => {
      if (idx === index) {
        return { ...reservation, status: 'Returned' };
      }
      return reservation;
    });
    setReservations(updatedReservations);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredReservations(reservations);
    } else {
      const filteredReservations = reservations.filter((reservation) =>
        reservation.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReservations(filteredReservations);
    }
  };
  
  useEffect(() => {
    handleSearch();
  }, [reservations, handleSearch]);
  

  return (
    <div className="app-container">
      <h1>My reservations (admin) </h1>
      <hr/>
      
      <div className="reservation-form">
        <ReservationForm
          username={reservation.username}
          bookName={reservation.bookName}
          startDate={reservation.startDate}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <hr/>
      <div class="reservation-list">
        <div className="search-bar">
        <SearchBar
        onChange={handleSearch}
        setSearchTerm={setSearchTerm}
        />
      </div>
      {filteredReservations.length > 0 ? (
          <ReservationList
            reservations={filteredReservations}
            onDeleteReservation={handleDeleteReservation}
            onEditReservation={handleEditReservation}
          />
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
