import React, { Component } from 'react'
import axios from 'axios'; 
import Swal from 'sweetalert2';
import {BrowserRouter as Router, Link, useParams} from 'react-router-dom';
// import './Shift_Time.css';
import {CSVLink, CSVDownload} from 'react-csv';
import { withRouter } from "react-router";
import { textAlign } from "@mui/system";
import AnnounceKit from "announcekit-react";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { fontFamily } from "@mui/system";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default class ApproveTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //varible for all data fields
      monot: "",
      montot: "",
      tueot: "",
      tuetot: "",
      wedot: "",
      wedtot: "",
      thuot: "",
      thutot: "",
      friot: "",
      fritot: "",
      satot: "",
      sattot: "",
      sunot: "",
      suntot: "",
      weekot: "",
      weektot: "",
      emptstartdate: "",
      emptenddate: "",
      emptweek: "",
      emptmonstart: "",
      emptmonend: "",
      empttuestart: "",
      empttueend: "",
      emptwedstart: "",
      emptwedend: "",
      empthustart: "",
      emptthuend: "",
      emptfristart: "",
      emptfriend: "",
      emptsatstart: "",
      emptsatend: "",
      emptsunstart: "",
      emptsunend: "",
      empid: "",
      emptimestatus: "",
      _id: "",
    };
  }

  //changed values are updated
  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  //on submit, the submit button implementation for register
  onSubmit = (e) => {
    //preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
    e.preventDefault();
    //declaring error variable as err
    const timesid = this.props.match.params.id;

    //destructor state variables
    const {
      monot,
      montot,
      tueot,
      tuetot,
      wedot,
      wedtot,
      thuot,
      thutot,
      friot,
      fritot,
      satot,
      sattot,
      sunot,
      suntot,
      weekot,
      weektot,
      emptstartdate,
      emptenddate,
      emptweek,
      emptmonstart,
      emptmonend,
      empttuestart,
      empttueend,
      emptwedstart,
      emptwedend,
      empthustart,
      emptthuend,
      emptfristart,
      emptfriend,
      emptsatstart,
      emptsatend,
      emptsunstart,
      emptsunend,
      empid,
      emptimestatus,
      _id,
    } = this.state;

    //create data object and set data to variables
    const timesdata = {
      monot: monot,
      montot: montot,
      tueot: tueot,
      tuetot: tuetot,
      wedot: wedot,
      wedtot: wedtot,
      thuot: thuot,
      thutot: thutot,
      friot: friot,
      fritot: fritot,
      satot: satot,
      sattot: sattot,
      sunot: sunot,
      suntot: suntot,
      weekot: weekot,
      weektot: weektot,
      emptstartdate: emptstartdate,
      emptenddate: emptenddate,
      emptweek: emptweek,
      emptmonstart: emptmonstart,
      emptmonend: emptmonend,
      empttuestart: empttuestart,
      empttueend: empttueend,
      emptwedstart: emptwedstart,
      emptwedend: emptwedend,
      empthustart: empthustart,
      emptthuend: emptthuend,
      emptfristart: emptfristart,
      emptfriend: emptfriend,
      emptsatstart: emptsatstart,
      emptsatend: emptsatend,
      emptsunstart: emptsunstart,
      emptsunend: emptsunend,
      empid: empid,
      emptimestatus: "Approved",
      _id: _id,
    };

    //display data in console
    console.log(timesdata);
    //if there are no errors post data

    //axios is a promise based http client used to communicate with front end and backend
    //get details from backend using axios and get giving path
    axios
      .put(`http://localhost:8400/emptimesheet/update/${timesid}`, timesdata)
      .then((res) => {
        //pass data then get a promise with res callback which then an arrow fuction is used to handle q
        //if res is successful set state to default, so they don't stay
        if (res.data.success) {
          this.setState({
            monot: "",
            montot: "",
            tueot: "",
            tuetot: "",
            wedot: "",
            wedtot: "",
            thuot: "",
            thutot: "",
            friot: "",
            fritot: "",
            satot: "",
            sattot: "",
            sunot: "",
            suntot: "",
            weekot: "",
            weektot: "",
            emptstartdate: "",
            emptenddate: "",
            emptweek: "",
            emptmonstart: "",
            emptmonend: "",
            empttuestart: "",
            empttueend: "",
            emptwedstart: "",
            emptwedend: "",
            empthustart: "",
            emptthuend: "",
            emptfristart: "",
            emptfriend: "",
            emptsatstart: "",
            emptsatend: "",
            emptsunstart: "",
            emptsunend: "",
            empid: "",
            emptimestatus: "Approved",
            _id: "",
          });
        }
      });

    Swal.fire({
      text: "Timesheet has been approved",
    });
  };

  componentDidMount() {
    this.retrievetimesheet();
  }

  //fetch all leave requests
  // Resources used to create these  functions to view include https://www.youtube.com/watch?v=4srOfbE-sDg&list=PLvfC6i-hEZBnqqF7giszuYI0iqenU5NY0
  retrievetimesheet() {
    const timesid = this.props.match.params.id;
    //get data using axios and backend end route
    axios.get(`http://localhost:8400/emptimesheet/${timesid}`).then((res) => {
      if (res.data.success) {
        this.setState({
          monot: res.data.emptimesheet.monot,
          montot: res.data.emptimesheet.montot,
          tueot: res.data.emptimesheet.tueot,
          tuetot: res.data.emptimesheet.tuetot,
          wedot: res.data.emptimesheet.wedot,
          wedtot: res.data.emptimesheet.wedtot,
          thuot: res.data.emptimesheet.thuot,
          thutot: res.data.emptimesheet.thutot,
          friot: res.data.emptimesheet.friot,
          fritot: res.data.emptimesheet.fritot,
          satot: res.data.emptimesheet.satot,
          sattot: res.data.emptimesheet.sattot,
          sunot: res.data.emptimesheet.sunot,
          suntot: res.data.emptimesheet.suntot,
          weekot: res.data.emptimesheet.weekot,
          weektot: res.data.emptimesheet.weektot,
          emptstartdate: res.data.emptimesheet.emptstartdate,
          emptenddate: res.data.emptimesheet.emptenddate,
          emptweek: res.data.emptimesheet.emptweek,
          emptmonstart: res.data.emptimesheet.emptmonstart,
          emptmonend: res.data.emptimesheet.emptmonend,
          empttuestart: res.data.emptimesheet.empttuestart,
          empttueend: res.data.emptimesheet.empttueend,
          emptwedstart: res.data.emptimesheet.emptwedstart,
          emptwedend: res.data.emptimesheet.emptwedend,
          empthustart: res.data.emptimesheet.empthustart,
          emptthuend: res.data.emptimesheet.emptthuend,
          emptfristart: res.data.emptimesheet.emptfristart,
          emptfriend: res.data.emptimesheet.emptfriend,
          emptsatstart: res.data.emptimesheet.emptsatstart,
          emptsatend: res.data.emptimesheet.emptsatend,
          emptsunstart: res.data.emptimesheet.emptsunstart,
          emptsunend: res.data.emptimesheet.emptsunend,
          empid: res.data.emptimesheet.empid,
          emptimestatus: res.data.emptimesheet.emptimestatus,
          _id: res.data.emptimesheet._id,
        });

        console.log(this.state.emptimesheet);
      }
    });
  }

  render() {
    return (
      <div className="apprtime">
        <button
          type="button"
          className="btn btn-info"
          id="emptimesidebtn"
        ></button>

        <Link to="/manshift">
          <button
            type="button"
            className="btn btn-outline-info"
            id="sidebtn"
          ></button>
        </Link>

        <button
          type="button"
          className="btn btn-outline-info"
          id="empsidebtn"
        ></button>
        <Link to="/manemptimesheet">
          <button
            type="button"
            className="btn btn-outline-info"
            id="timesidebtn"
          ></button>
        </Link>
        <button
          type="button"
          className="btn btn-outline-info"
          id="salsidebtn"
        ></button>
        <button
          type="button"
          className="btn btn-outline-info"
          id="prosidebtn"
        ></button>
        <button
          type="button"
          className="btn btn-outline-info"
          id="depsidebtn"
        ></button>

        <h4
          class="form-label"
          style={{
            color: "#9F2E80",
            position: "absolute",
            marginTop: "1.1%",
            marginLeft: "307px",
            fontFamily: "monospace",
          }}
        >
          Time Sheet
        </h4>
        <label
          class="form-label"
          style={{
            textDecoration: "none",
            color: "#444040",
            position: "absolute",
            marginTop: "1.3%",
            marginLeft: "608px",
          }}
        >
          <strong>Start Date</strong>
        </label>
        <label
          class="form-label"
          style={{
            textDecoration: "none",
            color: "#444040",
            position: "absolute",
            marginTop: "1.3%",
            marginLeft: "900px",
          }}
        >
          <strong>End Date</strong>
        </label>
        <label
          class="form-label"
          style={{
            textDecoration: "none",
            color: "#444040",
            position: "absolute",
            marginTop: "1.3%",
            marginLeft: "1195px",
          }}
        >
          <strong>Week Number</strong>
        </label>
        <label
          readOnly
          class="form-label"
          id="empsheetid"
          style={{
            textDecoration: "none",
            color: "#444040",
            position: "absolute",
            marginTop: "41%",
            marginLeft: "250px",
          }}
        >
          <strong>Emp ID</strong>
        </label>
        <input
          readOnly
          className="form-control"
          id="emptweeknum"
          type="number"
          min="1"
          style={{
            position: "absolute",
            marginTop: "1.2%",
            marginLeft: "1357px",
            width: "70px",
            height: "30px",
          }}
          name="emptweek"
          value={this.state.emptweek}
          onChange={this.handleInputChange}
        />
        <input
          readOnly
          className="form-control"
          id="emptweeknum"
          type="text"
          min="1"
          style={{
            position: "absolute",
            marginTop: "41%",
            marginLeft: "414px",
            width: "100px",
            height: "30px",
          }}
          name="empid"
          value={this.state.empid}
          onChange={this.handleInputChange}
        />
        <div
          style={{
            textDecoration: "none",
            color: "#444040",
            position: "absolute",
            marginTop: "1%",
            marginLeft: "700px",
          }}
        >
          <DatePickerComponent
            readOnly
            selected={null}
            style={{ width: "110px" }}
            firstDayOfWeek={1}
            weekNumber={true}
            format="dd-MMM-yy"
            name="emptstartdate"
            value={this.state.emptstartdate}
            onChange={this.handleInputChange}
          ></DatePickerComponent>
        </div>

        <div
          style={{
            textDecoration: "none",
            color: "#444040",
            position: "absolute",
            marginTop: "1%",
            marginLeft: "990px",
          }}
        >
          <DatePickerComponent
            readOnly
            utcOffset={0}
            style={{ width: "110px" }}
            firstDayOfWeek={1}
            weekNumber={true}
            format="dd-MMM-yy"
            name="emptenddate"
            value={this.state.emptenddate}
            onChange={this.handleInputChange}
          ></DatePickerComponent>
        </div>
        <div>
          {/* Monday */}
          <div className="monstarttime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptmonstart"
              value={this.state.emptmonstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          {/* <div className="monstarttime"><input
          type="number"
          name="emptmonstart"
          value={this.state.emptmonstart}
          onChange={this.handleInputChange} 
          ></input></div> */}
          <div className="monendtime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptmonend"
              value={this.state.emptmonend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          <input
            readOnly
            className="form-control"
            id="monot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="monot"
            value={this.state.monot}
            onInput={(e) => this.setState({ monot: e.target.value })}
            onChange={this.handleInputChange}
          />
          <input
            readOnly
            className="form-control"
            id="montot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="montot"
            value={this.state.montot}
            style={{ borderRadius: "5px" }}
            onInput={(e) => this.setState({ montot: e.target.value })}
            onChange={this.handleInputChange}
          />

          {/* Tuesday */}
          <div className="tuestarttime">
            <TimePickerComponent
              readOnly
              step={5}
              name="empttuestart"
              value={this.state.empttuestart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="tueendtime">
            <TimePickerComponent
              readOnly
              step={5}
              name="empttueend"
              value={this.state.empttueend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
            readOnly
            className="form-control"
            id="tueot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="tueot"
            value={this.state.tueot}
            onInput={(e) => this.setState({ tueot: e.target.value })}
            onChange={this.handleInputChange}
          />
          <input
            readOnly
            className="form-control"
            id="tuetot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="tuetot"
            value={this.state.tuetot}
            onInput={(e) => this.setState({ tuetot: e.target.value })}
            onChange={this.handleInputChange}
          />

          {/* Wednesday */}
          <div className="wedstarttime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptwedstart"
              value={this.state.emptwedstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="wedendtime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptwedend"
              value={this.state.emptwedend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
            readOnly
            className="form-control"
            id="wedot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="wedot"
            value={this.state.wedot}
            onInput={(e) => this.setState({ wedot: e.target.value })}
            onChange={this.handleInputChange}
          />
          <input
            readOnly
            className="form-control"
            id="wedtot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="wedtot"
            value={this.state.wedtot}
            onInput={(e) => this.setState({ wedtot: e.target.value })}
            onChange={this.handleInputChange}
          />

          {/* Thursday */}
          <div className="thustarttime">
            <TimePickerComponent
              readOnly
              step={5}
              name="empthustart"
              value={this.state.empthustart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="thuendtime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptthuend"
              value={this.state.emptthuend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
            readOnly
            className="form-control"
            id="thuot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="thuot"
            value={this.state.thuot}
            onInput={(e) => this.setState({ thuot: e.target.value })}
            onChange={this.handleInputChange}
          />
          <input
            readOnly
            className="form-control"
            id="thutot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="thutot"
            value={this.state.thutot}
            onInput={(e) => this.setState({ thutot: e.target.value })}
            onChange={this.handleInputChange}
          />

          {/* Friday */}
          <div className="fristarttime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptfristart"
              value={this.state.emptfristart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="friendtime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptfriend"
              value={this.state.emptfriend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
            readOnly
            className="form-control"
            id="friot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="friot"
            value={this.state.friot}
            onInput={(e) => this.setState({ friot: e.target.value })}
            onChange={this.handleInputChange}
          />
          <input
            readOnly
            className="form-control"
            id="fritot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="fritot"
            value={this.state.fritot}
            onInput={(e) => this.setState({ fritot: e.target.value })}
            onChange={this.handleInputChange}
          />

          {/* Saturday */}
          <div className="satstarttime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptsatstart"
              value={this.state.emptsatstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="satendtime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptsatend"
              value={this.state.empteemptsatendnddate}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
            readOnly
            className="form-control"
            id="satot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="satot"
            value={this.state.satot}
            onInput={(e) => this.setState({ satot: e.target.value })}
            onChange={this.handleInputChange}
          />
          <input
            readOnly
            className="form-control"
            id="sattot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="sattot"
            value={this.state.sattot}
            onInput={(e) => this.setState({ sattot: e.target.value })}
            onChange={this.handleInputChange}
          />

          {/* Sunday */}
          <div className="sunstarttime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptsunstart"
              value={this.state.emptsunstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="sunendtime">
            <TimePickerComponent
              readOnly
              step={5}
              name="emptsunend"
              value={this.state.emptsunend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
            readOnly
            className="form-control"
            id="sunot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="sunot"
            value={this.state.sunot}
            onInput={(e) => this.setState({ sunot: e.target.value })}
            onChange={this.handleInputChange}
          />
          <input
            readOnly
            className="form-control"
            id="suntot"
            type="number"
            placeholder="Hours"
            min="0"
            max="24"
            name="suntot"
            value={this.state.suntot}
            onInput={(e) => this.setState({ suntot: e.target.value })}
            onChange={this.handleInputChange}
          />

          {/* Weekly Total */}
          <p
            readOnly
            style={{ color: "#992804" }}
            className="form-control"
            id="weekot"
            type="number"
            placeholder="Hours"
            name="weekot"
            value={this.state.weekot}
            onChange={this.handleInputChange}
          >
            {" "}
            <strong>{this.state.weekot} </strong>{" "}
          </p>

          <p
            readOnly
            className="form-control"
            style={{ color: "#992804" }}
            id="weektot"
            type="number"
            placeholder="Hours"
            name="weektot"
            value={this.state.weektot}
            onChange={this.handleInputChange}
          >
            {" "}
            <strong>{this.state.weektot} </strong>{" "}
          </p>

          <div class="col-md-10">
            <br />
            <button
              className="btn btn-success"
              id="Apprtimes"
              type="submit"
              onClick={this.onSubmit}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    );
  }
}
