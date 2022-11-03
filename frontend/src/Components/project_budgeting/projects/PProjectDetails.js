import React, { Component } from 'react';
import axios from 'axios';//make request for the user with a given id

export default class PProjectDetails extends Component {
    constructor(props){
        super(props);

        this.state={//initializing local state by assigning object
            Projects:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:8400/getspecproj/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    Projects:res.data.Projects
                });

                console.log(this.state.Projects);
            }
        })

    }

  render() {

//required method in the class component
    const {ProjectId,Project,Assignees,PStartDate,PEndDate,Progress,ProjectOwner,Budget,SpentOn,Amount,Remaining} = this.state.Projects;

    return (
        <div>
        <button type="button" className="btn btn-info" id="pbsidebtn"></button>

      <div style={{marginTop: '20px', position:'fixed', left:'7%', right:'3%', top:'10%'}}>
          <h4>{ProjectId}</h4>
          <hr/>

        <d1 className="row">
        <dt className = "col-sm-3">Project</dt>
        <dd className = "col-sm-9">{Project}</dd>

        <dt className = "col-sm-3">Assignee(s)</dt>
        <dd className = "col-sm-9">{Assignees}</dd>

        <dt className = "col-sm-3">Starting Date</dt>
        <dd className = "col-sm-9">{PStartDate}</dd>

        <dt className = "col-sm-3">Ending Date</dt>
        <dd className = "col-sm-9">{PEndDate}</dd>

        <dt className = "col-sm-3">Progress</dt>
        <dd className = "col-sm-9">{Progress}</dd>

        <dt className = "col-sm-3">ProjectOwner</dt>
        <dd className = "col-sm-9">{ProjectOwner}</dd>

        <dt className = "col-sm-3">Budget</dt>
        <dd className = "col-sm-9">{Budget}</dd>

        <dt className = "col-sm-3">Spent On</dt>
        <dd className = "col-sm-9">{SpentOn}</dd>

        <dt className = "col-sm-3">Amount</dt>
        <dd className = "col-sm-9">{Amount}</dd>

        <dt className = "col-sm-3">Remaining</dt>
        <dd className = "col-sm-9">{Remaining}</dd>
          </d1>    
      </div> 
      </div>
    );
  
  }
  
}