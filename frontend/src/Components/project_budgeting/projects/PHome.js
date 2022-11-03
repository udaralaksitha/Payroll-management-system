import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../pb.css'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import Swal from 'sweetalert2';


const PHome = () => {

  const [Projects, setProjects] = useState([]);


// const createData = (ProjectId, Project, Assignees, PStartDate, PEndDate, Progress, ProjectOwner, Budget, SpentOn, Amount, Remaining) => {
//   return { ProjectId, Project, Assignees, PStartDate, PEndDate, Progress, ProjectOwner, Budget, SpentOn, Amount, Remaining};
// }


// const makeExcelData = (data) => {
//   console.log("data ", data)
//   const array = []
//   data.map((row) => {
//       array.push(this.createData(row.ProjectId, row.Project, row.Assignees, row.PStartDate, row.PEndDate, row.Progress, row.ProjectOwner))
//   }
//   )
//   console.log("array ", array)
//   setState({rows: array})
// }





const retrieveProj = () => {

  axios
    .get("http://localhost:8400/Projects")
    .then((response) => {
      setProjects(response.data.existingProjDetails);

      console.log(Projects);
      // makeExcelData(res.data.existingProjDetails)

    });
};

useEffect(() => {
  retrieveProj();
  
});


const conf = () => {

  let confirms = true;
  if (window.confirm("Are you sure you want to delete this project and budget record? ") == true) {
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


const onDelete = (id) =>{ //implement a delete method to delete existing
  conf ();
  axios.delete(`http://localhost:8400/proj/delete/${id}`).then((res) =>{
    alert("Deleted successfully");
    retrieveProj();
  })
}
const filterData = (Projects,searchKey) =>{//implement search method

  const result = Projects.filter((Projects) =>
  Projects.ProjectId.toLowerCase().includes(searchKey) ||
  Projects.Project.toLowerCase().includes(searchKey) ||
  Projects.Assignees.toLowerCase().includes(searchKey) ||
  Projects.ProjectOwner.toLowerCase().includes(searchKey)
  )
this.setState({Projects:result})
}

const handleSearchArea = (e) =>{//method to capture search inputs
  const searchKey = e.currentTarget.value;

  axios.get("http://localhost:8400/Projects").then(res =>{
    if (res.data.success){
      filterData(res.data.existingProjDetails,searchKey)
    }
  });

}


    return (
        <div>
        
          <div className="pbviewproject" >
          <Link to="/phome">
            <button type="button" className="btn btn-info" id="pbsidebtn"></button></Link>

          <div>
          <Link to="/thome">
          <button type="button" className="btn btn-light" id="bartaskbtn" ></button></Link> 
          </div>

          <div>
          <Link to="/cal">
          <button type="button" className="btn btn-light" id="barcalbtn" ></button></Link> 
          </div>

          <div>
          <Link to="/report">
          <button type="button" className="btn btn-light" id="barreportbtn" ></button></Link> 
          </div>

      {/* <div className = "row" style = {{marginTop:'14px'}}> */}
        <div className="input-group rounded">
        <input
          id = "projectsearch"
          type = "search"
          placeholder = "Search"
          name = "searchQuery"
          onChange = {handleSearchArea}> 
        </input> 
        <i class="fas fa-search"></i>
        </div> 

      <div style={{position:'absolute'}}>
      <Link to="/createproject">
      <button className="btn btn-successPHAdd"><a style={{textDecoration:'none'}}></a></button> </Link> 
    </div>

      &nbsp;
      <table className = "table table-bordered table-light table table-hover" id = "phometable" style={{width:"-100px"}}>
          <thead>
            <tr>
              <th scope = "col">#</th>
              <th scope = "col">ProjectId</th>
              <th scope = "col">Project</th>
              <th scope = "col">Assignee(s)</th>
              <th scope = "col">Starting Date</th>
              <th scope = "col">Ending Date</th>
              <th scope = "col">Progress</th>
              <th scope = "col">Project Owner</th>
              <th scope = "col">Budget</th>
              <th scope = "col">Spent On</th>
              <th scope = "col">Amount</th>
              <th scope = "col">Remaining</th>
              <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>

                {Projects.map((Projects,index) =>(
                  <tr key = {index}>
                    <th scope = "row">{index+1}</th>

                    <td>
                        <a href = {`/Projects/${Projects._id}`} style = {{textDecoration:'none'}}>
                        {Projects.ProjectId}
                        </a>
                    </td>
                    <td>{Projects.Project}</td>
                    <td>{Projects.Assignees}</td>
                    <td>{Projects.PStartDate && Projects.PStartDate.slice(0,10)}</td>
                    <td>{Projects.PEndDate && Projects.PEndDate.slice(0,10)}</td>
                    <td>{Projects.Progress}</td>
                    <td>{Projects.ProjectOwner}</td>
                    <td>{Projects.Budget}</td>
                    <td>{Projects.SpentOn}</td>
                    <td>{Projects.Amount}</td>
                    <td>{Projects.Remaining}</td>
                    
                    <td>
                    <div>
                      <a href = {`/proj/updates/${Projects._id}`}>
                      <InlineIcon style = {{color :'#FBBC04'}} icon="bx:edit-alt" id="phomeedit" />
                        </a>
                        </div>

                        <div>
                        <a href = "#" onClick = {() =>onDelete(Projects._id)}>
                      <InlineIcon style = {{color :'#F31414'}} icon= "fluent:delete-28-regular" id="phomedlt"/>
                        {/* <i className = "fas fa-trash-alt"></i>&nbsp;Delete */}
                        </a>
                        </div>
                    </td>
                    <td> <Link 
                        to={{ pathname: "/createtask", state: {id: Projects.ProjectId,name:Projects.Project } }}

                    ><button>Add Task</button></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
         
                <div style={{paddingBottom: '10%'}}></div>
          </div>     
          </div> 
    )
   
  }
  

export default PHome;