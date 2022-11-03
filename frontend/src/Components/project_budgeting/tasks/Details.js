import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Tasks: []
    };
  }

  componentDidMount() {

    console.log(this.props);
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8400/getspectask/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          Tasks: res.data.Tasks
        });

        console.log(this.state.Tasks);
      }
    })

  }

  render() {

    const { TaskID, TaskName, ProjectId, Project, TStartDate, TEndDate, TStartTime, TEndTime, Description } = this.state.Tasks;

    return (
      <div>
        <div className="pbviewtask">
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

          <div style={{ position: 'absolute' }}>
            <Link to="/createtask">
              <button className="btn btn-successTHAdd"><a style={{ textDecoration: 'none' }}></a></button> </Link>
          </div>

          <div style={{position:'absolute', left:'7%', right:'2.5%'}}>
      <div className = "row" style = {{marginTop:'25px', marginLeft:'110px'}}>

              <div>
                <a href={"/cal"} className="btn btn-secondary" id="pbsidebtn" style={{marginLeft:'900px',marginTop:"330px"}}>Back to Calendar</a>

                <div className="col-md-8 mt-4 mx-auto">
                  <h1 className="h3 mb-2 font-weight-normal">Task Details</h1>

                  <h4>{TaskID}</h4>
                  <hr />

                  <d1 className="row">
                    <dt className="col-sm-3">Task Name</dt>
                    <dd className="col-sm-9">{TaskName}</dd>

                    <dt className="col-sm-3">Project ID</dt>
                    <dd className="col-sm-9">{ProjectId}</dd>

                    <dt className="col-sm-3">Project</dt>
                    <dd className="col-sm-9">{Project}</dd>

                    <dt className="col-sm-3">Starting Date(s)</dt>
                    <dd className="col-sm-9">{TStartDate}</dd>

                    <dt className="col-sm-3">Ending Date</dt>
                    <dd className="col-sm-9">{TEndDate}</dd>

                    <dt className="col-sm-3">Starting Time</dt>
                    <dd className="col-sm-9">{TStartTime}</dd>

                    <dt className="col-sm-3">Ending Time</dt>
                    <dd className="col-sm-9">{TEndTime}</dd>

                    <dt className="col-sm-3">Description</dt>
                    <dd className="col-sm-9">{Description}</dd>
                  </d1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}