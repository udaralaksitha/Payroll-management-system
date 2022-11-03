// import sche from './Scheduling.png';
import "./Shift_Time.css";
import { FcPlus } from "react-icons/fc";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {TimePickerComponent} from "@syncfusion/ej2-react-calendars";
import axios from 'axios'
import Swal from 'sweetalert2';
import React, { useState } from "react";


const Empleave = () => {
  var empid = localStorage.getItem("logID");
  var empleavename = localStorage.getItem("ename");
  const [inputs, setInputs] = useState({
    empleavetype: "",
    empleavestartdate: "",
    empleaveenddate: "",
    empid:empid,
    empleavereason: "",
    empleavestatus: "Pending",
    empleavecomment:"",
    empleavename:empleavename
    
  });
console.log(empleavename);
    //changed values are updated
    const handleInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      setInputs((values) => ({ ...values, [name]: value }));
    };
   
    

  


    // if (this.state.empleavestartdate  > this.state.empleaveenddate ) {
    //   isError = true;
    // }
    // if (!this.state.empleavetype) {
    //   isError = true;
    // }
    // if (!this.state.empleavestartdate) {
    //   isError = true;
    // }
    // if (!this.state.empleaveenddate) {
    //   isError = true;
    // }
    // if (!this.state.empid) {
    //   isError = true;
    // }
    // if (!this.state.empleavereason) {
    //   isError = true;
    // }

    // this.setState({ 
    //   ...this.state,
    // });
    // return isError;




    const onSubmit = (e) => {
    e.preventDefault();
    if (inputs.empleavestartdate >inputs.empleaveenddate) {
      Swal.fire({
        text: 'Start Date must be before end date'
    })
    } else if (inputs.empleavetype === "") {
      Swal.fire({
        text: 'Leave type should not be empty'
    })
    }  else if (inputs.empleavestartdate === "") {
      Swal.fire({
        text: 'Leave start date should not be empty'
    })
    } 
    else if (inputs.empleaveenddate === "") {
      Swal.fire({
        text: 'Leave end date should not be empty'
    })
    } 
    else if (inputs.empleavereason === "") {
      Swal.fire({
        text: 'Leave reason should not be empty'
    })
    } 
    else {

      axios
      .post("http://localhost:8400/empleave/add", inputs)
      .then((res) => {
        alert("Added Successfully!!!");
        setInputs("");
        setTimeout(() => {  console.log("World!"); }, 5000);
        window.location.reload();
      })
      
  }
};



  return (
    

    <div className="bgimg4" >
      
    <button type="button" className="btn btn-info" id="sidebtn"></button>
    <div className='empleave'>
    
    
    <form class="row g-3 needs-validation" novalidate id="empleaveform"> 

    <h3 class="form-label">Leave Request</h3>
            

            <div class="col-md-5">
              <label class="form-label">Employee ID</label>
              <input type="text" 
                                className="form-control"
                                name="empid" readOnly
                                placeholder="Employee Id"
                                value={inputs.empid || ""}
                                onChange={handleInputChange} 
            />
            </div>

            <div class="col-md-5">
              <label class="form-label">Employee Name</label>
              <input type="text" 
                                className="form-control"
                                name="empleavename" readOnly
                                placeholder="Employee Name"
                                value={inputs.empleavename || ""}
                                onChange={handleInputChange} 
            />
            </div>

            <div class="col-md-5">
            
            
              <label class="form-label">Leave Type</label>
              <input type="text" required ="required"
                                className="form-control"
                                name="empleavetype"
                                placeholder="Casual, Annual or Sick"
                                value={inputs.empleavetype || ""}
                                onChange={handleInputChange} 
                                />
              
            </div>
            <br></br>
            <div class="col-md-5">
              <label class="form-label">Start leave</label>
              <input type="date"
                                className="form-control"
                                name="empleavestartdate"
                                placeholder="To"
                                value={inputs.empleavestartdate || ""}
                                onChange={handleInputChange} />
            </div>

            <div class="col-md-5">
              <label class="form-label">End leave</label>
              <input type="date"
                                className="form-control"
                                name="empleaveenddate"
                                placeholder="Enter Date of last visit"
                                value={inputs.empleaveenddate || ""}
                                onChange={handleInputChange} />
              
            </div>

            <div class="col-md-10">
              <label class="form-label">Reason</label>
              <input type="text" required
                                className="form-control"
                                name="empleavereason"
                                placeholder="Reason"
                                value={inputs.empleavereason || ""}
                                onChange={handleInputChange} />
            </div>
            
            
            <div class="col-md-10">
              <br/>
              <button className="btn btn-primary form-control" type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </form>
        
        </div>   
    {/* <button type="button" className="btn btn-primary" id="emptimesavebtn"></button> */}
      


    </div>
    
    
  )
}


export default Empleave;