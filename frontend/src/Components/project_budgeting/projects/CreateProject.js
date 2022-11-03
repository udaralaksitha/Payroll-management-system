import React, { Component } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import '../pb.css';
import Swal from 'sweetalert2';


export default class CreateProject extends Component {
  constructor(props){
    super(props);
    this.state = {//what should be on the code
    ProjectId : "",
    Project : "",
    Assignees : "",
    PStartDate : "",
    PEndDate : "",
    Progress : "",
    ProjectOwner : "",
    Budget : "",
    SpentOn : "",
    Amount : "",
    Remaining : ""
  }
}
//understanding value changes
handleInputChange = (e) =>{//handle input change invoking
  const {name,value} = e.target;
  console.log(name)

  if(name === "Amount"){
    let calculation = this.state.Budget -  value
    console.log(calculation)

    this.setState({
      Remaining:calculation
    })
  }
  this.setState({//state up
    
    [name]:value
  })

  let ProjectId = () =>{
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

console.log(ProjectId());
  }


validate = () => {
  let isError = false;
  
  
  if (this.state.PStartDate  > this.state.PEndDate ) {
    isError = true;
  }
  if (!this.state.ProjectId){
    isError = true;
  }
  if (!this.state.Project){
    isError = true;
  }
  if (!this.state.Assignees){
    isError = true;
  }
  if (!this.state.PStartDate){
    isError = true;
  }
  if (!this.state.PEndDate){
    isError = true;
  }
  if (!this.state.Progress){
    isError = true;
  }
  if (!this.state.ProjectOwner){
    isError = true;
  }
  if (!this.state.SpentOn){
    isError = true;
  }
  if (!this.state.Amount){
    isError = true;
  }
  if (!this.state.Budget){
    isError = true;
  }
  if (!this.state.Remaining){
    isError = true;
  }
  this.setState({
    ...this.state,
  });
  return isError;
};

onSubmit = (e) =>{
  e.preventDefault();
  
  const err = this.validate();

//destructor - when the object goes out of scope or deleted
const {ProjectId,Project,Assignees,PStartDate,PEndDate,Progress,ProjectOwner,Budget, SpentOn, Amount, Remaining} = this.state;
  
//set variables
  const data = {
    ProjectId:ProjectId,
    Project:Project,
    Assignees:Assignees,
    PStartDate:PStartDate,
    PEndDate:PEndDate,
    Progress:Progress,
    ProjectOwner:ProjectOwner,
    Budget:Budget,
    SpentOn:SpentOn,
    Amount:Amount,
    Remaining:Remaining,
  }

  console.log(data)
  if (!err) {
    
  axios.post("http://localhost:8400/proj/save",data).then((res) =>{
    if(res.data.success){
      this.setState(
        {
          ProjectId : "",
          Project : "",
          Assignees : "",
          PStartDate : "",
          PEndDate :"",
          Progress : "",
          ProjectOwner : "",
          Budget :"",
          SpentOn : "",
          Amount : "",
          Remaining : ""
        }
        )
      }

    });
    Swal.fire({
      text: 'New record has been added'
  })
}else {    
    Swal.fire({
        text: 'Please ensure that all fields are filled, "Starting date" is before the "End Date" and "Amount" is less than the "Remaining/Budget amount"'
    })
}
}

  render(){
    return (
<div>
  <div className="pbaddproj" >
  <Link to="/phome">
    <button type="button" className="btn btn-info" id="pbsidebtn"></button></Link>

          <div>
          <Link to="/phome">
          <button type="button" className="btn btn-light" id="barphomebtnproj" ></button></Link> 
          </div>

          <div>
          <Link to="/thome">
          <button type="button" className="btn btn-light" id="bartaskbtnproj" ></button></Link> 
          </div>

          <div>
          <Link to="/cal">
          <button type="button" className="btn btn-light" id="barcalbtnproj" ></button></Link> 
          </div>

          <div>
          <Link to="/report">
          <button type="button" className="btn btn-light" id="barreportbtnproj" ></button></Link> 
          </div>


  <div style={{position:'absolute', left:'7%', right:'2.5%'}}>
      <div className = "row" style = {{marginTop:'-65px'}}>

      <div className = "col-md-8 mt-4 mx-auto">
        <h1 className = "h3 mb-2 font-weight-normal">Add Project details</h1>
    

        <form>
        <div id="scrolladdproj" style = {{height:'465px'}}   >
        <div class="addcard">
          &nbsp;
          <div class="addprojcard" style={{width:"800px", marginTop:"10px"}}>
          
            <table class="table" style={{width:"700px"}}>
            <thead class="thead-dark">
              <tr>
                <th scope="col" style={{textAlign:"center"}}>Project Details</th>
              </tr>
              </thead>


              <div class="input-group input-group-sm mb-3">
          <div className = "form-group">
          <label>Project ID</label>
          <input  type="text" 
                  className ="form-control" 
                  name = "ProjectId"
                  id="projectid"
                  value = {this.state.ProjectId}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
          </div>

      <div className = "form-group">
      <label>Project Name</label>
      <input  type="text" 
              className ="form-control" 
              name = "Project"
              id="project"
              value = {this.state.Project}
              onChange = {this.handleInputChange}
              aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className = "form-group">
      <label>Assignees</label>
      <input  type="text" 
              className ="form-control" 
              name = "Assignees"
              id="assignees"
              value = {this.state.Assignees}
              onChange = {this.handleInputChange}
              aria-describedby="inputGroup-sizing-sm"/>
            </div> 

    <div className = "form-group">
    <label>Project Starting Date</label>
    <input  type="date" 
            className ="form-control" 
            name = "PStartDate"
            id="pstartdate"
            value = {this.state.PStartDate}
            onChange = {this.handleInputChange}
            aria-describedby="inputGroup-sizing-sm"/>
          </div>

          <div className = "form-group">
    <label>Project Ending Date</label>
    <input  type="date" 
            className ="form-control" 
            name = "PEndDate"
            id="penddate"
            value = {this.state.PEndDate}
            onChange = {this.handleInputChange}
            aria-describedby="inputGroup-sizing-sm"/>
          </div>


    <div className = "form-group">
    <label>Progress</label>
    <input  type="text" 
            className ="form-control" 
            name = "Progress"
            id="progress"
            value = {this.state.Progress}
            onChange = {this.handleInputChange}
            aria-describedby="inputGroup-sizing-sm"/>
    </div>
    
    <div className = "form-group">
      <label>Project Owner</label>
      <input  type="text" 
              className ="form-control" 
              name = "ProjectOwner"
              id="projectowner"
              value = {this.state.ProjectOwner}
              onChange = {this.handleInputChange}
              aria-describedby="inputGroup-sizing-sm"/>
            </div>
            &nbsp;
            </div>
            </table>
          </div>


          <div className = "col-md-8 mt-4 mx-auto">
          <div class="addbudcard" style={{width:"800px"}}>
          <table class="table" style={{width:"700px"}}>
            <thead class="thead-dark">
              <tr>
                <th scope="col" style={{textAlign:"center"}}>Budget Details</th>
              </tr>
          </thead>
          &nbsp;
            <div className = "form-group">
             
    <label>Budget Amount</label>
    <input  type="number" 
            className ="form-control" 
            name = "Budget"
            id="budget"
            style={{width :"500px"}}
            value = {this.state.Budget}
            onChange = {this.handleInputChange}/>
             <span class="input-group-text" id="currency4" >RS(LKR)</span>
          </div>


      <div className = "form-group">
      <label style={{marginTop:"20px"}}>Spent On</label>
            <select value={this.state.SpentOn}
                    name = "SpentOn"
                    id="spenton"
                    style={{width :"505px"}}
                    onChange = {this.handleInputChange}>
            <option value="">Select</option>
            <option value="Equipments">Equipments</option>
            <option value="Transportation">Transportation</option>
            <option value="Building">Building</option>
                </select>
            </div> 

    <div className = "form-group">
    <label style={{marginTop:"20px"}}>Amount Spent</label>
    <input  type="number" 
            className ="form-control" 
            name = "Amount"
            id="amount"
            style={{width :"500px"}}
            value = {this.state.Amount}
            onChange = {this.handleInputChange}/>
             <span class="input-group-text" id="currency5">RS(LKR)</span>
          </div>


    <div className = "form-group">
    <label style={{marginTop:"20px"}}>Remaining Amount</label>
    <input  type="number" 
            className ="form-control" 
            name = "Remaining"
            id="remaining"
            style={{width :"500px"}}
            value = {this.state.Remaining}
            onChange = {this.handleInputChange}/>
             <span class="input-group-text" id="currency6">RS(LKR)</span>
            {console.log(this.state.Remaining)}
    </div>
    </table>
    &nbsp;
          </div>
          </div>
         

    <button className = "btn btn-successAddProject" type = "submit"  value="Submit" onClick = {this.onSubmit} style = {{marginTop:'10px' , marginLeft: '570px', width: '200px'}}>
    &nbsp; Add
    </button>
   
    </div>
   
    </div>
  </form>
 </div>
 </div>
 </div>
</div>
</div>
);
}
}


