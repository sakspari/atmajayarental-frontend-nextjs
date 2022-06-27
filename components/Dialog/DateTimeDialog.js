import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";

const ConfirmDialog = ({ open, handleClose, handleSave, title, dateTimeValue, onDateTimeChange }) => {
    const [isFocus, setIsFocus] = useState(false)
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/*<DateTimePicker onChange={onDateTimeChange} value={dateTimeValue} />*/}
                        <TextField
                            className="w-full"
                            onChange={onDateTimeChange}
                            onFocus={() => {
                                setIsFocus(true)
                            }}
                            onBlur={() => {
                                setIsFocus(false)
                            }}
                            label="waktu pengembalian"
                            type={isFocus ? "datetime-local" : "text"}
                            variant="standard"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Batal</Button>
                    <Button onClick={handleSave} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmDialog;
