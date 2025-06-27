import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  // API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    pincode: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Fetches profile from backend
  useEffect(() => {
    if (isAuthenticated && user) {
      setLoadingProfile(true);
      fetch(`${API_URL}/profile/${encodeURIComponent(user.sub)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProfile({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              phone: data.phone || "",
              city: data.city || "",
              pincode: data.pincode || "",
            });
          }
          setLoadingProfile(false);
        })
        .catch(() => setLoadingProfile(false));
    }
  }, [isAuthenticated, user, API_URL]);

  // Handle form changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Saves profile to backend
  const handleSave = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/profile/${encodeURIComponent(user.sub)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Profile saved!");
      })
      .catch(() => alert("Error saving profile!"));
  };

  if (isLoading || loadingProfile) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Welcome, {user.name}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => logout({ returnTo: window.location.origin })}
            sx={{ mb: 2 }}
          >
            Log Out
          </Button>
        </Box>
        <form onSubmit={handleSave}>
          <TextField
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="City"
            name="city"
            value={profile.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={profile.pincode}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save Profile
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default App;
