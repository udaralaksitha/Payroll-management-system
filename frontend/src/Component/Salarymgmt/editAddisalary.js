import React,{Component} from 'react'
import axios from"axios"
import {BrowserRouter as Router, Link} from 'react-router-dom';


export default class editAddisalary extends Component{

    constructor(props){
        super(props);
        this.state={
            PID:"",
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

        const pid= this.props.match.params.id;
        const{PID,AddType,AddDate,AddPercentage,AddMonthly,Additional} = this.state;

        const pdata ={
            PID:PID,
            AddType:AddType,
            AddDate:AddDate,
            AddPercentage:AddPercentage,
            AddMonthly:AddMonthly,
            Additional:Additional
            
        }


        console.log(pdata)
       
        // if(!err){

        axios.put(`http://localhost:8400/addiempsalary/update/${pid}`,pdata).then((res) =>{
            if(res.data.success){
                alert("updated successfully")
                this.setState({
                    PID:"",
                    AddType:"",
                    AddDate:"",
                    AddPercentage:"",
                    AddMonthly:"",
                    Additional:"" 
                    })

                
            }
        })

        


    // }else{
    //     alert('Invalid Type!');//if the speciman is having a name which is having less than 5 characters they are not saving as a valid speciman 
    // }
}

componentDidMount(){

    const pid= this.props.match.params.id;

    axios.get(`http://localhost:8400/addiempsalary/${pid}`).then((res)=>{
        if(res.data.success){
            this.setState({
                PID:res.data.addiempsalary.PID,
                AddDate:res.data.addiempsalary.AddDate,
                AddType:res.data.addiempsalary.AddType,
                AddPercentage:res.data.addiempsalary.AddPercentage,
                AddMonthly:res.data.addiempsalary.AddMonthly,
                Additional:res.data.addiempsalary.Additional
                
            });

          console.log(this.state.addiempsalary);  

        }
    });



}


    render(){
        return(
            <div style={{position:'absolute', left:'6.5%', right:'2.5%', }}> 
            <div className ="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal" style = {{marginTop:'85px'}}>Edit Employee Additional Salary Details</h1>
                <form className ="need -validation" noValidate>

                    <div className="form group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Salary Type</label>
                        <input type="text"
                        className="form-control"
                        name="AddType"
                        placeholder="Enter Salary Type"
                        value={this.state.AddType}
                        onChange={this.handleInputChange}/>

                     </div>
                     
                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Date</label>
                         <input type="date"
                         className="form-control"
                         name="AddDate"
                         placeholder="Enter Date"
                         value={this.state.AddDate}
                         onChange={this.handleInputChange}/>
                     </div>

                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Percentage</label>
                         <input type="number"
                         max={100}
                         className="form-control"
                         name="AddPercentage"
                         placeholder="Enter percentage"
                         value={this.state.AddPercentage}
                         onChange={this.handleInputChange}/>
                     </div>


                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Monthly</label>
                         <input type="text"
                         className="form-control"
                         name="AddMonthly"
                         placeholder="Enter Monthly"
                         value={this.state.AddMonthly}
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



                     <button className = "btn btn-success" type = "submit"  onClick = {this.onSubmit}>
              <i className = "far fa-check-square"></i>
              &nbsp; Update
            </button>
            <div style = {{paddingBottom:'100px'}}> </div>  
          </form>

                     </div>
                     <div style={{paddingBottom: '10%'}}></div>
                     </div>
        );
    }
}