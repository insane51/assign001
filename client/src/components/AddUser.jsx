// AddOrder.js

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddOrder = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [mobile,setMobile] = useState('');
  const [message,setMessage] = useState('');

  const handleAddOrder = async () => {
    try {
      // Get the token from cookies
      const token = Cookies.get('jwtToken');

      // Check if the token exists
      if (!token) {
        setMessage('User is not authenticated.');
        console.error('Token not found. User is not authenticated.');
        return;
      }

      // Make the API call to add an order
      const response = await axios.post(
        'http://localhost:5000/api/add-order',
        {
          orderCount,
          mobile
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(response.data);
      // Handle success, update UI, etc.
      if(response.status !== 200){
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error adding order:', error.message);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <div>
      <h2>Add Order</h2>
      <h3>{message}</h3>
      <label>Order Count:</label>
      <input type="number" value={orderCount} onChange={(e) => setOrderCount(e.target.value)} />
      <br />
      <label>Mobile number:</label>
      <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <br />
      <button onClick={handleAddOrder}>Add Order</button>
    </div>
  );
};

export default AddOrder;
