import {Trans} from "react-i18next";
import React, {SyntheticEvent} from "react";
import {Alert, Snackbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {consumeFirst} from "../redux/slice/SnackbarSlice";

export function MySnackBar() {
    const dispatch = useAppDispatch();
    const snackbar = useAppSelector(s => s.snackbar);

    const handleCloseSnackbar = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(consumeFirst());
    };

    return (
        <Snackbar open={!!snackbar.messages[0] && !!snackbar.messages[0]?.messageKey}
                  autoHideDuration={2000}
                  onClose={handleCloseSnackbar}
                  sx={{visibility: snackbar.messages[0]?.messageKey ? 'visible' : 'hidden'}}>
            <Alert onClose={handleCloseSnackbar}
                   severity={snackbar.messages[0]?.severity}
                   sx={{width: '100%'}}>
                <Typography display='block' textAlign='justify' variant='h6' sx={{verticalAlign: 'top'}}>
                    <Trans i18nKey={snackbar.messages[0]?.messageKey}/>
                </Typography>
            </Alert>
        </Snackbar>
    )
}