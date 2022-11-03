import React,{Component} from 'react'
import axios from"axios"
import {BrowserRouter as Router, Link} from 'react-router-dom';


export default class createnewAddisalary extends Component{

    constructor(props){
        super(props);
        this.state={
            AddType:"",
            AddDate:"",
            AddPercentage:"",
            AddMonthly:"",
            Additional:""
            
        }
    
    }

    handleInputChange = (e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }
    //validate function is newly added function for validation of Type
    //validate = () =>{
    //     validate=() =>{
    //         let isError = false;

    //         if(this.state.Percentage.length<100){
    //             isError=true;
    //         }
    //         this.setState({
    //             ...this.state,
    //         });
    //         return isError;
        
    // };



    onSubmit =(e) =>{

        e.preventDefault();
        //declaring error variable as err
        // const err = this.validate();

        const{ AddType, AddDate, AddPercentage, AddMonthly,Additional} = this.state;

        const data ={
          
            AddType:AddType,
            AddDate:AddDate,
            AddPercentage:AddPercentage,
            AddMonthly:AddMonthly,
            Additional:Additional
            
        }


        console.log(data)
        // if(!err){

        axios.post("http://localhost:8400/addiempsalary/save",data).then((res) =>{
            alert("You Have Added Employee Salary Deduction Details successfully")
            if(res.data.success){
                this.setState({
                    
                    AddType:"",
                    AddDate:"",
                    AddPercentage:"",
                    AddMonthly:"",
                    Additional:"" 
                    });

                
            }
        });


    // }else{
    //     alert('Invalid Type!');//if the speciman is having a name which is having less than 5 characters they are not saving as a valid speciman 
    // }
};
    render(){

        
        return(
            <div style={{position:'absolute', left:'6.5%', right:'2.5%', }}> 
            <div className ="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal" style = {{marginTop:'85px'}}>Create New Employee Additional Salary Details</h1>
                <form className ="need -validation" noValidate>

                    <div className="form group" style={{marginBottom:'15px'}} class="dropdown">
                        <label style={{marginBottom:'5px'}}>Salary Type</label>


                        <select value={this.state.AddType}
                  className ="form-control"  
                  name = "AddType"
                  placeholder="Enter Additional Salary Type"
                  style={{width :"765px"}}
                  onChange = {this.handleInputChange}>
            <option value="">Select Additional Salary Type</option>
            <option value="ALLOWANCE">ALLOWANCE</option>
            <option value="PROJECTS">PROJECTS</option>
            <option value="OT">OT</option>
            <option value="Bonus">Bonus</option>
            <option value="Other">Other</option> 
                        value={this.state.AddType} 
                        onChange={this.handleInputChange}

                        </select>




                     </div>
                    
                     
                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Date</label>
                         <input type="date"
                         className="form-control"
                         name="AddDate"
                         placeholder="Enter Date"
                         value={this.state. AddDate}
                         onChange={this.handleInputChange}/>
                     </div>

                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Percentage</label>
                         <input type="number"
                         max={100}
                         className="form-control"
                         name="AddPercentage"
                         placeholder="Enter percentage"
                         value={this.state. AddPercentage}
                         onChange={this.handleInputChange}/>
                     </div>


                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Monthly</label>
                         <input type="text"
                         className="form-control"
                         name="AddMonthly"
                         placeholder="Enter Monthly"
                         value={this.state. AddMonthly}
                         onChange={this.handleInputChange}/>
                     </div>


                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Additional</label>
                         <input type="text"
                         className="form-control"
                         name="Additional"
                         placeholder="Enter Additional"
                         value={this.state.Additional}
                         onChange={this.handleInputChange}/>
                     </div>

                     
<br></br>

                     <button className = "btn btn-success" type = "submit"  onClick = {this.onSubmit} style = {{width:'7rem'}}>
              <i className = "far fa-check-square"></i>
              &nbsp; Save
            </button>
          
            <div style = {{paddingBottom:'100px'}}> </div>  

            <Link to="/AdminAddtable">
          <button
           
                                       
           className="btn btn-outline-secondary" style={{marginLeft:"600px",borderRadius:"13px",fontFamily: "font-italic",fontWeight:"bold",marginTop:"5px"}}
       >


        <div style={{fontWeight:"00",color:'black'}}> GO &nbsp;
        <i className = "fa-solid fa-circle-chevron-right"></i> 
        
            </div>
            
       </button>
        </Link>

          </form>
         
                     </div>
                     </div>
                    
                  
        );
        
    }
    
}