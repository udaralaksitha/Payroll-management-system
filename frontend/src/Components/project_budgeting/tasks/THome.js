import React, { Component } from 'react'
import axios from 'axios';
import '../pb.css'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import Swal from 'sweetalert2';



export default class THome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Tasks: [],
      rows: []
    };
  }

  createData = (TaskID, TaskName, ProjectId, Project, TStartDate, TEndDate, TStartTime, TEndTime, Description) => {
    return { TaskID, TaskName, ProjectId, Project, TStartDate, TEndDate, TStartTime, TEndTime, Description };
  }


  // makeExcelData = (data) => {
  //   console.log("data ", data)
  //   const array = []
  //   data.map((row) => {
  //       array.push(this.createData(row.ProjectId, row.Project, row.Assignees, row.PStartDate, row.PEndDate, row.Progress, row.ProjectOwner))
  //   }
  //   )
  //   console.log("array ", array)
  //   this.setState({rows: array})
  // }


  componentDidMount() {
    this.retrieveTask();
  }

  retrieveTask() {
    axios.get("http://localhost:8400/Tasks").then(res => {
      if (res.data.success) {
        this.setState({
          Tasks: res.data.existingTaskDetails
        });
        console.log(this.state.Tasks);
        this.makeExcelData(res.data.existingTaskDetails)
      }
    });
  }

  conf = () => {

    let confirms = true;
    if (window.confirm("Are you sure you want to delete this task? ") == true) {
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

  onDelete = (id) => { //implement a delete method to delete existing
    axios.delete(`http://localhost:8400/task/delete/${id}`).then((res) => {
      alert("Deleted successfully");
      this.retrieveTask();
    })
  }
  filterData(Tasks, searchKey) {//implement search method

    const result = Tasks.filter((Tasks) =>
      Tasks.TaskID.toLowerCase().includes(searchKey) ||
      Tasks.TaskName.toLowerCase().includes(searchKey) ||
      Tasks.Description.toLowerCase().includes(searchKey)||
      Tasks.Project.toLowerCase().includes(searchKey)
    )
    this.setState({Tasks: result})
  }

  handleSearchArea = (e) => {//method to capture search inputs
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8400/Tasks").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingTaskDetails, searchKey)
      }
    });

  }

  render() {
    return (
      <div>
        <div className="pbviewtask" >
        <Link to="/phome">
          <button type="button" className="btn btn-info" id="pbsidebtn"></button></Link>

        <div>
          <Link to="/phome">
          <button type="button" className="btn btn-light" id="barphomebtn" ></button></Link> 
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
          id = "tasksearch"
          type = "search"
          placeholder = "Search"
          name = "searchQuery"
          onChange = {this.handleSearchArea}> 
        </input> 
        <i class="fas fa-search"></i>
        </div> 

          
          {/* <div style={{position:'absolute',marginLeft:'500px'}}>  */}
          {/* <button type="button" className="btn btn-primary">
        {this.state.rows && <CSVLink data={this.state.rows} style={{textDecoration:'none',color:'white' }}>Download Report</CSVLink>}
      </button> */}
          {/* </div> */}
          &nbsp;
          <table className="table table-bordered table-light table table-hover" id="thometable" style={{ width: "-100px" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task ID</th>
                <th scope="col">Task Name</th>
                <th scope="col">Project ID</th>
                <th scope="col">Project</th>
                <th scope="col">Starting Date</th>
                <th scope="col">Ending Date</th>
                <th scope="col">Starting Time</th>
                <th scope="col">Ending Time</th>
                <th scope="col">Description</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {this.state.Tasks.map((Tasks, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <a href={`/getspectask/${Tasks._id}`} style={{ textDecoration: 'none' }}>
                      {Tasks.TaskID}
                    </a>
                  </td>
                  <td>{Tasks.TaskName}</td>
                  <td>{Tasks.ProjectId}</td>
                  <td>{Tasks.Project}</td>
                  <td>{Tasks.TStartDate && Tasks.TStartDate.slice(0, 10)}</td>
                  <td>{Tasks.TEndDate && Tasks.TEndDate.slice(0, 10)}</td>
                  <td>{Tasks.TStartTime}</td>
                  <td>{Tasks.TEndTime}</td>
                  <td>{Tasks.Description}</td>
                  <td>
                    <div>
                      <a href={`/task/updates/${Tasks._id}`}>
                        <InlineIcon style={{ color: '#FBBC04' }} icon="bx:edit-alt" id="thomeedit" />
                      </a>
                    </div>

                    <div>
                      <a href="#" onClick={() => this.onDelete(Tasks._id)}>
                        <InlineIcon style={{ color: '#F31414' }} icon="fluent:delete-28-regular" id="thomedlt" />
                        {/* <i className = "fas fa-trash-alt"></i>&nbsp;Delete */}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ paddingBottom: '10%' }}></div>
        </div>
      </div>
    )

  }

}