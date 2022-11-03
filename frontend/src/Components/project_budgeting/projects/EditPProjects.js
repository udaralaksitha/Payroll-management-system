import React, {Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class EditPProjects extends Component {

    constructor(props){
      super(props);
      this.state = {
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
  }

  validate = () => {
    let isError = false;
    
    
    if (this.state.PStartDate  > this.state.PEndDate ) {
      isError = true;
    }
    if (this.state.Amount  > this.state.Budget ) {
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
    const err = this.validate();//does not accept any parameter, will access the exact location
    const pid = this.props.match.params.id;
  
  //destructor
    const {ProjectId,Project,Assignees,PStartDate,PEndDate,Progress,ProjectOwner,Budget,SpentOn,Amount,Remaining} = this.state;
    
  //set variables
    const pdata = {
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

    console.log(pdata) //implement a put method to update existing
    if (!err) {
    
    axios.put(`http://localhost:8400/proj/updates/${pid}`,pdata).then((res) =>{
      if(res.data.success){
        this.setState(
          {
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
        )
      }
    });
  Swal.fire({
    text: 'Project and budget details have been updated'
})
}else {    
  Swal.fire({
      text: 'Please ensure that all fields are filled, "Starting date" is before the "End Date" and "Amount" is less than the "Budget amount"'
  })
}
}


  componentDidMount(){ //implement a method to retrieve specific post details
    const pid = this.props.match.params.id;
    axios.get(`http://localhost:8400/getspecproj/${pid}`).then((res) => {
        if(res.data.success){
            this.setState({
                ProjectId: res.data.Projects.ProjectId,
                Project: res.data.Projects.Project,
                Assignees: res.data.Projects.Assignees,
                PStartDate: res.data.Projects.PStartDate,
                PEndDate: res.data.Projects.PEndDate,
                Progress: res.data.Projects.Progress,
                ProjectOwner: res.data.Projects.ProjectOwner,
                Budget: res.data.Projects.Budget,
                SpentOn: res.data.Projects.SpentOn,
                Amount: res.data.Projects.Amount,
                Remaining: res.data.Projects.Remaining

            });
        
            console.log(this.state.Projects);
        }
    });
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

      <div style={{position:'absolute', left:'6.5%', right:'2.5%'}}>
      <div className = "row" style = {{marginTop:'-80px'}}>

      <div className = "col-md-8 mt-4 mx-auto">
        <h1 className = "h3 mb-2 font-weight-normal">Edit Project details</h1>

        <form className = "needs-validation" noValidate>
        <div id="scrolledproj" style = {{height:'465px'}}   >
        <div class="editcard">
        &nbsp;
          <div class="edprojcard" style={{width:"800px", marginTop:"30px"}}>
          
            <table class="table" style={{width:"700px"}}>
            <thead class="thead-dark">
              <tr>
                <th scope="col" style={{textAlign:"center"}}>Project Details</th>
              </tr>
              </thead>


              <div class="input-group input-group-sm mb-3">
              <span 
                id="projectidbox"  style={{textAlign:'center'}}>Project ID</span>
          <input type="text" 
                  className ="form-control"  
                  style={{width:'10px'}}
                  name = "ProjectId"
                  id="edprojectid"
                  value = {this.state.ProjectId}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
              </div>

          <div class="input-group input-group-sm mb-3">
          <span  
                id="projectbox"  style={{textAlign:'center'}}>Project</span>
          <input type="text" 
                  className ="form-control"  
                  name = "Project"
                  id="edproject"
                  value = {this.state.Project}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
          </div>

          <div class="input-group input-group-sm mb-3">
          <span  
                style={{textAlign: 'center'}}
                id="assigneesbox" >Assignees</span>
          <input type="text" 
                  className ="form-control"  
                  name = "Assignees"
                  id="edassignees"
                  value = {this.state.Assignees}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
          </div>

          <div class="input-group input-group-sm mb-3">
          <span 
                style={{textAlign: 'center'}}
                id="pstartdatebox" >Starting Date</span>
          <input type="text" 
                  className ="form-control"  
                  name = "PStartDate"
                  id="edpstartdate"
                  value = {this.state.PStartDate && this.state.PStartDate.slice(0,10)}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
          </div>

          <div class="input-group input-group-sm mb-3">
          <span 
                id="penddatebox" style={{textAlign: 'center'}}>Ending Date</span>
          <input type="text" 
                  className ="form-control"  
                  name = "PEndDate"
                  id="edpenddate"
                  value = {this.state.PEndDate && this.state.PEndDate.slice(0,10)}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
          </div>

          <div class="input-group input-group-sm mb-3">
          <span 
                id="progressbox" style={{textAlign: 'center'}}>Progress</span>
          <input type="text" 
                  className ="form-control"  
                  name = "Progress"
                  id="edprogress"
                  value = {this.state.Progress}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
          </div>


          <div class="input-group input-group-sm mb-3">
          <span 
                id="projectownerbox" style={{textAlign: 'center'}}>Project Owner</span>
          <input type="text" 
                  className ="form-control"  
                  name = "ProjectOwner"
                  id="edprojectowner"
                  value = {this.state.ProjectOwner}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
          </div>
          </table>
          </div>
         
          <div className = "col-md-8 mt-4 mx-auto">
          <div class="edbudcard" style={{width:"800px"}}>
          <table class="table" style={{width:"700px"}}>
            <thead class="thead-dark">
              <tr>
                <th scope="col" style={{textAlign:"center"}}>Budget Details</th>
              </tr>
          </thead>

          <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" 
                id="budgetbox">Budget</span>
          <input type="number" 
                  className ="form-control"  
                  name = "Budget"
                  id="edbudget"
                  value = {this.state.Budget}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
                  <span class="input-group-text" id="currency1">RS(LKR)</span>
          </div>

          <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" 
                            id="budgetbox">Spent On</span>
          <select value={this.state.SpentOn}
                  className ="form-control"  
                  name = "SpentOn"
                  id="edspenton"
                  style={{width :"100px"}}
                  onChange = {this.handleInputChange}>
            <option value="">Select</option>
            <option value="Equipments">Equipments</option>
            <option value="Transportation">Transportation</option>
            <option value="Building">Building</option>
            </select>
          </div>

          <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" 
                id="amountbox">Amount</span>
          <input type="number" 
                  className ="form-control"  
                  name = "Amount"
                  id="edamount"
                  style={{width :"100px"}}
                  value = {this.state.Amount}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
                   <span class="input-group-text" id="currency2">RS(LKR)</span>
          </div>

          <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" 
                id="remainingbox">Remaining</span>
          <input type="number" 
                  className ="form-control"  
                  name = "Remaining"
                  id="edremaining"
                  style={{width :"100px"}}
                  value = {this.state.Remaining}
                  onChange = {this.handleInputChange}
                  aria-describedby="inputGroup-sizing-sm"/>
                   <span class="input-group-text" id="currency3">RS(LKR)</span>
                  {console.log(this.state.Remaining)}
                  </div>    
            </table>
          </div>
          </div>
          

            <button className = "btn projupdatebtn" type = "submit"  value="Submit" onClick = {this.onSubmit} style = {{marginTop:'10px' , marginLeft: '570px', width: '200px'}}>
              &nbsp; Update
            </button>
            &nbsp;
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