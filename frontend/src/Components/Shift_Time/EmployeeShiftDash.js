import React, { Component, useState } from 'react'
import axios from 'axios'; 
import {BrowserRouter as Router, Link, useParams} from 'react-router-dom';
import './Shift_Time.css';
import {CSVLink, CSVDownload} from 'react-csv';
import { withRouter } from "react-router";
import { textAlign } from '@mui/system';
import AnnounceKit from 'announcekit-react';
import { green } from '@material-ui/core/colors';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment-timezone';
import 'moment-duration-format';
import Moment from 'react-moment';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';




class  EmployeeShiftDash extends Component {

    constructor(props){
        super(props);

        this.state={
            empshift:[],
            rows: [],
            search:'',
            
             

        };

    }

    
    //Crate array for excel data
    createData = (
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
     ) => {
        return { 
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
         };
        }
      
      makeExcelData = (data) => {
        console.log("data ", data)
        const array = []
        data.map((row) => {
            array.push(this.createData( 
              row.empshiftid,
              row.empname,
              row.weekstartdate,
              row.weekenddate,
              row.weeknumber,
              row.shiftmonstart,
              row.shiftmonend,
              row.shifttuestart,
              row.shifttueend,
              row.shiftwedstart,
              row.shiftwedend,
              row.shiftthustart,
              row.shiftthuend,
              row.shiftfristart,
              row.shiftfriend,
              row.shiftsatstart,
              row.shiftsatend,
              row.shiftsunstart,
              row.shiftsunend,
              ))
         
          }
        )
        console.log("array ", array)
        this.setState({rows: array})
      }

    componentDidMount(){
        this.retrieveEmpshifts();
    }

    //fetch all Time sheets 
    // Resources used to create these  functions to view include https://www.youtube.com/watch?v=4srOfbE-sDg&list=PLvfC6i-hEZBnqqF7giszuYI0iqenU5NY0
    retrieveEmpshifts(){
        //get data using axios and backend end route
        axios.get("http://localhost:8400/manempshift").then(res =>{
            if(res.data.success){
                this.setState({
                  empshift:res.data.existingEmpshift
                });

                console.log(this.state.empshift)
                 this.makeExcelData(res.data.existingEmpshift)
            }
        });
    }

    conf = () => {
        let confirms = true;
        if (window.confirm("Are you sure you want to delete this Shift Permanently?  ") == true) {
            confirms = false;
          } 
        else {
            confirms = true;
        }
        this.setState({ 
            ...this.state,
          });
          return confirms;
    }  

    onDelete = (id) =>{

        const errs = this.conf();
        if (!errs) {
        //axios is a promise based http client used to communicate with front end and backend
          axios.delete(`http://localhost:8400/empshift/delete/${id}`).then((res) =>{

           

            Swal.fire({
                text: 'Timesheet Deleted Successfully'
                
              })  
              this.retrieveEmpshifts();
          })
        }
      }  

    // filter by many attributes
 filterData(empshift,searchKey){

    const results = empshift.filter((empshift) =>  
    

    empshift.empshiftid.toLowerCase().includes(searchKey) ||  empshift.empshiftid.toUpperCase().includes(searchKey) || 
    empshift.weeknumber.includes(searchKey) ||   
    empshift.empname.toLowerCase().includes(searchKey) || empshift.empname.toUpperCase().includes(searchKey)

    )
  
    this.setState({empshift:results})
  
  }
  //search
  handleSearchArea = (e) =>{
    const searchKey = e.currentTarget.value;
    //axios is a promise based http client used to communicate with front end and backend
    axios.get("http://localhost:8400/manempshift").then(res =>{
      if(res.data.success){
        
  
        this.filterData(res.data.existingEmpshift,searchKey)
    }
    });
  
  }




