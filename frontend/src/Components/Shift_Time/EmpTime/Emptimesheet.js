// import sche from './Scheduling.png';
// import '../Shift_Time.css';
import React, { Component, useState } from 'react'
import axios from 'axios'; 
import { FcPlus } from "react-icons/fc";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {TimePickerComponent} from "@syncfusion/ej2-react-calendars";
import { DatePickerComponent} from '@syncfusion/ej2-react-calendars';
import Swal from 'sweetalert2';
import { fontFamily } from '@mui/system';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Emptimesheet extends Component {
  //constructor
  constructor(props) {
    super(props);
    let empid = localStorage.getItem("logID");
    let emptimename = localStorage.getItem("ename")

    this.state = {
        //varible for all data fields
        monot: "0",
        montot: "0",
        tueot: "0",
        tuetot: "0",
        wedot: "0",
        wedtot: "0",
        thuot: "0",
        thutot: "0",
        friot: "0",
        fritot: "0",
        satot: "0",
        sattot: "0",
        sunot: "0",
        suntot: "0",
        weekot: "0",
        weektot: "0",
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
        empid:empid,
        emptimename:emptimename,
        emptimemonth:"",
        emptimestatus:"Pending"

    }
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

    if (this.state.emptstartdate > this.state.emptenddate) {
      isError = true;
    }
    if (!this.state.emptweek) {
      isError = true;
    }
    if (!this.state.empid) {
      isError = true;
    }
    if (!this.state.weektot) {
      isError = true;
    }




  this.setState({ 
    ...this.state,
  });
  return isError;

};

//on submit, the submit button implementation for submit, passes data to manager table to view
onSave = (e) => {
  //preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
  e.preventDefault();
  //declaring error variable as err
  //validate
  const err = this.validate();

  //destructor state variables 
  const { monot,
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
  emptimename,
  emptimemonth,
  emptimestatus } = this.state;

  //create data object and set data to variables
  const timesheetdata = {
      
    monot:monot,
    montot:montot,
    tueot:tueot,
    tuetot:tuetot,
    wedot:wedot,
    wedtot:wedtot,
    thuot:thuot,
    thutot:thutot,
    friot:friot,
    fritot:fritot,
    satot:satot,
    sattot:sattot,
    sunot:sunot,
    suntot:suntot,
    weekot:this.state.weekot,
    weektot:this.state.weektot,
    emptstartdate:emptstartdate,
    emptenddate:emptenddate,
    emptweek:emptweek,
    emptmonstart:emptmonstart,         
    emptmonend:emptmonend,
    empttuestart:empttuestart,
    empttueend:empttueend,
    emptwedstart:emptwedstart,
    emptwedend:emptwedend,
    empthustart:empthustart,
    emptthuend:emptthuend,              
    emptfristart:emptfristart,
    emptfriend:emptfriend,
    emptsatstart:emptsatstart,
    emptsatend:emptsatend,
    emptsunstart:emptsunstart,
    emptsunend:emptsunend,
    empid:empid,
    emptimename:emptimename,
    emptimemonth:emptimemonth,
    emptimestatus:emptimestatus
    


  }

  //display data in console
  console.log(timesheetdata)
  //if there are no errors post data
  if (!err) {
  //axios is a promise based http client used to communicate with front end and backend
  //get details from backend using axios and get giving path
  axios.post('http://localhost:8400/emptimesheetuser/add', timesheetdata).then((res) => { //pass data then get a promise with res callback which then an arrow fuction is used to handle q
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
            empid:"",
            emptimename:"",
            emptimemonth:"",
            emptimestatus:"Pending"
          }
          );
      }
  });
  Swal.fire({
    text: 'Your time sheet has been submitted'
})
}else {    
  Swal.fire({
      text: 'Please ensure all necessary fields are correctly filled such as start date, end date, week no, emp id and it is saved before submitting'
  })
}
};


 //on submit, the submit button implementation for submit, passes data to manager table to view
 onSubmit = (e) => {
  //preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
  e.preventDefault();
  //declaring error variable as err
  //validate
  const err = this.validate();

  //destructor state variables 
  const { monot,
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
  emptimename,
  emptimemonth,
  emptimestatus } = this.state;

  //create data object and set data to variables
  const timesheetdata = {
      
    monot:monot,
    montot:montot,
    tueot:tueot,
    tuetot:tuetot,
    wedot:wedot,
    wedtot:wedtot,
    thuot:thuot,
    thutot:thutot,
    friot:friot,
    fritot:fritot,
    satot:satot,
    sattot:sattot,
    sunot:sunot,
    suntot:suntot,
    weekot:this.state.weekot,
    weektot:this.state.weektot,
    emptstartdate:emptstartdate,
    emptenddate:emptenddate,
    emptweek:emptweek,
    emptmonstart:emptmonstart,         
    emptmonend:emptmonend,
    empttuestart:empttuestart,
    empttueend:empttueend,
    emptwedstart:emptwedstart,
    emptwedend:emptwedend,
    empthustart:empthustart,
    emptthuend:emptthuend,              
    emptfristart:emptfristart,
    emptfriend:emptfriend,
    emptsatstart:emptsatstart,
    emptsatend:emptsatend,
    emptsunstart:emptsunstart,
    emptsunend:emptsunend,
    empid:empid,
    emptimename:emptimename,
    emptimemonth:emptimemonth,
    emptimestatus:emptimestatus
    


  }

    //display data in console
    console.log(timesheetdata);
    //if there are no errors post data
    if (!err) {
      //axios is a promise based http client used to communicate with front end and backend
      //get details from backend using axios and get giving path
      axios
        .post("http://localhost:8400/emptimesheet/add", timesheetdata)
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
            empid:"",
            emptimename:"",
            emptimemonth:"",
            emptimestatus:"Pending"
          }
          );
      }
  });
  Swal.fire({
    text: 'Your time sheet has been submitted'
})
}else {    
  Swal.fire({
      text: 'Please ensure all necessary fields are correctly filled such as start date, end date, week no, emp id and it is calculated before submitting'
  })
}
};

  //Weekly total ot cal
  otcal = () => {
    this.setState({
      weekot:
        parseInt(this.state.monot) +
        parseInt(this.state.tueot) +
        parseInt(this.state.wedot) +
        parseInt(this.state.thuot) +
        parseInt(this.state.friot) +
        parseInt(this.state.satot) +
        parseInt(this.state.sunot),
    });
  };

  //Weekly total regular hours cal
  hoursCal = () => {
    this.setState({
      weektot:
        parseInt(this.state.montot) +
        parseInt(this.state.tuetot) +
        parseInt(this.state.wedtot) +
        parseInt(this.state.thutot) +
        parseInt(this.state.fritot) +
        parseInt(this.state.sattot) +
        parseInt(this.state.suntot),
    });
  };

  render() {
    
  return (
    
    <div className="bgimg3" ><button type="button" className="btn btn-info" id="emptimesidebtn"></button>

    
    <h4 class="form-label" style={{color:'#9F2E80', position:'absolute', marginTop:'1.1%', marginLeft:'307px', fontFamily:'monospace'}}>Time Sheet</h4>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'1.3%', marginLeft:'608px'}}><strong>Start Date</strong></label>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'1.3%', marginLeft:'900px'}}><strong>End Date</strong></label>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'1.3%', marginLeft:'1195px'}}><strong>Week Number</strong></label>
    <label class="form-label" id="empsheetid" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'41%', marginLeft:'250px'}}><strong>Emp ID</strong></label>
    <label class="form-label" id="empsheetid" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'41%', marginLeft:'543px'}}><strong>Name</strong></label>
    <input className="form-control" id="emptweeknum" type="number" min="1" style={{ position:'absolute', marginTop:'1.2%', marginLeft:'1357px', width:'70px', height:'30px'}}
    
     name="emptweek"
     value={this.state.emptweek}
     onChange={this.handleInputChange}
     />   
     <input className="form-control" id="emptweeknum" type="text" min="1" style={{ position:'absolute', marginTop:'41%', marginLeft:'414px', width:'100px', height:'30px'}}
    
    name="empid"
    value={this.state.empid}
    readOnly
    disabled
    onChange={this.handleInputChange}
    /> 
    <input className="form-control" id="emptweeknum" type="text" min="1" style={{ position:'absolute', marginTop:'41%', marginLeft:'710px', width:'100px', height:'30px'}}
    
    name="emptimename"
    value={this.state.emptimename}
    readOnly
    disabled
    onChange={this.handleInputChange}
    /> 
    <div style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'1%', marginLeft:'700px'}}> 
    
      <DatePickerComponent 
           selected={null}
           style={{width:'110px'}}
           firstDayOfWeek={1}
           weekNumber={true} 
           format="dd-MMM-yy"
           name="emptstartdate"
           value={this.state.emptstartdate}
           onChange={this.handleInputChange} 
          >          
      </DatePickerComponent>
      
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
              step={5}
              name="emptmonend"
              value={this.state.emptmonend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>

          <input
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
              step={5}
              name="empttuestart"
              value={this.state.empttuestart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="tueendtime">
            <TimePickerComponent
              step={5}
              name="empttueend"
              value={this.state.empttueend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
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
              step={5}
              name="emptwedstart"
              value={this.state.emptwedstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="wedendtime">
            <TimePickerComponent
              step={5}
              name="emptwedend"
              value={this.state.emptwedend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
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
              step={5}
              name="empthustart"
              value={this.state.empthustart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="thuendtime">
            <TimePickerComponent
              step={5}
              name="emptthuend"
              value={this.state.emptthuend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
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
              step={5}
              name="emptfristart"
              value={this.state.emptfristart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="friendtime">
            <TimePickerComponent
              step={5}
              name="emptfriend"
              value={this.state.emptfriend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
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
              step={5}
              name="emptsatstart"
              value={this.state.emptsatstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="satendtime">
            <TimePickerComponent
              step={5}
              name="emptsatend"
              value={this.state.empteemptsatendnddate}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
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
              step={5}
              name="emptsunstart"
              value={this.state.emptsunstart}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <div className="sunendtime">
            <TimePickerComponent
              step={5}
              name="emptsunend"
              value={this.state.emptsunend}
              onChange={this.handleInputChange}
            ></TimePickerComponent>
          </div>
          <input
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
    <p style={{color:'#992804'}} className="form-control" id= "weekot" type="number" placeholder="Hours"  name="weekot" value={this.state.weekot} onChange={this.handleInputChange}> <strong>{this.state.weekot} </strong> </p> 
    
    <p className="form-control" style={{color:'#992804'}} id= "weektot" type="number" placeholder="Hours"  name="weektot" value={this.state.weektot} onChange={this.handleInputChange}> <strong>{this.state.weektot} </strong> </p>
    
    
    
    
    </div>
    <div class="col-md-5">  
              <br/>
              <button className="btn btn-primary" id="timesheetsave" type="submit" onClick={this.onSave} >Save</button>
            </div>
            <div class="col-md-10">
              <br/>
              <button className="btn btn-success" id="Apprtime" type="submit" onClick={this.onSubmit} >Submit for Approval</button>
            </div>
            <div class="col-md-10">
              <br/>
              <button className="btn btn-secondary" id="timesheetsaveuser" type="submit"  onClick={()=>{
                this.otcal();
                this.hoursCal();
              }}>Calculate</button>
            </div>
    </div>
    
    
  )
}}


