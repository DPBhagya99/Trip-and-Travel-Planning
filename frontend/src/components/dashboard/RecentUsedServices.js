import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { useAuthContext } from "../../authentication/hooks/useAuthContext";

const RecentUsedServices = () => {
    const [recentServices, setRecentServices] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchRecentServices = async () => {
            try {
                const response = await fetch('/api/recent-services', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setRecentServices(data);
            } catch (error) {
                console.error('Error fetching recent services:', error);
            }
        };

        fetchRecentServices();
    }, [user.token]);

    return (
        <Box sx={{ padding: '16px' }}>
            <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
                Recently Used Services
            </Typography>
            <Paper elevation={3} sx={{ padding: '16px', borderRadius: '12px' }}>
                <List>
                    {recentServices.length > 0 ? (
                        recentServices.map((service, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="center" sx={{ paddingLeft: '0', paddingRight: '0' }}>
                                    <ListItemText
                                        primary={service.serviceName}
                                        primaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                {index < recentServices.length - 1 && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">No recent services used</Typography>
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default RecentUsedServices;
