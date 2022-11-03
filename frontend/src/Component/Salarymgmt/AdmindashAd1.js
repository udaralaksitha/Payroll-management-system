import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from "axios";
import Template1 from './images/Template1.png';
import Sidebar from "../Salarymgmt/Sidebar";

export default class AdmindashAd1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empID: "",
            empName: this.props.location.state.empName,
            selectEmpID: this.props.location.state.selectEmpID,
            ALLOWANCE: this.props.location.state.ALLOWANCE,
            PROJECTS: this.props.location.state.PROJECTS,
            OT: this.props.location.state.OT,
            BONUS: this.props.location.state.BONUS,
            ALLOWANCERs: this.props.location.state.ALLOWANCERs,
            PROJECTSRs: this.props.location.state.PROJECTSRs,
            OTRs: this.props.location.state.OTRs,
            BONUSRs: this.props.location.state.BONUSRs,
            netPay: this.props.location.state.netPay,
            month: this.props.location.state.month,
            year: this.props.location.state.year,
            allowPercentage: this.props.location.state.ALLOWANCE,
            allowMonthly: this.props.location.state.netPay,
            OThour: this.props.location.state.OThour,
            allowDeduction: "",
            allowDate: "",

            proPercentage: this.props.location.state.PROJECTS,
            proMonthly: this.props.location.state.netPay,
            proDeduction: "",
            proDate: ""

        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    validate = () => {
        let isError = false;

        if (1 > 2) {
            isError = true;
        }
        this.setState({
            ...this.state,
        });
        return isError;

    };

    onSubmit = (e) => {

        e.preventDefault();
        //declaring error variable as err
        const err = this.validate();

        const { allowPercentage, allowMonthly, allowDate, allowDeduction, proPercentage, proMonthly, proDate, proDeduction } = this.state;

        const data = {

            allowPercentage: allowPercentage,
            allowMonthly: allowMonthly,
            allowDeduction: allowDeduction,
            allowDate: allowDate,

            proPercentage: proPercentage,
            proMonthly: proMonthly,
            proDeduction: proDeduction,
            proDate: proDate

        }
        console.log(data)
        if (!err) {

            axios.post("http://localhost:8400/empsalary/save", data).then((res) => {
                if (res.data.success) {
                    this.setState({

                        allowPercentage: "",
                        allowMonthly: "",
                        allowDeduction: "",
                        allowDate: "",



                        proPercentage: "",
                        proMonthly: "",
                        proDeduction: "",
                        proDate: ""
                    });

                }
            });


        } else {
            alert('Invalid Type!');//if the speciman is having a name which is having less than 5 characters they are not saving as a valid speciman 
        }
    };


    componentDidMount = async () => {


        this.setState({ empID: localStorage.getItem("logID") })

    }

    render() {
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

                       

                        <div className='contain-table'>

                            <b style={{
                                marginLeft: "230px"
                            }}>ROLL</b>

                            <a className="btn btn-dark btn-small custom"
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
                                </i>&nbsp;&nbsp;MANAGER
                            </a>
                            <b style={{
                                marginLeft: "1030px",
                                marginTop: "2px"
                            }}>ID</b>

                            <input type="text"
                                className="form-control"
                                value={this.state.empID}
                                style={{
                                    backgroundColor: "#dbba8b",
                                    marginLeft: "1070px",
                                    marginTop: "-30px",
                                    borderRadius: "10px",
                                    color: "black",
                                    fontWeight: "bold",
                                    width: "6rem",

                                }}
                                placeholder="MN008" />



                            <b style={{
                                marginLeft: "620px",
                                fontFamily: "bodoni mt black"
                            }}>
                                PAYROLL ADDITIONAL
                            </b>

                            <br></br>
                            <br></br>
                            <br></br>

                            <b
                                style={{
                                    marginLeft: "230px"
                                }}>
                                Employee Name
                            </b>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.empName}
                                style={{
                                    marginLeft: "360px",
                                    marginTop: "-30px",
                                    borderRadius: "5px",
                                    width: "20rem",
                                    backgroundColor: "#ececec",
                                    fontFamily: "monospace"
                                }}
                                placeholder="MR.kamal hasan" />

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
                                        marginLeft: "230px",
                                        marginBottom: '15px',
                                        width: "250px",

                                    }}>

                                    <select
                                        class="form-select"
                                        aria-label="Default select example"
                                        onChange={this.changeYear}
                                        value={this.state.year}
                                        disabled={true}
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
                                        marginLeft: "230px",
                                        marginBottom: '15px',
                                        width: "250px",

                                    }}>

                                    <select
                                        class="form-select"
                                        aria-label="Default select example"
                                        onChange={this.changeMonth}
                                        value={this.state.month}
                                        disabled={true}
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

                            <table style={{ border: "1px solid black ", width: "75%", marginLeft: "220px" }}>



                                <tr style={{ border: "1px solid black " }}>

                                    <td style={{ border: "1px solid black ", width: "30%" }}><center>

                                        <div style={{ paddingBottom: '10%' }}></div>

                                        &nbsp;


                                        <a className="btn btn-info  btn-small custom" href="#" style={{ width: "12rem", color: "darkblue", fontFamily: "initial" }} >
                                            <i className="fa-solid fa-book"></i>&nbsp;ALLOWANCE
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
                                                            value={this.state.allowPercentage}
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
                                                            value={this.state.ALLOWANCERs}
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



                                        <div >
                                            <button className="btn btn-secondary" style={{ width: "7rem" }}>
                                                <i className="fa-solid fa-address-card"></i>
                                                <a href="/createnewAddisalary" style={{ textDecoration: 'none', color: 'white', paddingBottom: '10%' }}>&nbsp;ADD</a></button>
                                        </div>

                                        <div style={{ paddingBottom: '10%' }}></div>

                                        &nbsp;


                                        <a className="btn btn-warning btn-small custom" href="/getempAddisalary/633aa6b5f7e2a54af812bd46" style={{ width: "7rem" }} >
                                            <i className="fa-solid fa-eye"></i>&nbsp;VIEW
                                        </a>


                                    </td>
                                </tr>


                                <tr style={{ border: "1px solid black " }}>

                                    <td style={{ border: "1px solid black " }}><center>

                                        <div style={{ paddingBottom: '10%' }}></div>

                                        &nbsp;


                                        <a className="btn btn-info  btn-small custom" href="#" style={{ width: "12rem", color: "darkblue", fontFamily: "initial" }} >
                                            <i className="fa-solid fa-user-shield"></i>&nbsp;PROJECTS
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
                                                            value={this.state.proPercentage}
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
                                                            value={this.state.PROJECTSRs}
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



                                        <div >
                                            <button className="btn btn-secondary" style={{ width: "7rem" }}>
                                                <i className="fa-solid fa-address-card"></i>
                                                <a href="/createnewAddisalary" style={{ textDecoration: 'none', color: 'white', paddingBottom: '10%' }}>&nbsp;ADD</a></button>
                                        </div>

                                        <div style={{ paddingBottom: '10%' }}></div>

                                        &nbsp;


                                        <a className="btn btn-warning btn-small custom" href="/getempAddisalary/633ab035f7e2a54af812bd6d" style={{ width: "7rem" }} >
                                            <i className="fa-solid fa-eye"></i>&nbsp;VIEW
                                        </a>


                                    </td>

                                </tr>




                            </table>
                            <br></br>

                            <Link to={{
                                pathname: "/AdmindashAd2",
                                state: { selectEmpID: this.state.selectEmpID, empName: this.state.empName, netPay: this.state.netPay, month: this.state.month, year: this.state.year, ALLOWANCE: this.state.ALLOWANCE, ALLOWANCERs: this.state.ALLOWANCERs, PROJECTS: this.state.PROJECTS, PROJECTSRs: this.state.PROJECTSRs, BONUS: this.state.BONUS, BONUSRs: this.state.BONUSRs, OT: this.state.OT, OTRs: this.state.OTRs }
                            }}>
                                <button


                                    className="btn btn-outline-secondary" style={{ marginLeft: "1120px", borderRadius: "13px", fontFamily: "font-italic", fontWeight: "bold" }}
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
            </Sidebar>
        )
    }

}