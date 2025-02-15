import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Avatar,
    TextField,
    Button,
    MenuItem,
    CircularProgress,
    Alert,
    Stack,
    Divider,
    IconButton,
    Chip,
    useTheme,
} from "@mui/material";
import { useAuthContext } from "../../authentication/hooks/useAuthContext";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileSettings = () => {
    const { user } = useAuthContext();
    const theme = useTheme();
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        bod: "",
        gender: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/api/users/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Failed to fetch user details");
                }
                setProfile({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    address: data.address,
                    bod: data.bod ? new Date(data.bod).toISOString().split("T")[0] : "",
                    gender: data.gender,
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(`/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(profile),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to update profile");
            }

            setMessage("Profile updated successfully!");
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: { xs: 3, md: 6 }, background: theme.palette.background.paper, borderRadius: 4, boxShadow: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <IconButton
                            onClick={() => window.history.back()}
                            sx={{ mr: 2, color: 'primary.main' }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {`${profile.firstName} ${profile.lastName}`}
                        </Typography>
                    </Box>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <Avatar
                            alt={`${profile.firstName} ${profile.lastName}`}
                            src={user.profilePic || "https://via.placeholder.com/150"}
                            sx={{ width: 130, height: 130, boxShadow: 6, borderColor: 'grey.300', border: '3px solid' }}
                        />
                        <Typography variant="body1" color="textSecondary" align="center">
                            <Chip
                                label={`Email: ${profile.email}`}
                                color="primary"
                                variant="outlined"
                            />
                        </Typography>
                        <Typography variant="body1" color="textSecondary" align="center">
                            <Chip
                                label={`Address: ${profile.address}`}
                                color="primary"
                                variant="outlined"
                            />
                        </Typography>
                        <Stack direction="row" spacing={1} justifyContent="center">
                            <Chip
                                label={`DOB: ${profile.bod}`}
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                label={`Gender: ${profile.gender}`}
                                color="secondary"
                                variant="outlined"
                            />
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                        Edit Profile
                    </Typography>
                    <Divider sx={{ mb: 4 }} />
                    {loading ? (
                        <Box sx={{ textAlign: "center", mt: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <>
                            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            value={profile.firstName}
                                            onChange={handleChange}
                                            variant="outlined"
                                            InputLabelProps={{
                                                style: { color: 'primary.main' },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: theme.palette.background.default,
                                                    transition: 'all 0.3s ease',
                                                },
                                                '&:hover .MuiOutlinedInput-root': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            value={profile.lastName}
                                            onChange={handleChange}
                                            variant="outlined"
                                            InputLabelProps={{
                                                style: { color: 'primary.main' },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: theme.palette.background.default,
                                                    transition: 'all 0.3s ease',
                                                },
                                                '&:hover .MuiOutlinedInput-root': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleChange}
                                            disabled
                                            variant="outlined"
                                            InputLabelProps={{
                                                style: { color: 'primary.main' },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: theme.palette.background.default,
                                                    transition: 'all 0.3s ease',
                                                },
                                                '&:hover .MuiOutlinedInput-root': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            name="address"
                                            value={profile.address}
                                            onChange={handleChange}
                                            variant="outlined"
                                            InputLabelProps={{
                                                style: { color: 'primary.main' },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: theme.palette.background.default,
                                                    transition: 'all 0.3s ease',
                                                },
                                                '&:hover .MuiOutlinedInput-root': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Date of Birth"
                                            name="bod"
                                            type="date"
                                            value={profile.bod}
                                            onChange={handleChange}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { color: 'primary.main' },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: theme.palette.background.default,
                                                    transition: 'all 0.3s ease',
                                                },
                                                '&:hover .MuiOutlinedInput-root': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Gender"
                                            name="gender"
                                            value={profile.gender}
                                            onChange={handleChange}
                                            variant="outlined"
                                            InputLabelProps={{
                                                style: { color: 'primary.main' },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: theme.palette.background.default,
                                                    transition: 'all 0.3s ease',
                                                },
                                                '&:hover .MuiOutlinedInput-root': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            }}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Box sx={{ textAlign: "center", mt: 4 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                        disabled={loading}
                                        sx={{
                                            borderRadius: 3,
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            px: 4,
                                            py: 1.5,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                            },
                                        }}
                                    >
                                        {loading ? "Updating..." : "Update"}
                                    </Button>
                                </Box>
                            </form>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileSettings;
