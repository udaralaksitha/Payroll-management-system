import React, { useState,useEffect } from "react";
import axios from 'axios'
import '../pb.css';
import Swal from 'sweetalert2';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";




  const CreateTasks = () => {

    const [Projects, setProjects] = useState([]);
    const location = useLocation();
    const ID = location.state.id;
    const Name = location.state.name;

        const projectDataShow = () => {
          axios
          .get("http://localhost:8400/Projects")
          .then((response) => {
            console.log(response.data.existingProjDetails)
            setProjects(response.data.existingProjDetails);
            // makeExcelData(res.data.existingProjDetails)
      
          });
        };
      
        useEffect(() => {
          projectDataShow();
        });
   

  

    const [inputs, setInputs] = useState({
      TaskID: "",
      TaskName: "",
      ProjectId: "",
      Project: "",
      TStartDate: "",
      TEndDate: "",
      TStartTime: "",
      TEndTime: "",
      Description: ""
 
    });      
  //understanding value changes
  const handleInputChange = (e) => {//handle input change invoking
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
 

//  const validate = () => {
//     let isError = false;


//     if (this.state.TStartDate > this.state.TEndDate) {
//       isError = true;
//     }
//     if (!this.state.TaskID) {
//       isError = true;
//     }
//     if (!this.state.TaskName) {
//       isError = true;
//     }
//     if (!this.state.ProjectId) {
//       isError = true;
//     }
//     if (!this.state.Project) {
//       isError = true;
//     }
//     if (!this.state.TStartDate){
//       isError = true;
//     }
//     if (!this.state.TEndDate){
//       isError = true;
//     }

//     this.setState({
//       ...this.state,
//     });
//     return isError;
//   };

  const onSubmit = (e) => {
    e.preventDefault();

    
      if (inputs.TStartDate > inputs.TEndDate) {
        Swal.fire({
          text: 'Start date must be before end date'
      })
      } else if (inputs.inputsTaskID === "") {
        Swal.fire({
          text: 'Task ID must not be empty'
      })
      }
      else if (inputs.TaskName === "") {
        Swal.fire({
          text: 'Rask name cannot be empty'
      })
      }
      // else if (inputs.ProjectId === "") {
      //   Swal.fire({
      //     text: 'Leave type should not be empty'
      // })
      // }
      // else if (inputs.Project === "") {
      //   Swal.fire({
      //     text: 'Leave type should not be empty'
      // })
      // }
      else if (inputs.TStartDate === ""){
        Swal.fire({
          text: 'Start date cannot be empty'
      })
      }
      else if (inputs.TEndDate === ""){
        Swal.fire({
          text: 'End date cannot be empty'
      })
      }

      else {

      axios
      .post("http://localhost:8400/task/save", inputs)
      .then((res) => {
        alert("Added Successfully!!!");
        setInputs("");
        setTimeout(() => {  console.log("Success"); }, 5000);
        window.location.reload();
      })
      
  }
};


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
            <div className="row" style={{ marginTop: '-60px', marginLeft: '120px' }}>

              <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-2 font-weight-normal">Add Tasks</h1>


                <form>
                  <div class="addtaskcard1">
                    &nbsp;
                    <div class="addtaskcard2" style={{ width: "800px", marginTop: "30px" }}>

                      <table class="table" style={{ width: "700px" }} >
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
                              value={inputs.TaskID || ""}
                              onChange={handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Task Name</label>
                            <input type="text"
                              className="form-control"
                              name="TaskName"
                              id="taskname"
                              value={inputs.TaskName || ""}
                              onChange={handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Project ID</label>
                            <input type="text"
                              className="form-control"
                              name="ProjectId"
                              id="projectid"
                              value={ ID }
                             disabled
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Project Name</label>
                            <input type="text"
                              className="form-control"
                              name="Project"
                              id="project"
                              value={ Name }
                              disabled
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Starting Date</label>
                            <input type="date"
                              className="form-control"
                              name="TStartDate"
                              id="tstartdate"
                              value={inputs.TStartDate || ""}
                              onChange={handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Ending Date</label>
                            <input type="date"
                              className="form-control"
                              name="TEndDate"
                              id="tenddate"
                              value={inputs.TEndDate || ""}
                              onChange={handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Starting Time</label>
                            <input type="time"
                              className="form-control"
                              name="TStartTime"
                              id="tstarttime"
                              value={inputs.TStartTime || ""}
                              onChange={handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>


                          <div className="form-group">
                            <label>Ending Time</label>
                            <input type="time"
                              className="form-control"
                              name="TEndTime"
                              id="tendtime"
                              value={inputs.TEndTime || ""}
                              onChange={handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <input type="text"
                              className="form-control"
                              name="Description"
                              id="description"
                              value={inputs.Description || ""}
                              onChange={handleInputChange}
                              aria-describedby="inputGroup-sizing-sm" />
                          </div>
                          &nbsp;
                        </div>
                      </table>
                      &nbsp;
                    </div>
                  </div>


                  <button className="btn btn-successAddTask" type="submit" value="Submit" onClick={onSubmit} style={{ marginTop: '10px', marginLeft: '570px', width: '200px' }}>
                    &nbsp; Add Task
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  


export default CreateTasks;
