import {Container, FormGroup} from "@mui/material";
import moment from "moment";
import {BookingSelection} from "../model/BookingSelection";
import BookingDateRange from "../components/BookingDateRange";

export default function Booking() {
    moment({month: 0, day: 3, hour: 15, minute: 10});
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
                                  onChange={handleSelect}/>
            </FormGroup>
        </Container>
    )
}

function handleSelect(dates: BookingSelection) {
    console.log("------ handle select called -------");
    dates.periods.forEach(range => console.log("Period start: " + range.start.format("DD/MM") + ", end: " + range.end.format("DD/MM")));
    dates.weekStarts.forEach(m => console.log("Week start: " + m.format("DD/MM")));
}