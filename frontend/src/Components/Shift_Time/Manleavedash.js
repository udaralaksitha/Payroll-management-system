import React, { Component, useState } from 'react'
import axios from 'axios'; 
import {BrowserRouter as Router, Link, useParams} from 'react-router-dom';
import './Shift_Time.css';
import {CSVLink, CSVDownload} from 'react-csv';
import { withRouter } from "react-router";
import { textAlign } from '@mui/system';
import AnnounceKit from 'announcekit-react';
import ManReviewLeave from './ApproveL';
import { green } from '@material-ui/core/colors';
import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import 'moment-duration-format';



class  Manleavedash extends Component {

    constructor(props){

        super(props);
        let logempid = localStorage.getItem("logID");
        this.state={
            leaverequsts:[],
            rows: [],
            search:'',
            empleavedate:"",
            jun:"", 
            empid:"",
            logempid:logempid           

        };

    }
    
    
    // Crate array for excel data
    createData = (empid, empleavename, empleavetype, empleavestartdate, empleaveenddate, empleavereason, empleavestatus, empleavedate ) => {
        return { empid, empleavename, empleavetype, empleavestartdate, empleaveenddate, empleavereason, empleavestatus, empleavedate };
      }
      
      makeExcelData = (data) => {
        console.log("data ", data)
        const array = []
        data.map((row) => {
            array.push(this.createData(row.empid, row.empleavename, row.empleavetype, row.empleavestartdate, row.empleaveenddate, row.empleavereason, row.empleavestatus, row.empleavedate))
         
          }
        )
        console.log("array ", array)
        this.setState({rows: array})
      }
      

    componentDidMount(){
        this.retrieveLeaver();
    }

    //fetch all leave requests 
    // Resources used to create these  functions to view include https://www.youtube.com/watch?v=4srOfbE-sDg&list=PLvfC6i-hEZBnqqF7giszuYI0iqenU5NY0
    retrieveLeaver(){
        //get data using axios and backend end route
        axios.get("http://localhost:8400/manempleave").then(res =>{
            if(res.data.success){
              
                this.setState({
                  
                  
                    leaverequsts:res.data.existingEmpleave
                    
                    
                });

                console.log(this.state.leaverequsts)
                this.makeExcelData(res.data.existingEmpleave)
                // let thisid = localStorage.getItem("logID")
                // let result = this.state.leaverequsts.filter(chunk => chunk.id === thisid);
                // console.log(result)

            }
        });
    }


    conf = () => {
        let confirms = true;
        if (window.confirm("Are you sure you want to delete this Leave Request? ") == true) {
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
          axios.delete(`http://localhost:8400/empleave/delete/${id}`).then((res) =>{

           

            Swal.fire({
                text: 'Request Deleted Successfully'
                
              })  
              this.retrieveLeaver();
          })
        }
      }  

     //filter by many attributes
 filterData(leaverequsts,searchKey){

    const results = leaverequsts.filter((leaverequsts) =>  
    

    
    // leaverequsts.empleavereason.toLowerCase().includes(searchKey) || leaverequsts.empleavereason.toUpperCase().includes(searchKey) ||
    leaverequsts.empleavetype.toLowerCase().includes(searchKey) || leaverequsts.empleavetype.toUpperCase().includes(searchKey) ||
    leaverequsts.empid.toLowerCase().includes(searchKey) || leaverequsts.empleavetype.toUpperCase().includes(searchKey) ||
    leaverequsts.empleavestatus.toLowerCase().includes(searchKey) || leaverequsts.empleavestatus.toUpperCase().includes(searchKey)

    )
  
    this.setState({leaverequsts:results})
  
  }

  handleSearchArea = (e) =>{
    const searchKey = e.currentTarget.value;
    //axios is a promise based http client used to communicate with front end and backend
    axios.get("http://localhost:8400/manempleave").then(res =>{
      if(res.data.success){
        
  
        this.filterData(res.data.existingEmpleave,searchKey)
    }
    });
  
  }




