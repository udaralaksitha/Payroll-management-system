import '../pb.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { useHistory } from "react-router-dom";


const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

function Cal() {

    const [allTasks, setAllTasks] = useState("")
    const [selected, setSelected] = useState();
    const history = useHistory();

    const handleSelected = (event) => {
        setSelected(event);
        console.log(event.slots);
        history.push("getspectask/" + event.slots);
    };

    const getData = () => {
        axios
            .get("http://localhost:8400/Tasks")
            .then((response) => {
                console.log(response)
                console.log(response.data.existingTaskDetails)
                const dataArray = response.data.existingTaskDetails
                const newarray = []
                dataArray.map((task, index) => {
                    newarray.push({ "slots": task._id, title: task.TaskName, start: new Date(task.TStartDate), end: new Date(task.TEndDate) })
                    console.log(task.TaskID)
                })
                setAllTasks(newarray)
            });
    };

    useEffect(() => {
        if (!allTasks) {
            getData();
        }
    });

    return (
        <div className="Cal">
            <h1>Calendar</h1>

            <Calendar localizer={localizer}
                events={allTasks}
                startAccessor="start"
                endAccessor="end"
                selected={selected}
                onSelectEvent={handleSelected}
                style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default Cal;