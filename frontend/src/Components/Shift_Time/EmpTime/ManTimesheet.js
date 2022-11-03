import React, { Component, useState } from 'react'
import axios from 'axios'; 
import {BrowserRouter as Router, Link, useParams} from 'react-router-dom';
// import './Shift_Time.css';
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




class  ManTimesheet extends Component {

    constructor(props){
        super(props);

        this.state={
            emptimesheet:[],
            rows: [],
            search:'',
            emptimestatus:''
             

        };

    }

    
    // Crate array for excel data
    createData = (
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
      emptimename
     ) => {
        return { 
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
          emptimename
         };
      }
      
      makeExcelData = (data) => {
        console.log("data ", data)
        const array = []
        data.map((row) => {
            array.push(this.createData( 
              row.monot,
              row.montot,
              row.tueot,
              row.tuetot,
              row.wedot,
              row.wedtot,
              row.thuot,
              row.thutot,
              row.friot,
              row.fritot,
              row.satot,
              row.sattot,
              row.sunot,
              row.suntot,
              row.weekot,
              row.weektot,
              row.emptstartdate,
              row.emptenddate,
              row.emptweek,
              row.emptmonstart,            
              row.emptmonend,
              row.empttuestart,
              row.empttueend,
              row.emptwedstart,
              row.emptwedend,
              row.empthustart,
              row.emptthuend,                
              row.emptfristart,
              row.emptfriend,
              row.emptsatstart,
              row.emptsatend,
              row.emptsunstart,
              row.emptsunend,
              row.empid,
              row.emptimename,
              row.emptimestatus))
         
          }
        )
        console.log("array ", array)
        this.setState({rows: array})
      }

    componentDidMount(){
        this.retrieveEmptimesheets();
    }

    //fetch all Time sheets 
    // Resources used to create these  functions to view include https://www.youtube.com/watch?v=4srOfbE-sDg&list=PLvfC6i-hEZBnqqF7giszuYI0iqenU5NY0
    retrieveEmptimesheets(){
        //get data using axios and backend end route
        axios.get("http://localhost:8400/manemptimesheet").then(res =>{
            if(res.data.success){
                this.setState({
                  emptimesheet:res.data.existingEmptimesheet
                });

                console.log(this.state.emptimesheet)
                 this.makeExcelData(res.data.existingEmptimesheet)
            }
        });
    }

    conf = () => {
        let confirms = true;
        if (window.confirm("Are you sure you want to delete this Time sheet Permanently?  ") == true) {
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
          axios.delete(`http://localhost:8400/emptimesheet/delete/${id}`).then((res) =>{

           

            Swal.fire({
                text: 'Timesheet Deleted Successfully'
                
              })  
              this.retrieveEmptimesheets();
          })
        }
      }  

    // filter by many attributes
 filterData(emptimesheet,searchKey){

    const results = emptimesheet.filter((emptimesheet) =>  
    

    emptimesheet.empid.toLowerCase().includes(searchKey) ||  emptimesheet.empid.toUpperCase().includes(searchKey) || 
    emptimesheet.emptweek.includes(searchKey) ||   
    emptimesheet.emptimestatus.toLowerCase().includes(searchKey) || emptimesheet.emptimestatus.toUpperCase().includes(searchKey)

    )
  
    this.setState({emptimesheet:results})
  
  }
  //search
  handleSearchArea = (e) =>{
    const searchKey = e.currentTarget.value;
    //axios is a promise based http client used to communicate with front end and backend
    axios.get("http://localhost:8400/manemptimesheet").then(res =>{
      if(res.data.success){
        
  
        this.filterData(res.data.existingEmptimesheet,searchKey)
    }
    });
  
  }

  



