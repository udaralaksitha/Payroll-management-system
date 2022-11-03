import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Template2 from './images/Template2.png';
import axios from "axios";
import './AdmindashDe.css';
import Sidebar from "../Salarymgmt/Sidebar";

export default class empWelcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            empID: "",
            empName: "",
            selectEmpID: "",
            ALLOWANCE: "",
            PROJECTS: "",
            OT: "",
            BONUS: "",
            ALLOWANCERs: "",
            PROJECTSRs: "",
            OTRs: "",
            BONUSRs: "",
            netPay: "",
            month: "",
            year: "",
            OThour: "",
            currentDate: "",
            setTax: "",
            setEtF: "",
            setEpF: "",
            setSalaryTax: "",
            setSalaryEtF: "",
            setSalaryEpF: "",
            empList: [],
            setSalaryTaxRs: "",
            setSalaryEtFRs: "",
            setSalaryEpFRs: "",
            rows: [],

            mSalary: "",
            totAdditional: "",
            salaryCategories: [],
            empsalary: [],
            addiempsalary: [],
            TotalDe: [],
            TotalAd: [],
        };

    }

    handleChange = e => {
        console.log(e.target[e.target.selectedIndex].getAttribute('data-order'))
        this.setState({
            selectEmpID: e.target.value,
            empName: e.target[e.target.selectedIndex].getAttribute('data-order')
        });
        this.setData()
    }

    changeYear = e => {
        console.log(e.target.value)
        this.setState({
            year: e.target.value
        });
        this.setData()
    }

    changeMonth = e => {
        console.log(e.target.value)
        this.setState({
            month: e.target.value
        });
        this.setData()
    }

    setData = async () => {
        if (!await (this.state.month === "" && this.state.year === "")) {
            if (!(this.state.selectEmpID === "")) {
                await this.retrieveAddiEmpsalary();
                await this.retrieveEmpsalary(this.state.year, this.state.month, this.state.selectEmpID);

                axios.get("http://localhost:8300/department/show/" + this.state.selectEmpID).then(res => {
                    if (res.data.success) {
                        console.log(res.data.existingDepartment.basesalary)
                        this.setState({ mSalary: res.data.existingDepartment.basesalary })
                    }
                }).then(async () => {
                    var totAdditional = 0
                    var totDeduction = 0
                    this.state.addiempsalary.map((addiempsalary, index) => {
                        (totAdditional = totAdditional + parseInt(addiempsalary.Additional))
                        console.log(totAdditional)
                    })
                    console.log(this.state.addiempsalary)
                    await this.state.empsalary.map((empsalary, index) => (
                        totDeduction = totDeduction + (empsalary.Deduction * 1)
                    ))
                    console.log(this.state.mSalary)
                    console.log(totAdditional)
                    console.log(totDeduction)
                    console.log((this.state.mSalary * 1 + totAdditional * 1) - totDeduction * 1)
                    this.setState({
                        netPay: (this.state.mSalary * 1 + totAdditional * 1) - totDeduction * 1
                    })
                })

                console.log(this.state.selectEmpID)
                await axios.get("http://localhost:8400/empsalaryper").then(res => {
                    if (res.data.success) {
                        console.log(res.data.existingEmpsalaryper)
                        res.data.existingEmpsalaryper.map((res, index) => {
                            console.log(res.Typeper)
                            if (res.Typeper === "EPF") {
                                this.setState({
                                    setEpF: res.Percentageper,
                                    setSalaryEpF: this.state.netPay,
                                    setSalaryEpFRs: (this.state.netPay * (res.Percentageper)) / 100
                                });
                                console.log(this.state.setEpF)
                            }
                            if (res.Typeper === "TAX") {
                                this.setState({
                                    setTax: res.Percentageper,
                                    setSalaryTax: this.state.netPay,
                                    setSalaryTaxRs: (this.state.netPay * (res.Percentageper)) / 100
                                });
                                console.log(res.Percentageper)
                            }
                            if (res.Typeper === "ETF") {
                                this.setState({
                                    setEtF: res.Percentageper,
                                    setSalaryEtF: this.state.netPay,
                                    setSalaryEtFRs: (this.state.netPay * (res.Percentageper)) / 100
                                });
                                console.log(res.Percentageper)
                            }
                            if (res.Typeper === "ALLOWANCE") {
                                this.setState({
                                    ALLOWANCE: res.Percentageper,
                                    ALLOWANCERs: (this.state.netPay * (res.Percentageper)) / 100
                                });
                                console.log(res.Percentageper)
                            }
                            if (res.Typeper === "PROJECTS") {
                                this.setState({
                                    PROJECTS: res.Percentageper,
                                    PROJECTSRs: (this.state.netPay * (res.Percentageper)) / 100
                                });
                                console.log(res.Percentageper)
                            }
                            if (res.Typeper === "OT") {
                                this.setState({
                                    OThour: res.perhour,
                                    OT: res.Percentageper,
                                    OTRs: (this.state.netPay * (res.Percentageper)) / 100
                                });
                                console.log(res.Percentageper)
                            }
                            if (res.Typeper === "BONUS") {
                                this.setState({
                                    BONUS: res.Percentageper,
                                    BONUSRs: (this.state.netPay * (res.Percentageper)) / 100
                                });
                                console.log(res.Percentageper)
                            }
                        })
                    }
                })
            }
        }
    }

    retrieveAddiEmpsalary = async () => {
        await axios.get("http://localhost:8400/addiempsalary").then(res => {
            if (res.data.success) {
                this.setState({
                    addiempsalary: res.data.existingAddiEmpsalary
                });
                console.log(this.state.addiempsalary)
            }
        });
    }

    retrieveEmpsalary(year, month, id) {
        var data = JSON.stringify({ year: year, month: month });
        console.log(data)
        axios.post("http://localhost:8400/empsalary/" + id, data, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.data.success) {
                this.setState({
                    empsalary: res.data.empsalary
                });
                console.log(this.state.empsalary)
            }
        });
    }

    componentDidMount = async () => {

        await axios.get("http://localhost:8400/employee/show").then(res => {
            if (res.data.success) {
                console.log(res.data.existingEmployee)
                this.setState({ empList: res.data.existingEmployee, empID: localStorage.getItem("logID") })
            }
        })

        await this.setState({
            selectEmpID: localStorage.getItem("logID")
        })

        this.setData()

    }

    render() {
        return (
            <Sidebar>
            <div className="Adminbody">
                <div id="Template2.png"
                    style={{
                        backgroundImage: `url(${Template2})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        // height: "100vh",
                        position:"absolute"
                    }}>

                    <div
                        style={{
                            // overflow: 'auto',
                            // height: '90%'
                        }}>

                        <div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <b style={{
                                fontSize: "30px",
                                marginBottom: "205px",
                                marginLeft: "540px",
                                fontFamily: "bahnschrift semi bold"
                            }}>
                                WELCOME EMPLOYEE!</b>

                            <div className='contain-table'>

                                <b style={{
                                    marginLeft: "230px"
                                }}>ROLL</b>

                                <a className="btn btn-info btn-small custom"
                                    href="#"
                                    style={{
                                        width: "10rem",
                                        color: "white",
                                        fontFamily: "initial",
                                        marginLeft: "10px",
                                        marginBottom: "1px",
                                        borderRadius: "30px"
                                    }} >
                                    <i className="fa-solid fa-user-tie">
                                    </i>&nbsp;&nbsp;EMPLOYEE
                                </a>



                                

                                <br></br>
                                <br></br>
                                <br></br>

                                <b
                                    style={{
                                        marginLeft: "230px"
                                    }}>
                                    Employee Name
                                </b>
                                <select
                                    class="form-control"
                                    aria-label="Default select example"
                                    onChange={this.handleChange}
                                    disabled={true}
                                    value={this.state.selectEmpID}
                                    style={{
                                        marginLeft: "360px",
                                        marginTop: "-30px",
                                        borderRadius: "5px",
                                        width: "20rem",
                                        backgroundColor: "#ececec",
                                        fontFamily: "monospace"
                                    }}
                                >
                                    <option selected value="">Employee Name</option>
                                    {this.state.empList.map((emp, index) => (
                                        <option value={emp.empid}>{emp.empName}</option>
                                    ))}

                                </select>

                                <br></br>
                                <br></br>
                                <b
                                    style={{
                                        marginLeft: "630px",
                                        marginTop: "6px"
                                    }}>
                                    Employee ID </b>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.selectEmpID}
                                    style={{
                                        backgroundColor: "#76D7C4",
                                        marginLeft: "750px",
                                        height: "2.6rem",
                                        marginTop: "-32px",
                                        borderRadius: "10px",
                                        width: "6rem",
                                        color: "black",
                                        fontWeight: "bold"
                                    }}
                                    placeholder="EM897" />

                                <br></br>
                                <div class="row">
                                    <div
                                        className="form-group"
                                        style={{
                                            marginLeft: "40rem",
                                            marginBottom: '15px',
                                            width: "250px",

                                        }}>

                                        <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            onChange={this.changeYear}
                                            value={this.state.year}
                                        >
                                            <option selected value="">Select Year</option>
                                            <option>2017</option>
                                            <option>2018</option>
                                            <option>2019</option>
                                            <option>2020</option>
                                            <option>2021</option>
                                            <option>2022</option>

                                        </select>
                                    </div>
                                    <div
                                        className="form-group"
                                        style={{
                                            marginLeft: "40rem",
                                            marginBottom: '15px',
                                            width: "250px",

                                        }}>

                                        <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            onChange={this.changeMonth}
                                            value={this.state.month}
                                        >
                                            <option selected value="">Select Month</option>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>

                                        </select>
                                    </div>
                                </div>
                                <br></br>

                                {/* <table
                                    style={{
                                        border: "1px solid black ",
                                        width: "75%",
                                        marginLeft: "230px"
                                    }}>

                                    <tr
                                        style={{
                                            border: "1px solid black "
                                        }}>

                                        <td
                                            style={{
                                                border: "1px solid black ",
                                                height: "40%", width: "30%"
                                            }}>
                                            <center>

                                                <div
                                                    style={{
                                                        paddingBottom: '10%'
                                                    }}>

                                                </div>

                                                &nbsp;


                                                <a className="btn btn-info  btn-small custom"
                                                    href="#"
                                                    style={{
                                                        width: "12rem",
                                                        color: "darkblue",
                                                        fontFamily: "initial"
                                                    }} >
                                                    <i className="fa-solid fa-leaf">
                                                    </i>
                                                    &nbsp;
                                                    EPF
                                                </a>

                                            </center>
                                            <br></br>

                                            <tr
                                                style={{
                                                    border: "none "
                                                }}>
                                                <td
                                                    style={{
                                                        border: "none "
                                                    }} >

                                                    <b
                                                        style={{
                                                            marginLeft: "100px "
                                                        }}>
                                                        PAID  IN
                                                    </b>

                                                </td>

                                            </tr>

                                            <br></br>

                                            <center>
                                                <div className="form-group"
                                                    style={{
                                                        marginBottom: '15px',
                                                        width: "150px"
                                                    }}>

                                                    <input type="date"
                                                        className="form-control"
                                                        name=""
                                                        placeholder=""
                                                    />
                                                </div>
                                            </center>
                                        </td>



                                        <td
                                            style={{
                                                border: "1px solid black ",
                                                width: "40%"
                                            }}>
                                            <div>

                                                <tr
                                                    style={{
                                                        border: "none "
                                                    }}>

                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            As a Percentage
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.setEpF}
                                                                style={{

                                                                    width: "6rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />
                                                        </label>
                                                    </td>




                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            Monthly

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.netPay}
                                                                style={{
                                                                    width: "10rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />

                                                        </label>
                                                    </td>
                                                </tr>

                                                <tr
                                                    style={{
                                                        border: "none "
                                                    }}>

                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            RS
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.setSalaryEpFRs}
                                                                style={{

                                                                    width: "12rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />
                                                        </label>
                                                    </td>

                                                </tr>

                                            </div>

                                        </td>




                                        <td
                                            style={{
                                                border: "1px solid black ",
                                                width: "30%",
                                                textAlign: "center"
                                            }}>



                                            <div >
                                                <button className="btn btn-success" style={{ width: "7rem" }}>
                                                    <i className="fa-solid fa-address-card"></i>
                                                    <a href="/createnewsalary" style={{ textDecoration: 'none', color: 'white', paddingBottom: '10%' }}>&nbsp;ADD</a></button>
                                            </div>

                                            <div style={{ paddingBottom: '10%' }}></div>

                                            &nbsp;


                                            <a className="btn btn-warning btn-small custom" href="/getempDesalary/632d25c20c15d62544888552" style={{ width: "7rem" }} >
                                                <i className="fa-solid fa-eye"></i>&nbsp;VIEW
                                            </a>


                                        </td>


                                    </tr>


                                    <tr style={{ border: "1px solid black " }}>

                                        <td style={{ border: "1px solid black " }}> <center>

                                            <div style={{ paddingBottom: '10%' }}></div>

                                            &nbsp;


                                            <a className="btn btn-info  btn-small custom" href="#" style={{ width: "12rem", color: "darkblue", fontFamily: "initial" }} >
                                                <i className="fa-solid fa-sheet-plastic"></i>&nbsp;TAX
                                            </a>


                                        </center>

                                            <br></br>

                                            <tr style={{ border: "none " }}>
                                                <td style={{ border: "none " }} >

                                                    <b style={{ marginLeft: "100px " }}>     PAID  IN  </b>

                                                </td>

                                            </tr>

                                            <br></br>

                                            <center>
                                                <div className="form-group"
                                                    style={{

                                                        marginBottom: '15px',

                                                        width: "150px"
                                                    }}>

                                                    <input type="date"
                                                        className="form-control"
                                                        name=""
                                                        placeholder="Enter Date"
                                                    />
                                                </div>
                                            </center>

                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid black ",
                                                width: "40%"
                                            }}>
                                            <div>

                                                <tr
                                                    style={{
                                                        border: "none "
                                                    }}>

                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            As a Percentage
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.setTax}
                                                                style={{

                                                                    width: "6rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />
                                                        </label>
                                                    </td>




                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            Monthly

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.netPay}
                                                                style={{
                                                                    width: "10rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />

                                                        </label>
                                                    </td>
                                                </tr>

                                                <tr
                                                    style={{
                                                        border: "none "
                                                    }}>

                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            RS
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.setSalaryTaxRs}
                                                                style={{

                                                                    width: "12rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />
                                                        </label>
                                                    </td>

                                                </tr>

                                            </div>

                                        </td>


                                        <td style={{ border: "1px solid black ", width: "30%", textAlign: "center" }}>
                                            <center>

                                                <div >
                                                    <button className="btn btn-success" style={{ width: "7rem" }}>
                                                        <i className="fa-solid fa-address-card"></i>
                                                        <a href="/createnewsalary" style={{ textDecoration: 'none', color: 'white', paddingBottom: '10%' }}>&nbsp;ADD</a></button>
                                                </div>
                                            </center>
                                            <center>
                                                <div style={{ paddingBottom: '10%' }}></div>

                                                &nbsp;


                                                <a className="btn btn-warning btn-small custom" href="/getempDesalary/632d32fe0c15d62544888559" style={{ width: "7rem" }} >
                                                    <i className="fa-solid fa-eye"></i>&nbsp;VIEW
                                                </a>
                                            </center>

                                        </td>

                                    </tr>


                                    <tr style={{ border: "1px solid black " }}>

                                        <td style={{ border: "1px solid black " }}> <center>

                                            <div style={{ paddingBottom: '10%' }}></div>

                                            &nbsp;


                                            <a className="btn btn-info  btn-small custom" href="#" style={{ width: "12rem", color: "darkblue", fontFamily: "initial" }} >
                                                <i className="fa-solid fa-shield-halved"></i>&nbsp;ETF
                                            </a>


                                        </center>

                                            <br></br>

                                            <tr style={{ border: "none " }}>
                                                <td style={{ border: "none " }} >

                                                    <b style={{ marginLeft: "100px " }}>     PAID  IN  </b>

                                                </td>

                                            </tr>

                                            <br></br>

                                            <center>
                                                <div className="form-group"
                                                    style={{

                                                        marginBottom: '15px',

                                                        width: "150px"
                                                    }}>

                                                    <input type="date"
                                                        className="form-control"
                                                        name=""
                                                        placeholder="Enter Date"
                                                    />
                                                </div>
                                            </center>
                                        </td>

                                        <td
                                            style={{
                                                border: "1px solid black ",
                                                width: "40%"
                                            }}>
                                            <div>

                                                <tr
                                                    style={{
                                                        border: "none "
                                                    }}>

                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            As a Percentage
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.setEtF}
                                                                style={{

                                                                    width: "6rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />
                                                        </label>
                                                    </td>




                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            Monthly

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.netPay}
                                                                style={{
                                                                    width: "10rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />

                                                        </label>
                                                    </td>
                                                </tr>

                                                <tr
                                                    style={{
                                                        border: "none "
                                                    }}>

                                                    <td
                                                        style={{
                                                            border: "none "
                                                        }}>
                                                        <label
                                                            style={{
                                                                fontFamily: "monospace"
                                                            }}>
                                                            RS
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.setSalaryEtFRs}
                                                                style={{

                                                                    width: "12rem",
                                                                    backgroundColor: "#e9eff6",
                                                                    fontFamily: "monospace"
                                                                }}
                                                                placeholder="" />
                                                        </label>
                                                    </td>

                                                </tr>

                                            </div>

                                        </td>

                                        <td style={{ border: "1px solid black ", width: "30%", textAlign: "center" }}>
                                            <center>

                                                <div >
                                                    <button className="btn btn-success" style={{ width: "7rem" }}>
                                                        <i className="fa-solid fa-address-card"></i>
                                                        <a href="/createnewsalary" style={{ textDecoration: 'none', color: 'white', paddingBottom: '10%' }}>&nbsp;ADD</a></button>
                                                </div>
                                            </center>
                                            <center>
                                                <div style={{ paddingBottom: '10%' }}></div>

                                                &nbsp;


                                                <a className="btn btn-warning btn-small custom" href="/getempDesalary/632d32fe0c15d62544888559" style={{ width: "7rem" }} >
                                                    <i className="fa-solid fa-eye"></i>&nbsp;VIEW
                                                </a>
                                            </center>

                                        </td>

                                    </tr>



                                </table> */}


                                <br></br>


                                <Link to={{
                                    pathname: "/empDash",
                                    state: { selectEmpID: this.state.selectEmpID, empName: this.state.empName, netPay: this.state.netPay, month: this.state.month, year: this.state.year, ALLOWANCE: this.state.ALLOWANCE, ALLOWANCERs: this.state.ALLOWANCERs, PROJECTS: this.state.PROJECTS, PROJECTSRs: this.state.PROJECTSRs, BONUS: this.state.BONUS, BONUSRs: this.state.BONUSRs, OT: this.state.OT, OTRs: this.state.OTRs, OThour: this.state.OThour }
                                }}>
                                    <button


                                        className="btn btn-outline-secondary" style={{ marginLeft: "1070px", borderRadius: "13px", fontFamily: "font-italic", fontWeight: "bold",marginBottom:"-50px" }}
                                    >


                                        <div style={{ fontWeight: "00", color: 'black' }}>    Next &nbsp;
                                            <i className="fa-solid fa-circle-chevron-right"></i>

                                        </div>

                                    </button>
                                </Link>





                            </div>

                        </div>

                    </div>

                </div>
            </div>
            </Sidebar>

        )
    }

}