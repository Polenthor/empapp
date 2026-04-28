import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Unauthorized access. Please login first.");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null; // Optional loading or unauthorized state

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <img
        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
        alt="Profile"
        style={{ width: '150px', borderRadius: '50%' }}
      /><br /><br />

      <h2>Welcome, {user.Username}!</h2>
      <p><strong>Salary:</strong> {user.Salary || "N/A"}</p>

      <Button onClick={() => {
                             localStorage.removeItem("loggedUser");
                             navigate('/login');
                           }} variant='contained' color='warning'>Logout</Button>
    </div>
  );
};

export default Profile;