    render() {
      // const unixTimestamp = 198784740;
      // var created_date = new Date(leaverequsts.empleavestartdate);
        return (
            <div className = "bgimgManl" > 
            <body>
            <Link to='/manshift'>
            <button type="button" className="btn btn-info" id="sidebtn" ></button>
            </Link> 
            
            <Link to="/manshift">
            <button type="button" className="btn btn-outline-dark" id="shiftbtn" ></button>
            </Link> 
            <Link to="/manempleave">
            <button type="button" className="btn btn-outline-dark" id="leavebtn" > </button>
            </Link>

            <button type="button" className="btn btn-outline-info" id="empsidebtn"></button>
            <button type="button" className="btn btn-outline-info" id="timesidebtn"></button>
            <button type="button" className="btn btn-outline-info" id="salsidebtn"></button>   
            <button type="button" className="btn btn-outline-info" id="prosidebtn"></button>  
            <button type="button" className="btn btn-outline-info" id="depsidebtn"></button>  
            
           
           <h5 style={{textDecoration:'none',color:'#444040', position:'absolute', marginTop:'6.5%', marginLeft:'265px'}}>Leave Requests</h5> 
                    
            <div id = "scrollable">

            <div  style={{position:'absolute', left:'9%'}}>
            <button id = "Dreport" type="button" class="btn btn-primary">
            {this.state.rows && <CSVLink data={this.state.rows} style={{textDecoration:'none',color:'white' }}>Download Requests</CSVLink>}
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
               

            

                <table  class="table table-hover" id = "leavedash" style={{width:'1220px'}} >
                    <thead >
                <tr style={{textAlign:'center', backgroundColor:'#1CAF9A'}}>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A', fontWeight:"normal"}} scope="col" ></th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}} scope="col"> Emp ID</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}}scope="col">Emp Name</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}} scope="col">Request Date</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}}scope="col">Leave type</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}}scope="col">Leave Start Date</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}}scope="col">Leave End Date</th>
                    {/* <th scope="col">Reason</th> */}
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}}scope="col" >Status</th>
                    <th style={{color:"white", textAlign:"center", backgroundColor:'#1CAF9A',fontWeight:"normal"}}scope="col" >Action</th>
                    
                    
                    </tr>
                </thead>
               
                <tbody>
                
                
                {this.state.leaverequsts.reverse().map((leaverequsts, index) =>(
                   
                    <tr  key = {index} style={{height:'100px', textAlign:'center'}}>
                    
                    <th style={{padding:'20px'}} scope = "row">{index+1}</th>
                    <td style={{color:"blue"}}> {leaverequsts.empid} </td>
                    
                    <td>{leaverequsts.empleavename}</td>
                    <td><Moment format="YYYY/MM/DD">{new Date(leaverequsts.empleavedate)}</Moment></td>
                    <td>{leaverequsts.empleavetype}</td>
                    <td>{leaverequsts.empleavestartdate && leaverequsts.empleavestartdate.slice(0,10)}</td>
                    <td>{leaverequsts.empleaveenddate  && leaverequsts.empleaveenddate.slice(0,10)}</td>
                    {/* <td>{leaverequsts.empleavereason}</td> */}
                    <td>{leaverequsts.empleavestatus}</td>
                    <td >
                        <a className="btn btn-success"   title ="link"  href={`/emplapprove/${leaverequsts._id}`} style={{textDecoration:'none' }}>
                        &nbsp;Approve
                        
                        </a>
                     
                        &emsp; 
                        <a className="btn btn-warning btn-small custom " href={`/empldeny/${leaverequsts._id}`} style={{textDecoration:'none' }}>
                        <i className="fas fa-trash-alt"></i>&nbsp;Deny
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a className="btn btn-danger btn-small custom " style={{textDecoration:'none' }} onClick={() =>this.onDelete(leaverequsts._id)}>
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

export default Manleavedash;