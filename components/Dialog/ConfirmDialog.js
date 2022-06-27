import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmDialog = ({
                           open,
                           handleClose,
                           handleOke,
                           title,
                           body,
                           positiveButton = "Oke",
                           negativeButton = "Batal",
                           positiveVariant = 'text',
                           positiveDisable = false
                       }) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={'w-full text-center font-semibold'}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{negativeButton}</Button>
                    <Button
                        variant={positiveVariant}
                        disabled={positiveDisable}
                        onClick={handleOke}
                        autoFocus>
                        {positiveButton}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmDialog;
