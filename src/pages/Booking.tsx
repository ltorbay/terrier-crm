import {Container, FormGroup} from "@mui/material";
import {BookingDateRange} from "../components/BookingDateRange";
import moment from "moment";
import {BookingSelection} from "../model/BookingSelection";

export default function Booking() {
    moment({ month: 0, day: 3, hour:15, minute:10 });
    return (
        <Container maxWidth="sm">
            <FormGroup>
                <BookingDateRange reservedDates={[moment().add(15, "days").format("YYYYMMDD")]}
                                  onChange={handleSelect}/>
            </FormGroup>
        </Container>
    )
}

function handleSelect(dates: BookingSelection) {
    console.log("------ handle select called -------");
    dates.periods.forEach(range => console.log("Period start: " +  range.start.format("DD/MM") + ", end: " + range.end.format("DD/MM")));
    dates.weekStarts.forEach(moment => console.log("Week start: " + moment.format("DD/MM")));
}