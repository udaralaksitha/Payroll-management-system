import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import {BrowserRouter as Router, Link} from 'react-router-dom';



export default class EditTasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TaskID: "",
      TaskName: "",
      ProjectId: "",
      Project: "",
      TStartDate: "",
      TEndDate: "",
      TStartTime: "",
      TEndTime: "",
      Description: ""
    }
  }
  //understanding value changes
  handleInputChange = (e) => {//handle input change invoking
    const { name, value } = e.target;
    console.log(name)

    this.setState({//state up
      [name]: value
    })
  }

  validate = () => {
    let isError = false;


    if (this.state.TStartDate > this.state.TEndDate) {
      isError = true;
    }
    if (!this.state.TaskID) {
      isError = true;
    }
    if (!this.state.TaskName) {
      isError = true;
    }
    if (!this.state.ProjectId) {
      isError = true;
    }
    if (!this.state.Project) {
      isError = true;
    }
    if (!this.state.TStartDate) {
      isError = true;
    }
    if (!this.state.TEndDate) {
      isError = true;
    }

    this.setState({
      ...this.state,
    });
    return isError;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();//does not accept any parameter, will access the exact location
    const tid = this.props.match.params.id;

    //destructor
    const {  TaskID, TaskName, ProjectId, Project, TStartDate, TEndDate, TStartTime, TEndTime, Description} = this.state;

    //set variables
    const tdata = {
      TaskID: TaskID,
      TaskName: TaskName,
      ProjectId: ProjectId,
      Project: Project,
      TStartDate: TStartDate,
      TEndDate: TEndDate,
      TStartTime: TStartTime,
      TEndTime: TEndTime,
      Description: Description,
    }

    console.log(tdata) //implement a put method to update existing
    if (!err) {

      axios.put(`http://localhost:8400/task/updates/${tid}`, tdata).then((res) => {
        if (res.data.success) {
          this.setState(
            {
              TaskID: "",
              TaskName: "",
              ProjectId: "",
              Project:"",
              TStartDate: "",
              TEndDate: "",
              TStartTime: "",
              TEndTime: "",
              Description: "",
            }
          )
        }
      });
      Swal.fire({
        text: 'Task has been edited'
      })
    } else {
      Swal.fire({
        text: 'Please ensure that all fields are filled, "Starting date" is before the "End Date" OR "starting time" is before the "End time"'
      })
    }
  }


  componentDidMount() { //implement a method to retrieve specific post details
    const tid = this.props.match.params.id;
    axios.get(`http://localhost:8400/getspectask/${tid}`).then((res) => {
      if (res.data.success) {
        this.setState({
          TaskID: res.data.Tasks.TaskID,
          TaskName: res.data.Tasks.TaskName,
          ProjectId: res.data.Tasks.ProjectId,
          Project: res.data.Tasks.Project,
          TStartDate: res.data.Tasks.TStartDate,
          TEndDate: res.data.Tasks.TEndDate,
          TStartTime: res.data.Tasks.TStartTime,
          TEndTime: res.data.Tasks.TEndTime,
          Description: res.data.Tasks.Description

        });

        console.log(this.state.Tasks);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="pbaddtask" >
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

          <div style={{ position: 'absolute', left: '6.5%', right: '2.5%' }}>
            <div className="row" style={{ marginTop: '-70px' , marginLeft: '100px'}}>

              <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-2 font-weight-normal">Edit Tasks</h1>

                <form>
                  <div class="addtaskcard1">
                    &nbsp;
                    <div class="addtaskcard2" style={{ width: "800px", marginTop: "30px" }}>

                      <table class="table" style={{ width: "700px" }}>
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col" style={{ textAlign: "center" }}>Task Details</th>
                          </tr>
                        </thead>



                        <div class="input-group input-group-sm mb-3">
                          <div className="form-group">
                            <label>Task ID</label>
                            <input type="text"
                              className="form-control"
                              name="TaskID"
                              id="taskid"
                              value={this.state.TaskID}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Task Name</label>
                            <input type="text"
                              className="form-control"
                              name="TaskName"
                              id="taskname"
                              value={this.state.TaskName}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Project ID</label>
                            <input type="text"
                              className="form-control"
                              name="ProjectId"
                              id="projectid"
                              value={this.state.ProjectId}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Project</label>
                            <input type="text"
                              className="form-control"
                              name="Project"
                              id="project"
                              value={this.state.Project}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Starting Date</label>
                            <input type="date"
                              className="form-control"
                              name="TStartDate"
                              id="tstartdate"
                              value={this.state.TStartDate}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Ending Date</label>
                            <input type="date"
                              className="form-control"
                              name="TEndDate"
                              id="tenddate"
                              value={this.state.TEndDate}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Starting Time</label>
                            <input type="time"
                              className="form-control"
                              name="TStartTime"
                              id="tstarttime"
                              value={this.state.TStartTime}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>


                          <div className="form-group">
                            <label>Ending Time</label>
                            <input type="time"
                              className="form-control"
                              name="TEndTime"
                              id="tendtime"
                              value={this.state.TEndTime}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <input type="text"
                              className="form-control"
                              name="Description"
                              id="description"
                              value={this.state.Description}
                              onChange={this.handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>
                          &nbsp;
                        </div>
                      </table>
                      &nbsp;
                    </div>
                  </div>



                  <button className="btn taskupdatebtn" type="submit" value="Submit" onClick={this.onSubmit} style={{ marginTop: '10px', marginLeft: '570px', width: '200px' }}>
                    &nbsp; Update
                  </button>
                  &nbsp;
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}