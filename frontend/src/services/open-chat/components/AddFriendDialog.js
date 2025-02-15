import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AddFriendDialog = ({ open, handleClose, addFriend }) => {
    const [friend, setFriend] = React.useState("");

    const handleAddFriend = () => {
        addFriend(friend);
        setFriend("");
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Friend</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Friend's Name"
                    type="text"
                    fullWidth
                    value={friend}
                    onChange={(e) => setFriend(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddFriend}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddFriendDialog;
