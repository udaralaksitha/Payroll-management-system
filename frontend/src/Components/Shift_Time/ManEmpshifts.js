// import sche from './Scheduling.png';
import "./Shift_Time.css";
import React, { Component, useState } from "react";
import axios from "axios";
import { FcPlus } from "react-icons/fc";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import Swal from "sweetalert2";
import { fontFamily } from "@mui/system";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import shiftimg from "./images/sh.jpg";

export default class ManEmpshifts extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      empshiftid: "",
      empname: "",
      weekstartdate: "",
      weekenddate: "",
      weeknumber: "",
      shiftmonstart: "",
      shiftmonend: "",
      shifttuestart: "",
      shifttueend: "",
      shiftwedstart: "",
      shiftwedend: "",
      shiftthustart: "",
      shiftthuend: "",
      shiftfristart: "",
      shiftfriend: "",
      shiftsatstart: "",
      shiftsatend: "",
      shiftsunstart: "",
      shiftsunend: "",

      //varible for all data fields
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

  validate = () => {
    let isError = false;

    if (this.state.weekstartdate > this.state.weekenddate) {
      isError = true;
    }
    if (!this.state.empshiftid) {
      isError = true;
    }
    if (!this.state.weeknumber) {
      isError = true;
    }
    if (!this.state.weekstartdate) {
      isError = true;
    }
    if (!this.state.weekenddate) {
      isError = true;
    }

    this.setState({
      ...this.state,
    });
    return isError;
  };

  //on submit, the submit button implementation for submit
  onSubmit = (e) => {
    //preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
    e.preventDefault();
    //declaring error variable as err
    //validate
    const err = this.validate();

    //destructor state variables
    const {
      empshiftid,
      empname,
      weekstartdate,
      weekenddate,
      weeknumber,
      shiftmonstart,
      shiftmonend,
      shifttuestart,
      shifttueend,
      shiftwedstart,
      shiftwedend,
      shiftthustart,
      shiftthuend,
      shiftfristart,
      shiftfriend,
      shiftsatstart,
      shiftsatend,
      shiftsunstart,
      shiftsunend,
    } = this.state;

    //create data object and set data to variables
    const shiftdata = {
      empshiftid: empshiftid,
      empname: empname,
      weekstartdate: weekstartdate,
      weekenddate: weekenddate,
      weeknumber: weeknumber,
      shiftmonstart: shiftmonstart,
      shiftmonend: shiftmonend,
      shifttuestart: shifttuestart,
      shifttueend: shifttueend,
      shiftwedstart: shiftwedstart,
      shiftwedend: shiftwedend,
      shiftthustart: shiftthustart,
      shiftthuend: shiftthuend,
      shiftfristart: shiftfristart,
      shiftfriend: shiftfriend,
      shiftsatstart: shiftsatstart,
      shiftsatend: shiftsatend,
      shiftsunstart: shiftsunstart,
      shiftsunend: shiftsunend,
    };

    //display data in console
    console.log(shiftdata);
    //if there are no errors post data
    if (!err) {
      //axios is a promise based http client used to communicate with front end and backend
      //get details from backend using axios and get giving path
      axios
        .post("http://localhost:8400/empshift/add", shiftdata)
        .then((res) => {
          //pass data then get a promise with res callback which then an arrow fuction is used to handle q
          //if res is successful set state to default, so they don't stay
          if (res.data.success) {
            this.setState({
              empshiftid: "",
              empname: "",
              weekstartdate: "",
              weekenddate: "",
              weeknumber: "",
              shiftmonstart: "",
              shiftmonend: "",
              shifttuestart: "",
              shifttueend: "",
              shiftwedstart: "",
              shiftwedend: "",
              shiftthustart: "",
              shiftthuend: "",
              shiftfristart: "",
              shiftfriend: "",
              shiftsatstart: "",
              shiftsatend: "",
              shiftsunstart: "",
              shiftsunend: "",
            });
          }
        });
      Swal.fire({
        text: "Shift has been Added",
      });
    } else {
      Swal.fire({
        text: "Please ensure all necessary fields are correctly filled such as start date, end date, week no and emp id",
      });
    }
  };

  render() {
    
  return (
    
    <div className="shifts" >
    <button type="button" className="btn btn-info" id="sidebtn" ></button> 
    <Link to='/employees'> <button type="button" className="btn btn-outline-dark" id="empsidebtn"></button>  </Link>
    <Link to='/manemptimesheet'> <button type="button" className="btn btn-outline-dark" id="timesidebtn"></button> </Link>
    <button type="button" className="btn btn-outline-info" id="salsidebtn"></button>
    <Link to='/PBDashboard'><button type="button" className="btn btn-outline-info" id="prosidebtn"></button>  </Link>
    
    
    <h4 class="form-label" style={{color:'#9F2E80', position:'absolute', marginTop:'1%', marginLeft:'15.5%', fontSize:'30px', fontFamily:'monospace'}}>Add Shift</h4>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'7%', marginLeft:'602px'}}><strong>Week Start</strong></label>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'13%', marginLeft:'302px'}}><strong>Week End</strong></label>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'13%', marginLeft:'606px'}}><strong>Week Number</strong></label>
    <label class="form-label" id="empsheetid" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'7%', marginLeft:'230px'}}><strong>Emp ID</strong></label>
    <input className="form-control" id="emptweeknum" type="number" min="1" style={{ position:'absolute', marginTop:'13%', marginLeft:'763px', width:'70px', height:'30px'}}
    
     name="weeknumber"
     value={this.state.weeknumber}
     onChange={this.handleInputChange}
     
     />   
     <input className="form-control" id="emptweeknum" type="text" min="1" style={{ position:'absolute', marginTop:'7%', marginLeft:'415px', width:'100px', height:'30px'}}
    
    name="empshiftid"
    value={this.state.empshiftid}
    onChange={this.handleInputChange}
    /> 
    <div style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'7%', marginLeft:'700px'}}> 
    
      <DatePickerComponent 
           selected={null}
           style={{width:'110px'}}
           firstDayOfWeek={1}
           weekNumber={true} 
           format="dd-MMM-yy"
           name="weekstartdate"
           value={this.state.weekstartdate}
           onChange={this.handleInputChange} 
          >          
      </DatePickerComponent>
      
    </div>

    <div style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'13%', marginLeft:'387px'}}> 
    
      <DatePickerComponent 
          utcOffset={0}
           style={{width:'110px'}}
           firstDayOfWeek={1}
           weekNumber={true} 
           format="dd-MMM-yy"
           name="weekenddate"
           value={this.state.weekenddate}
           onChange={this.handleInputChange} 
          >          
      </DatePickerComponent>
      
    </div>
    {/* <div >
    <img style={{position:'absolute', marginTop:'5.5%', marginLeft:'900px', height:'200px', width:'500px', borderRadius:'15px'}}  src={shiftimg} />
    </div> */}
        <div>
          {/* Monday */}
          <div className="shiftmonstarttime">
            <TimePickerComponent
              step={5}
              name="shiftmonstart"
              value={this.state.shiftmonstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          {/* <div className="monstarttime"><input
    type="number"
    name="emptmonstart"
    value={this.state.emptmonstart}
    onChange={this.handleInputChange} 
    ></input></div> */}
          <div className="shiftmonendtime">
            <TimePickerComponent
              step={5}
              name="shiftmonend"
              value={this.state.shiftmonend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          {/* Tuesday */}
          <div className="shifttuestarttime">
            <TimePickerComponent
              step={5}
              name="shifttuestart"
              value={this.state.shifttuestart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="shifttueendtime">
            <TimePickerComponent
              step={5}
              name="shifttueend"
              value={this.state.shifttueend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          {/* Wednesday */}
          <div className="shiftwedstarttime">
            <TimePickerComponent
              step={5}
              name="shiftwedstart"
              value={this.state.shiftwedstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="shiftwedendtime">
            <TimePickerComponent
              step={5}
              name="shiftwedend"
              value={this.state.shiftwedend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          {/* Thursday */}
          <div className="shiftthustarttime">
            <TimePickerComponent
              step={5}
              name="shiftthustart"
              value={this.state.shiftthustart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="shiftthuendtime">
            <TimePickerComponent
              step={5}
              name="shiftthuend"
              value={this.state.shiftthuend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          {/* Friday */}
          <div className="shiftfristarttime">
            <TimePickerComponent
              step={5}
              name="shiftfristart"
              value={this.state.shiftfristart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="shiftfriendtime">
            <TimePickerComponent
              step={5}
              name="shiftfriend"
              value={this.state.shiftfriend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          {/* Saturday */}
          <div className="shiftsatstarttime">
            <TimePickerComponent
              step={5}
              name="shiftsatstart"
              value={this.state.shiftsatstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="shiftsatendtime">
            <TimePickerComponent
              step={5}
              name="shiftsatend"
              value={this.state.shiftsatend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          {/* Sunday */}
          <div className="shiftsunstarttime">
            <TimePickerComponent
              step={5}
              name="shiftsunstart"
              value={this.state.shiftsunstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="shiftsunendtime">
            <TimePickerComponent
              step={5}
              name="shiftsunend"
              value={this.state.shiftsunend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
        </div>
        <div class="col-md-5">
          <br />
        </div>
        <div class="col-md-10">
          <br />
          <button
            className="btn btn-success"
            id="shiftApprtime"
            type="submit"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
