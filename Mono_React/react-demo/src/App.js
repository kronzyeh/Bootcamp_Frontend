import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function RestaurantList({ restaurants, onDelete, onGetById, onEdit }) {

  return (
    <div className="reservation-table">
      <h2>Restaurant List</h2>
      <table>
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
          {Array.isArray(restaurants) && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <tr key={restaurant.Id}>
                <td>{restaurant.Title}</td>
                <td>{restaurant.Seats}</td>
                <td>{restaurant.Address}</td>
                <td>{restaurant.OwnerName}</td>
                <td>
                  <button onClick={() => onGetById(restaurant.Id)}>Get</button>
                  <button onClick={() => onDelete(restaurant.Id)}>Delete</button>
                  <button onClick={() => onEdit(restaurant.Id)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No restaurants found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function RestaurantForm({handleChange, restaurant, addRestaurant}){

  return(
    <div className="restaurant-form">
      <h1>Add Restaurant</h1>
      <input type="text" name="title" value={restaurant.Title} onChange={handleChange} placeholder="Title" />
      <input type="number" name="seats" value={restaurant.Seats} onChange={handleChange} placeholder="Seats" />
      <input type="text" name="address" value={restaurant.Address} onChange={handleChange} placeholder="Address" />
      <input type="text" name="ownerName" value={restaurant.OwnerName} onChange={handleChange} placeholder="Owner Name" />
      <button class="reservation-form button" onClick={addRestaurant}>Add restaurant</button>
    </div>
  );
}

function App() {
  const [restaurant, setRestaurant] = useState({
    title: '',
    seats: '',
    address: '',
    ownerName: '',
  });
  const [restaurants, setRestaurants] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const addRestaurant = async () => {
    try {
      await axios.post('https://localhost:44351/api/restaurant', restaurant);
      console.log('Restaurant added successfully.');
      setTimeout(() => {
        setRestaurant({ title: '', seats: '', address: '', ownerName: '' });
      }, 100);
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };
  

  const handleChange = (e) => {
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchRestaurants = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get('https://localhost:44351/api/restaurant');
      console.log(response.data.restaurants);
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchRestaurantById = async (id) => {
    try {
      setIsFetching(true);
      const response = await axios.get(`https://localhost:44351/api/restaurant/${id}`);
      setRestaurants(response.data.length === 1 ? [response.data[0]] : []);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await axios.delete(`https://localhost:44351/api/restaurant/${id}`);
      // Filter out the deleted restaurant from the state
      const updatedRestaurants = restaurants.filter((restaurant) => restaurant.Id !== id);
      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const editRestaurant = async (id, updatedRestaurant) => {
    try {
      await axios.put(`https://localhost:44351/api/restaurant/${id}`, updatedRestaurant);
      console.log('Restaurant updated successfully.');
      // Update the restaurant in the state
      setRestaurants((prevRestaurants) => {
        return prevRestaurants.map((restaurant) => {
          if (restaurant.Id === id) {
            return {
              ...restaurant,
              ...updatedRestaurant
            };
          }
          return restaurant;
        });
      });
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };
  
  return (
    <div className="app-container">
      <h1>RESTAURANTS</h1>
      <hr />

      <div className="restaurant-table">
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <RestaurantList restaurants={restaurants} onDelete={deleteRestaurant} onGetById={fetchRestaurantById} />
        )}
      </div>

      <button className="reservation-form button" onClick={fetchRestaurants}>
        Fetch Restaurants
      </button>
      <hr />
      <RestaurantForm handleChange={handleChange} restaurant={restaurant} addRestaurant={addRestaurant} onEdit={editRestaurant} />
    </div>
  );
}

export default App;
