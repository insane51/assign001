import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const OrderDetails = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);

  useEffect(() => {
    // Make API call to get user orders
    const fetchUserOrders = async () => {
      try {

        // Get the token from cookies
      const token = Cookies.get('jwtToken');

      // Check if the token exists
      if (!token) {
        console.error('Token not found. User is not authenticated.');
        return;
      }

        const response = await axios.get('http://localhost:5000/api/get-order',{
          headers: {
            Authorization: `${token}`,
          },
        }); // replace with your API endpoint
        setUserOrders(response.data);
        console.log(response.data);

        // Calculate total order count
        const totalOrders = response.data.reduce((total, order) => total + order.orderCount, 0);
        setTotalOrderCount(totalOrders);
      } catch (error) {
        console.error('Error fetching user orders:', error.message);
        // Handle error, display an error message, etc.
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <div>
      <h2>User Order Details</h2>
      <p>Total Order Count: {totalOrderCount}</p>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Count</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order._id}</td>
              <td>{order.orderCount}</td>
              <td>{order.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
