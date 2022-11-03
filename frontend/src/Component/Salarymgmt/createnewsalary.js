import React,{Component} from 'react'
import axios from"axios"
import {BrowserRouter as Router, Link} from 'react-router-dom';


export default class createnewsalary extends Component{

    constructor(props){
        super(props);
        this.state={
            Type:"",
            Date:"",
            Percentage:"",
            Monthly:"",
            Deduction:""
            
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

        const{Type,Date,Percentage,Monthly,Deduction} = this.state;

        const data ={
          
            Type:Type,
            Date:Date,
            Percentage:Percentage,
            Monthly:Monthly,
            Deduction:Deduction
            
        }


        console.log(data)
        // if(!err){

        axios.post("http://localhost:8400/empsalary/save",data).then((res) =>{
            alert("You Have Added Employee Salary Deduction Details successfully")
            if(res.data.success){
                this.setState({
                    
                    Type:"",
                    Date:"",
                    Percentage:"",
                    Monthly:"",
                    Deduction:"" 
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
                <h1 className="h3 mb-3 font-weight-normal" style = {{marginTop:'85px'}}>Create New Employee Deduction Salary Details</h1>
                <form className ="need -validation" noValidate>

                    <div className="form group" style={{marginBottom:'15px'}} class="dropdown">
                        <label style={{marginBottom:'5px'}}>Salary Type</label>
                        
                       

                        <select value={this.state.Type}
                  className ="form-control"  
                  name = "Type"
                  placeholder="Enter Salary Type"
                  style={{width :"765px"}}
                  onChange = {this.handleInputChange}>
            <option value="">Select Deduction Salary Type</option>
            <option value="EPF">EPF</option>
            <option value="TAX">TAX</option>
            <option value="ETF">ETF</option>
            <option value="Other">Other</option>           
                        value={this.state.Type} 
                        onChange={this.handleInputChange}

                        </select>


{/* <div class="dropdown" >
  <button   style={{width:'767px'}} class="btn btn-secondry dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   Select Deduction salary Type
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li><a class="dropdown-item active" href="#">Salary Type</a></li>
    <li><a class="dropdown-item" href="#">EPF</a></li>
    <li><hr class="dropdown-divider"></hr></li>
    <li><a class="dropdown-item" href="#">TAX</a></li>
    <li><hr class="dropdown-divider"></hr></li>
    <li><a class="dropdown-item" href="#">ETF</a></li>
   
  </ul>
</div> */}

                     </div>
                    
                     
                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Date</label>
                         <input type="date"
                         className="form-control"
                         name="Date"
                         placeholder="Enter Date"
                         value={this.state.Date}
                         onChange={this.handleInputChange}/>
                     </div>

                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Percentage</label>
                         <input type="number"
                         max={100}
                         className="form-control"
                         name="Percentage"
                         placeholder="Enter percentage"
                         value={this.state.Percentage}
                         onChange={this.handleInputChange}/>
                     </div>


                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Monthly</label>
                         <input type="text"
                         className="form-control"
                         name="Monthly"
                         placeholder="Enter Monthly"
                         value={this.state.Monthly}
                         onChange={this.handleInputChange}/>
                     </div>


                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Deduction</label>
                         <input type="text"
                         className="form-control"
                         name="Deduction"
                         placeholder="Enter Deduction"
                         value={this.state.Deduction}
                         onChange={this.handleInputChange}/>
                     </div>

                     
<br></br>

                     <button className = "btn btn-success" type = "submit"  onClick = {this.onSubmit} style = {{width:'7rem'}}>
              <i className = "far fa-check-square"></i>
              &nbsp; Save
            </button>
          
            <div style = {{paddingBottom:'100px'}}> </div>  

            <Link to="/AdminDetable">
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