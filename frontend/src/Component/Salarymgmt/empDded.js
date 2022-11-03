
import { BrowserRouter as Router, Link } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { CSVLink, CSVDownload } from 'react-csv';
import Template1 from './images/Template1.png';
import Sidebar from "../Salarymgmt/Sidebar";


export default class empDded extends Component {


  constructor(props) {
    super(props);

    this.state = {
      empsalary: [],
      test: [],
      rows: [],
      TotalDe: [],
      empID: "",
      currentDate: "",
      empName: "",

    };
  }

  //understanding value changes
  handleInputChange = (e) => {
    //handle input change invoking
    const { name, value } = e.target;
    console.log(name);

    if (name === "TotalDe") {
      let calculation = this.state.Deduction++;
      console.log(calculation);

      this.setState({
        Remaining: calculation,
      });
    }

    this.setState({
      //state up
      [name]: value,
    });
  };




  createData = (Type, Date, Percentage, Monthly, Deduction) => {
    return { Type, Date, Percentage, Monthly, Deduction };
  }

  makeExcelData = (data) => {
    console.log("data ", data)
    const array = []
    data.map((row) => {
      array.push(this.createData(row.Type, row.Date, row.Percentage, row.Monthly, row.Deduction))
      // setRows(oldRows => [...oldRows, createData(row.firstName, row.lastName, row.email, row.contactNumber, row.dateOfBirth, row.address, row.raffleDrawNumber)])
    }
    )
    console.log("array ", array)
    this.setState({ rows: array })
  }


  componentDidMount() {
    this.setState({ test: JSON.parse(localStorage.getItem('data')) })
    this.retrieveEmpsalary();
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    axios.get("http://localhost:8400/employee/get/details/"+localStorage.getItem("logID")).then(res => {
      if (res.data.success) {
        console.log(res.data.existingEmployee[0].empName)
        this.setState({ empID: localStorage.getItem("logID"), currentDate: date,empName:res.data.existingEmployee[0].empName})
      }
    })
  }

  retrieveEmpsalary() {
    var today = new Date(),
    data = JSON.stringify({ year: today.getFullYear() , month: (today.getMonth() + 1) });
    console.log(data)
    axios.post("http://localhost:8400/empsalary/"+localStorage.getItem("logID"),data,{
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
      if (res.data.success) {
        this.setState({
          empsalary: res.data.empsalary
        });
        console.log(this.state.empsalary)
        this.makeExcelData(res.data.empsalary)
      }
    });
  }



  filterData(empsalary, searchKey) {

    const result = empsalary.filter((empsalary) =>
      empsalary.Type.toLowerCase().includes(searchKey)

    )

    this.setState({ empsalary: result })
  }


  handleSearchArea = (e) => {

    const searchKey = e.currentTarget.value;
    var today = new Date(),
    data = JSON.stringify({ year: today.getFullYear() , month: (today.getMonth() + 1) });
    console.log(data)
    axios.post("http://localhost:8400/empsalary/"+localStorage.getItem("logID"),data,{
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
      if (res.data.success) {

        this.filterData(res.data.empsalary, searchKey)



      }
    });



  }





  render() {
    let totDeduction = 0;
    return (
      <Sidebar>
      <div id="Template1.png"
        style={{
          backgroundImage: `url(${Template1})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: "100vh",
        }}>

        <div
          style={{
            overflow: 'auto',
            height: '90%'
          }}>

          <div>
            <br></br>
            <br></br>
            <br></br>

            <b style={{ marginLeft: "620px" }}>DEDUCTION SUMMARY</b>
            <br></br>

            <div className="row" style={{ marginTop: '14px', marginRight: "100px" }}>
              <div className="col-lg-9 mt-2 mb-2">


              </div>
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search Salary Type "
                  placeholder="Search Salary Type"
                  name="searchQuery"
                  onChange={this.handleSearchArea}>

                </input>

              </div>
            </div>


            <div
              className="form-group"
              style={{
                marginLeft: "230px",
                marginBottom: '15px',
                width: "250px"
              }}>

              <input
                type="date"
                value={this.state.currentDate}
                className="form-control"
                name=""
                placeholder="Enter Date"
              />
            </div>



            <b style={{ marginLeft: "1020px", marginBottom: "-900px" }}>
              Employee ID
            </b>
            <input
              value={this.state.empID}
              type="text"
              className="form-control"
              style={{
                backgroundColor: "#76D7C4",
                marginLeft: "1120px",
                height: "2.6rem",
                marginTop: "-32px",
                borderRadius: "10px",
                width: "6rem",
                color: "black",
                fontWeight: "bold"
              }}
              placeholder="EM897" />



            <br></br>

            <div style={{ marginLeft: "240px" }}><b>Employee Name</b> </div>
            <input
              value={this.state.empName}
              type="text"
              className="form-control"
              style={{
                marginLeft: "380px",
                marginTop: "-30px",
                borderRadius: "5px",
                width: "20rem",
                backgroundColor: "#ececec",
                fontFamily: "monospace"
              }}
              placeholder="MR.kamal hasan" />
            <br></br>



            <table className="table" style={{ width: "70%", margin: "0 auto" }}>
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Monthly</th>
                  <th scope="col">Deduction</th>

                </tr>
              </thead>

              <tbody>
                {this.state.empsalary.map((empsalary, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{empsalary.Date.slice(0, 10)}</td>
                    <td>
                      <a href={`/getempDesalary/${empsalary._id}`} style={{ textDecoration: 'none' }}>

                        {empsalary.Type}
                      </a>

                    </td>

                    <td>{empsalary.Percentage}</td>
                    <td>{empsalary.Monthly}</td>
                    <td>{empsalary.Deduction}</td>
                    <script>
                      {(totDeduction = totDeduction + parseInt(empsalary.Deduction))}                    </script>



                  </tr>
                ))}

              </tbody>


            </table>

            <br></br>
            <div style={{ width: "800px", backgroundColor: "lightblue", marginLeft: "200px", height: "40px" }}>
              <b style={{ marginLeft: "200px" }}>
                {" "}
                Total Deduction For This Month in (RS): &nbsp;  &nbsp; {totDeduction}
                {console.log(this.state.TotalDe)}{" "}
              </b>


            </div>

            <div style={{ position: "absolute", left: '87.5%', marginTop: "-440px" }}>
              <button type="button" class="btn btn-warning">
                {this.state.rows && <CSVLink data={this.state.rows} style={{ textDecoration: 'none', color: 'white' }}>Download</CSVLink>}
              </button>


            </div>
          </div>
        </div>
      </div>
      </Sidebar>



    )

  }

}

