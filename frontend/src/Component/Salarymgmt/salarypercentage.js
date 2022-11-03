import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import Template3 from './images/Template3.png';
import Sidebar from "../Salarymgmt/Sidebar";


export default class salarypercentage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empsalaryper: [],
      test: [],
      rows: [],
    
      
    };
  }

  

  createData = (Typeper,Percentageper,perhour) => {
    return { Typeper,Percentageper,perhour };
  };

  

  componentDidMount() {
    this.setState({ test: JSON.parse(localStorage.getItem("data")) });
    this.retrieveEmpsalaryper();
  }

  retrieveEmpsalaryper() {
    axios.get("http://localhost:8400/empsalaryper").then((res) => {
      if (res.data.success) {
        this.setState({
          empsalaryper: res.data.existingEmpsalaryper 
        });
        console.log(this.state.empsalaryper);
      
      }
    });
  }

 

  filterData(empsalaryper, searchKey) {
    const result = empsalaryper.filter((empsalaryper) =>
      empsalaryper.Typeper.toLowerCase().includes(searchKey)
    );

    this.setState({ empsalaryper: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:8400/empsalaryper").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingEmpsalaryper, searchKey);
      }
    });
  };

  render() {
   
    return (
      <Sidebar>
      <div>
        <div id ="Template3.png" 
        style={{ 
            backgroundImage: `url(${Template3})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: "100vh",            
            }}>

        <div
        style={{
            overflow: 'auto',
            height: '90%'
            }}>
            <br></br>
            <br></br>
            <br></br>
            <b style={{ marginLeft: "620px" }}>ALL SALARY PERCENTAGES</b>
            <br></br>

            <div
              className="row"
              style={{ marginTop: "14px", marginRight: "100px" }}
            >
              <div className="col-lg-9 mt-2 mb-2"></div>
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search Salary Percentage "
                  placeholder="Search Salary Percentage"
                  name="searchQuery"
                  onChange={this.handleSearchArea}
                ></input>
              </div>
            </div>
                                  
           
            <br></br>
            

            <table className="table" style={{ width: "70%", margin: "0 auto" }}>
              <thead>
                <tr>
                  <th scope="col">No</th>                 
                  <th scope="col">Type</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Perhour</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {this.state.empsalaryper.map((empsalaryper, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                   
                    <td> {empsalaryper.Typeper}</td>
                    <td>{empsalaryper.Percentageper}</td>
                    <td>{empsalaryper.perhour}</td>
                   
              
                   

                    <td>
                      <a
                       class="btn btn-light"
                        href={`/percentageedit/${empsalaryper._id}`}
                        style={{ width: "6rem" }}
                      >
                        <i className="fas fa-edit"></i>&nbsp;EDIT
                      </a>
                  
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br></br>
           

            
            <Link to="/AdmindashDe">
          <button
           
                                       
           className="btn btn-outline-secondary" style={{ marginLeft:"1070px",borderRadius:"13px",fontFamily: "font-italic",fontWeight:"bold",marginTop:"100px"}}
       >


        <div style={{fontWeight:"00",color:'black'}}>    Done &nbsp;
        <i className = "fa-solid fa-square-check"></i> 
        
            </div>
            
       </button>
        </Link>
          </div>
        </div>
      </div>
      </Sidebar>
    );
  }
}

