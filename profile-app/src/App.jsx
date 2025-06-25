import React, { useState } from "react";
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

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    pincode: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile saved!");
    console.log(profile);
  };

  if (isLoading) return <div>Loading...</div>;

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