    render() {
        return (

          <div className="mantimesheet" >

            
            <button type="button" className="btn btn-info" id="emptimesidebtn" ></button>
            
            
            <Link to='/manshiftdash'> <button type="button" className="btn btn-outline-dark" id="sidebtn" ></button> </Link> 
            <Link to='/employees'> <button type="button" className="btn btn-outline-dark" id="empsidebtn"></button>  </Link>
            <Link to='/manemptimesheet'> <button type="button" className="btn btn-outline-info" id="timesidebtn"></button> </Link>
            <button type="button" className="btn btn-outline-info" id="salsidebtn"></button>  
            <Link to='/PBDashboard'><button type="button" className="btn btn-outline-info" id="prosidebtn"></button>  </Link>
           
            
           
           <h5 style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'6.5%', marginLeft:'265px'}}>Weekly Time Sheets</h5> 
           <body>
             {/* Calendar popup modal */}
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{width:'195px', position:'absolute', marginTop:'5.8%', marginLeft:'845px'}}>
              Calendar
            </button>

            <div id = "scrollable">

            <div  style={{position:'absolute', left:'9%'}}>
            <button id = "Dreport" type="button" class="btn btn-primary" style={{width:'195px'}}>
            {this.state.rows && <CSVLink data={this.state.rows} style={{textDecoration:'none',color:'white' }}>Download Timesheets</CSVLink>}
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
           

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Calendar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <CalendarComponent 
                    style={{width:'1200px', marginLeft:'95px'}}
                    firstDayOfWeek={1}
                    weekNumber={true} 
                    format="dd-MMM-yy"
                    >          
                  </CalendarComponent>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

                <table class="table table-hover" id = "leavedash" style={{width:'1220px'}} >
                    <thead >
                <tr style={{textAlign:'center', backgroundColor:'#3F42FF'}}>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF', fontWeight:"normal"}} scope="col" ></th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}} scope="col"> Emp ID</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}}scope="col">Emp Name</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}}scope="col">Week Number</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}} scope="col">Week Start</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}}scope="col">Week end</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}}scope="col">Weekly Overtime</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}}scope="col" >Weekly Regular</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}}scope="col" >Status</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#3F42FF',fontWeight:"normal"}}scope="col" >Action</th>
                    
                    
                    </tr>
                </thead>
               
                <tbody>
                
                {this.state.emptimesheet.reverse().map((emptimesheet, index) =>(
                   
                    <tr  key = {index} style={{height:'100px', textAlign:'center'}}>
                    
                    <th style={{padding:'20px'}} scope = "row">{index+1}</th>
                    <td>
                        <a href={`/manemptimesheet/${emptimesheet._id}`} style={{textDecoration:'none'}}>
                        {emptimesheet.empid}
                        </a>
                    </td>
                    
                    <td>{emptimesheet.emptimename}</td>
                    <td>{emptimesheet.emptweek}</td>
                    <td><Moment format="YYYY/MM/DD">
                          {new Date(emptimesheet.emptstartdate)}
                        </Moment>
                    </td>
                    <td><Moment format="YYYY/MM/DD">
                          {new Date(emptimesheet.emptenddate)}
                        </Moment>
                    </td>
                    <td>{emptimesheet.weekot} Hours</td>
                    <td>{emptimesheet.weektot} Hours</td>
                    <td>{emptimesheet.emptimestatus}</td>
                    
                    {/* <td>{emptimesheet.emptmonstart}</td> */}
                    {/* <td><Moment tz="Asia/Colombo" format="hh:mm:A">
                          {new Date(emptimesheet.emptmonstart)}
                        </Moment>
                    </td> */}

                    <td >
                        <a className="btn btn-success"   title ="link" href={`/approvetimesheet/${emptimesheet._id}`}  style={{textDecoration:'none' }}>
                        &nbsp;Approve
                        
                        </a> 
                     
                        &emsp; 
                        <a className="btn btn-warning btn-small custom " href={`/denytimesheet/${emptimesheet._id}`} style={{textDecoration:'none' }}>
                        <i className="fas fa-trash-alt"></i>&nbsp;Deny
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-danger btn-small custom " style={{textDecoration:'none' }} onClick={() =>this.onDelete(emptimesheet._id)}>
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

export default ManTimesheet;