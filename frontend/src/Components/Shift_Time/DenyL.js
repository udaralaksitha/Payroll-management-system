import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import "./Shift_Time.css";
import { CSVLink, CSVDownload } from "react-csv";
import { withRouter } from "react-router";
import { textAlign } from "@mui/system";
import AnnounceKit from "announcekit-react";
import Moment from "react-moment";
import "moment-timezone";

export default class ApproveL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //varible for all data fields
      empleavetype: "",
      empleavestartdate: "",
      empleaveenddate: "",
      empid: "",
      empleavedate: "",
      empleavereason: "",
      empleavestatus: "Denied",
      empleavename: "",
      empleavecomment: "",
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
    const id = this.props.match.params.id;

    //destructor state variables
    const {
      empleavetype,
      empleavestartdate,
      empleaveenddate,
      empid,
      empleavereason,
      empleavestatus,
      empleavename,
      empleavedate,
      empleavecomment,
    } = this.state;

    //create data object and set data to variables
    const data = {
      empleavetype: empleavetype,
      empleavestartdate: empleavestartdate,
      empleaveenddate: empleaveenddate,
      empid: empid,
      empleavereason: empleavereason,
      empleavestatus: "Denied",
      empleavename: empleavename,
      empleavedate: empleavedate,
      empleavecomment: empleavecomment,
    };

    //display data in console
    console.log(data);
    //if there are no errors post data

    //axios is a promise based http client used to communicate with front end and backend
    //get details from backend using axios and get giving path
    axios
      .put(`http://localhost:8400/empleave/update/${id}`, data)
      .then((res) => {
        //pass data then get a promise with res callback which then an arrow fuction is used to handle q
        //if res is successful set state to default, so they don't stay
        if (res.data.success) {
          this.setState({
            empleavetype: "",
            empleavestartdate: "",
            empleaveenddate: "",
            empid: "",
            empleavereason: "",
            empleavestatus: "Denied",
            empleavename: "",
            empleavedate: "",
            empleavecomment: "",
          });
        }
      });

    Swal.fire({
      text: "Updated Successfully",
    });
  };

  componentDidMount() {
    this.retrieveLeaver();
  }

  //fetch all leave requests
  // Resources used to create these  functions to view include https://www.youtube.com/watch?v=4srOfbE-sDg&list=PLvfC6i-hEZBnqqF7giszuYI0iqenU5NY0
  retrieveLeaver() {
    const id = this.props.match.params.id;
    //get data using axios and backend end route
    axios.get(`http://localhost:8400/empleave/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          empleavetype: res.data.empleave.empleavetype,
          empleavestartdate: res.data.empleave.empleavestartdate,
          empleaveenddate: res.data.empleave.empleaveenddate,
          empid: res.data.empleave.empid,
          empleavereason: res.data.empleave.empleavereason,
          empleavestatus: res.data.empleave.empleavestatus,
          empleavename: res.data.empleave.empleavename,
          empleavedate: res.data.empleave.empleavedate,
          empleavecomment: res.data.empleave.empleavecomment,
        });

        console.log(this.state.empleave);
      }
    });
  }

  render() {
    return (
      <div className="bgimgManl">
        <a href="/manshift">
          <button type="button" className="btn btn-info" id="sidebtn"></button>
        </a>

        <a href="/manshift">
          <button
            type="button"
            className="btn btn-outline-primary"
            id="shiftbtn"
          ></button>
        </a>
        <a href="/manempleave">
          <button
            type="button"
            className="btn btn-outline-primary"
            id="leavebtn"
          ></button>
        </a>
        <Link to="/manshift">
          <button
            type="button"
            className="btn btn-outline-primary"
            id="cancelbtn"
          ></button>
        </Link>
        <Link to="/">
          <button
            type="button"
            className="btn btn-outline-primary"
            id="savebtn"
          ></button>
        </Link>
        <button
          type="button"
          className="btn btn-outline-info"
          id="empsidebtn"
        ></button>
        <button
          type="button"
          className="btn btn-outline-info"
          id="timesidebtn"
        ></button>
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

        <div className="empleave">
          <form class="row g-3 needs-validation" novalidate id="empleaveform">
            {" "}
            <br />
            <h5 class="form-label">Review Deny Request</h5>
            <div class="col-md-5">
              <label class="form-label">Employee ID</label>
              <input
                disabled
                type="text"
                required
                className="form-control"
                name="empid"
                placeholder="Employee Id"
                value={this.state.empid}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="col-md-5">
              <label class="form-label">Leave Type</label>
              <input
                disabled
                type="text"
                required="required"
                className="form-control"
                name="empleavetype"
                placeholder="Casual, Annual or Sick"
                value={this.state.empleavetype}
                readonly
              />
            </div>
            <br />
            <div class="col-md-5">
              <label class="form-label">Start leave</label>
              <input
                disabled
                type="text"
                className="form-control"
                name="empleavestartdate"
                placeholder="To"
                value={
                  this.state.empleavestartdate &&
                  this.state.empleavestartdate.slice(0, 10)
                }
                readonly
              />
            </div>
            <div class="col-md-5">
              <label class="form-label">End leave</label>
              <input
                disabled
                type="text"
                className="form-control"
                name="empleaveenddate"
                placeholder="Enter Date of last visit"
                value={
                  this.state.empleaveenddate &&
                  this.state.empleaveenddate.slice(0, 10)
                }
                readonly
              />
            </div>
            <div class="col-md-5">
              <label class="form-label">Current Status</label>
              <input
                disabled
                type="text"
                required
                className="form-control"
                name="empleavestatus"
                placeholder="Reason"
                value={this.state.empleavestatus}
                readonly
              />
            </div>
            <div class="col-md-5">
              <label class="form-label">Request date</label>
              <input
                disabled
                type="text"
                required
                className="form-control"
                name="empleavedate"
                placeholder="Date"
                value={
                  this.state.empleavedate &&
                  this.state.empleavedate.slice(0, 10)
                }
                readonly
              />
            </div>
            <div class="col-md-10">
              <label class="form-label">Reason</label>
              <input
                disabled
                type="text"
                required
                className="form-control"
                name="empleavereason"
                placeholder="Reason"
                value={this.state.empleavereason}
                readonly
              />
            </div>
            <div class="col-md-10">
              <label class="form-label">Comments</label>
              <input
                type="text"
                required
                className="form-control"
                name="empleavecomment"
                placeholder=""
                value={this.state.empleavecomment}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="col-md-3">
              <button
                className="btn btn-danger form-control"
                type="submit"
                onClick={this.onSubmit}
              >
                Deny
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