    render() {
        return (
          <div className="mantimesheet" > 
            <body>
            {/* <button type="button" className="btn btn-info" id="sidebtn"></button>
            <Link to="/empbase"> <button type="button" className="btn btn-outline-info" id="empsidebtn"></button> </Link>
            <Link to="/emptime"> <button type="button" className="btn btn-outline-info" id="timesidebtn"></button> </Link>
            <Link to="/"> <button type="button" className="btn btn-outline-info" id="salsidebtn"></button>  </Link>
            <Link to="/PBDashboard"> <button type="button" className="btn btn-outline-info" id="prosidebtn"></button>  </Link>
            <button type="button" className="btn btn-outline-info" id="depsidebtn"></button>  
            <Link to="/Manshift">
            <button type="button" className="btn btn-outline-primary" id="shiftbtn"></button>
            </Link> 
            <Link to="/manempleave">
            <button type="button" className="btn btn-outline-primary" id="leavebtn"></button>
            </Link> */}

            <button type="button" className="btn btn-info" id="sidebtn" ></button> 
            <Link to='/employees'> <button type="button" className="btn btn-outline-dark" id="empsidebtn"></button>  </Link>
            <Link to='/manemptimesheet'> <button type="button" className="btn btn-outline-dark" id="timesidebtn"></button> </Link>
            <button type="button" className="btn btn-outline-info" id="salsidebtn"></button>
            <Link to='/PBDashboard'><button type="button" className="btn btn-outline-info" id="prosidebtn"></button>  </Link>
            
           
            <h4 class="form-label" style={{color:'#9F2E80', position:'absolute', marginTop:'1%', marginLeft:'15.5%', fontSize:'30px', fontFamily:'monospace'}}>My Shift Schedule</h4>
           
            <Link to="/manempshift">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{width:'195px', position:'absolute', marginTop:'5.8%', marginLeft:'845px'}}>
              Add Shift
            </button>
            </Link>

            <div id = "scrollable">

            <div  style={{position:'absolute', left:'9%'}}>
            <button id = "Dreport" type="button" class="btn btn-secondary" style={{width:'195px'}}>
            {this.state.rows && <CSVLink data={this.state.rows} style={{textDecoration:'none',color:'white' }}>Download Shifts</CSVLink>}
            </button> 
            </div>


           <div className = "searchbar" data-testid="test1">
            
          
            <input
             className = "form-control"
             type = "search"
             placeholder = "Search"
             name = "searchQuery"
             onChange = {this.handleSearchArea}> 
            </input>
        
            
       
            </div>
           
            <div className = "mandashleave">
           

            

                <table class="table table-hover" id = "leavedash" style={{width:'1220px'}} >
                    <thead >
                <tr style={{textAlign:'center', backgroundColor:'#9F2E80'}}>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#9F2E80', fontWeight:"normal"}} scope="col" ></th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#9F2E80',fontWeight:"normal"}} scope="col"> Emp ID</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#9F2E80',fontWeight:"normal"}}scope="col">Emp Name</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#9F2E80',fontWeight:"normal"}}scope="col">Week Number</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#9F2E80',fontWeight:"normal"}} scope="col">Week Start</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#9F2E80',fontWeight:"normal"}}scope="col">Week end</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#9F2E80',fontWeight:"normal"}}scope="col" >Action</th>
                    
                    
                    </tr>
                </thead>
               
                <tbody>
                
                {this.state.empshift.reverse().map((empshift, index) =>(
                   
                    <tr  key = {index} style={{height:'100px', textAlign:'center'}}>
                    
                    <th scope = "row" >{index+1}</th>
                    <td>
                        <a href={`/manempshift/${empshift._id}`} style={{textDecoration:'none'}}>
                        {empshift.empshiftid}
                        </a>
                    </td>
                    
                   
                    <td>{empshift.empname}</td>
                    <td>{empshift.weeknumber} </td>
                    <td>{empshift.weekstartdate && empshift.weekstartdate.slice(0,10)}</td>
                    <td>{empshift.weekenddate && empshift.weekenddate.slice(0,10)}</td>
                    
               

                    <td >
                        <a className="btn btn-primary"   title ="link" href={`/manempshift/${empshift._id}`} style={{width: '80px', textDecoration:'none' }}>
                        &nbsp;View
                        
                        </a> &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-warning"   title ="link" href={`/maneditshift/${empshift._id}`} style={{width: '80px', textDecoration:'none' }}>
                        &nbsp;Edit
                        
                        </a> 
                                                
                        &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-danger btn-small custom " style={{width: '80px', textDecoration:'none' }} onClick={() =>this.onDelete(empshift._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                    </a>
                    
                    </td>
                   
                    </tr>
                ))}
                </tbody>  
                </table>    



            </div>
            </div>
            </body>
            </div>
            
        )
    }

}

export default EmployeeShiftDash;