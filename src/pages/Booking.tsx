import {Container, FormGroup} from "@mui/material";
import moment from "moment";
import {BookingSelection} from "../model/BookingSelection";
import BookingDateRange from "../components/BookingDateRange";
import BookingPayment from "../components/BookingPayment";
import React, {useState} from "react";

export default function Booking() {
    const [state, setState] = useState<BookingSelection>();
    return (
        <Container maxWidth="sm">
            <FormGroup>
                <BookingDateRange reservedDates={[
                    moment({year: 2022, month: 4, day: 15}),
                    moment({year: 2022, month: 4, day: 19}),
                    moment({year: 2022, month: 4, day: 22}),
                    moment({year: 2022, month: 4, day: 25}),
                    moment({year: 2022, month: 5, day: 12}),
                    moment({year: 2022, month: 5, day: 13}),
                ]}
                                  onChange={setState}/>
            </FormGroup>
            {(state?.periods && state?.weekStarts) ? <BookingPayment periods={state?.periods || []} weekStarts={state?.weekStarts || []}/> : undefined}
        </Container>
    )
}
