// import sche from './Scheduling.png';
import './Shift_Time.css';
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
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import shiftimg from './images/sh.jpg';

export default class SpecEmpShift extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {


      empshift:{}
    
        
    };
}


//executes after components and subcomponents execute
componentDidMount(){

  //save id to variable ptid
  const shiftid = this.props.match.params.id;

  //axios is a promise based http client used to communicate with front end and backend
  //get details from backend using axios and get giving path with above id assigned variable
  axios.get(`http://localhost:8400/empshift/${shiftid}`).then((res) =>{  //promise and callback function handled by arrow function 

          //if data get is successful then set state to patients shifts
          if(res.data.success){
          this.setState({
            empshift:res.data.empshift
          });

          //display patients in console
          console.log(this.state.empshift);
      }
  })

}
//This function will display the specified  code inside the specified element. In react this is where jsx elemets reside
render() {

//get the data through patients variable
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
} = this.state.empshift;
  

  
  
    
  return (
    
    <div className="shifts" >
    <button type="button" className="btn btn-info" id="sidebtn" ></button> 
    <Link to='/employees'> <button type="button" className="btn btn-outline-dark" id="empsidebtn"></button>  </Link>
    <Link to='/manemptimesheet'> <button type="button" className="btn btn-outline-dark" id="timesidebtn"></button> </Link>
    <button type="button" className="btn btn-outline-info" id="salsidebtn"></button>
    <Link to='/PBDashboard'><button type="button" className="btn btn-outline-info" id="prosidebtn"></button>  </Link>
    
     
    
    <h4 class="form-label" style={{color:'#9F2E80', position:'absolute', marginTop:'1%', marginLeft:'15.5%', fontSize:'30px', fontFamily:'monospace'}}>View Shift Schedule</h4>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'7%', marginLeft:'602px'}}><strong>Week Start</strong></label>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'13%', marginLeft:'302px'}}><strong>Week End</strong></label>
    <label class="form-label" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'13%', marginLeft:'606px'}}><strong>Week Number</strong></label>
    <label class="form-label" id="empsheetid" style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'7%', marginLeft:'230px'}}><strong>Emp ID</strong></label>
    <input className="form-control" id="emptweeknum" type="number" min="1" style={{ position:'absolute', marginTop:'13%', marginLeft:'763px', width:'70px', height:'30px'}}
     readOnly
     name="weeknumber"
     value={weeknumber}
     
     
     /> 
     <input className="form-control" id="emptweeknum" type="text" min="1" style={{ position:'absolute', marginTop:'7%', marginLeft:'415px', width:'100px', height:'30px'}}
    
    name="empshiftid"
    value={empshiftid}
    readOnly
    
    /> 
    <div style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'7%', marginLeft:'700px'}}> 
    
      <DatePickerComponent 
           selected={null}
           style={{width:'110px'}}
           firstDayOfWeek={1}
           weekNumber={true} 
           format="dd-MMM-yy"
           name="weekstartdate"
           value={weekstartdate}
           readOnly
           
           
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
           value={weekenddate}
           readOnly
           
          >          
      </DatePickerComponent>
      
    </div>
    {/* <div >
    <img style={{position:'absolute', marginTop:'5.5%', marginLeft:'900px', height:'200px', width:'500px', borderRadius:'15px'}}  src={shiftimg} />
    </div> */}
    <div>
    {/* Monday */}
    <div className="shiftmonstarttime" ><TimePickerComponent step={5}
    name="shiftmonstart"
    value={shiftmonstart}
    readOnly
    
   
    ></TimePickerComponent></div>
    {/* <div className="monstarttime"><input
    type="number"
    name="emptmonstart"
    value={this.state.emptmonstart}
    onChange={this.handleInputChange} 
    ></input></div> */}
    <div className="shiftmonendtime"><TimePickerComponent step={5}
    name="shiftmonend"
    value={shiftmonend}
    readOnly
   
    ></TimePickerComponent></div>
    
    
    

    
     {/* Tuesday */}
     <div className="shifttuestarttime"><TimePickerComponent step={5}
     name="shifttuestart"
     value={shifttuestart}
     onChange={this.handleInputChange} 
     ></TimePickerComponent></div>
    <div className="shifttueendtime"><TimePickerComponent step={5}
    name="shifttueend"
    value={shifttueend}
    readOnly
   
    ></TimePickerComponent></div>
    
    {/* Wednesday */}
     <div className="shiftwedstarttime"><TimePickerComponent step={5}
     name="shiftwedstart"
     value={shiftwedstart}
     readOnly
     
     ></TimePickerComponent></div>
    <div className="shiftwedendtime"><TimePickerComponent step={5}
    name="shiftwedend"
    value={shiftwedend}
    readOnly
   
    ></TimePickerComponent></div>
    
    {/* Thursday */}
    <div className="shiftthustarttime"><TimePickerComponent step={5}
    name="shiftthustart"
    value={shiftthustart}
    readOnly
    
    ></TimePickerComponent></div>
    <div className="shiftthuendtime"><TimePickerComponent step={5}
    name="shiftthuend"
    value={shiftthuend}
    readOnly
    
    ></TimePickerComponent></div>
    
    {/* Friday */}
    <div className="shiftfristarttime"><TimePickerComponent step={5}
    name="shiftfristart"
    value={shiftfristart}
    readOnly
    
    ></TimePickerComponent></div>
    <div className="shiftfriendtime"><TimePickerComponent step={5}
    name="shiftfriend"
    value={shiftfriend}
    readOnly
    
    ></TimePickerComponent></div>
   
    {/* Saturday */}
    <div className="shiftsatstarttime"><TimePickerComponent step={5}
    name="shiftsatstart"
    value={shiftsatstart}
    readOnly
    
    ></TimePickerComponent></div>
    <div className="shiftsatendtime"><TimePickerComponent step={5}
    name="shiftsatend"
    value={shiftsatend}
    readOnly
  
    ></TimePickerComponent></div>
    
    {/* Sunday */}
    <div className="shiftsunstarttime"><TimePickerComponent step={5}
      name="shiftsunstart"
      value={shiftsunstart}
      readOnly
      
      ></TimePickerComponent></div>
    <div className="shiftsunendtime"><TimePickerComponent step={5}
    name="shiftsunend"
    value={shiftsunend}
    readOnly
   
    ></TimePickerComponent></div>
    
    
    </div>
    
    </div>
    
    
  )
}}


