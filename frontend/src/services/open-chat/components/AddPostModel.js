// frontend/src/services/open-chat/components/AddPostModel.js
import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Button, TextField, IconButton, Card, CardContent,
    CardActions, Typography, Modal, CircularProgress
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';
import { Autocomplete as GoogleAutocomplete } from '@react-google-maps/api';

const style = {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: '46vw',
    height: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddPostModel = ({ open, handleClose }) => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();
    const autocompleteRef = useRef(null);

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.geometry) {
                const newLocation = {
                    name: place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setLocation(newLocation);
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            let imageUrl = '';
            if (imageFile) {
                const imageRef = ref(getStorage(), `posts/${user.uid}/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const newPost = {
                content,
                image: imageUrl,
                location,
                userId: user._id,
            };

            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            // Reset form
            setContent("");
            setImage(null);
            setLocation(null);
            handleClose();
        } catch (error) {
            console.error('Error uploading post:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            name: 'Current Location',
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    (error) => {
                        console.error('Error fetching location:', error.message);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getCurrentLocation();
    }, []);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Card sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                What's on your mind?
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Write something..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <IconButton color="primary" component="label">
                                    <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
                                    <PhotoCamera />
                                </IconButton>
                                {image && <Typography variant="body2" sx={{ marginLeft: 1 }}>Image selected</Typography>}
                                <IconButton color="primary" component="label" sx={{ marginLeft: 1 }}>
                                    <EmojiEmotionsIcon />
                                </IconButton>
                            </Box>
                            {image && <Box component="img" src={image} alt="Post Image" sx={{ width: '100%', marginTop: 2, borderRadius: '8px' }} />}

                            {/* Google Maps Autocomplete */}
                            <GoogleAutocomplete
                                onLoad={(autocomplete) => {
                                    autocompleteRef.current = autocomplete;
                                    if (autocompleteRef.current) {
                                        autocompleteRef.current.addListener('place_changed', handlePlaceChanged);
                                    }
                                }}
                                onUnmount={() => {
                                    if (autocompleteRef.current) {
                                        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
                                        autocompleteRef.current = null;
                                    }
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter a location"
                                    sx={{ marginTop: 2 }}
                                />
                            </GoogleAutocomplete>

                            {location && <Typography variant="body2" sx={{ marginTop: 2 }}>Location: {location.name}</Typography>}
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Post
                            </Button>
                            <Button variant="outlined" onClick={() => { setContent(""); setImage(null); setLocation(null); handleClose(); }}>
                                Cancel
                            </Button>
                        </CardActions>
                    </Card>
                )}
            </Box>
        </Modal>
    );
};

export default AddPostModel;
