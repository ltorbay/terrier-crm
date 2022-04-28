import {Container, FormGroup} from "@mui/material";
import {BookingSelection} from "../model/BookingSelection";
import BookingDateRange from "../components/BookingDateRange";
import BookingPayment from "../components/BookingPayment";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {initReservedDates} from "../redux/slice/reservedDatesSlice";
import moment from "../index";

export default function Booking() {
    const [state, setState] = useState<BookingSelection>();
    useAppDispatch()(initReservedDates())

    const reservedDates = useAppSelector((datesState) => datesState.reservedDates.array)
        .map(epoch => moment(epoch));
    return (
        <Container maxWidth="sm">
            <FormGroup>
                <BookingDateRange reservedDates={reservedDates}
                                  onChange={setState}/>
            </FormGroup>
            {(state?.periods && state?.weekStarts) ?
                <BookingPayment periods={state?.periods || []} weekStarts={state?.weekStarts || []}/> : undefined}
        </Container>
    )
}
