// frontend/src/config/GoogleMapsProvider.js
import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import { APIProvider } from '@vis.gl/react-google-maps'; // Ensure you import this

const GoogleMapsProvider = ({ children }) => {
    const libraries = ['places'];

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAjiU4RsJfNJoVcll2oEsIaTdzw6p3Srl0"
            libraries={libraries}
        >
            <APIProvider apiKey="AIzaSyAjiU4RsJfNJoVcll2oEsIaTdzw6p3Srl0">
                {children}
            </APIProvider>
        </LoadScript>
    );
};

export default GoogleMapsProvider;
