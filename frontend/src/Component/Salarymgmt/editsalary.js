import React,{Component} from 'react'
import axios from"axios"
import {BrowserRouter as Router, Link} from 'react-router-dom';


export default class editsalary extends Component{

    constructor(props){
        super(props);
        this.state={
            SID:"",
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

        const sid= this.props.match.params.id;
        const{SID,Type,Date,Percentage,Monthly,Deduction} = this.state;

        const sdata ={
            SID:SID,
            Type:Type,
            Date:Date,
            Percentage:Percentage,
            Monthly:Monthly,
            Deduction:Deduction,
            
        }


        console.log(sdata)
       
        // if(!err){

        axios.put(`http://localhost:8400/empsalary/update/${sid}`,sdata).then((res) =>{
            if(res.data.success){
                alert("updated successfully")
                this.setState({
                    SID:"",
                    Type:"",
                    Date:"",
                    Percentage:"",
                    Monthly:"",
                    Deduction:"" 
                    })

                
            }
        })

        


    // }else{
    //     alert('Invalid Type!');//if the speciman is having a name which is having less than 5 characters they are not saving as a valid speciman 
    // }
}

componentDidMount(){

    const sid= this.props.match.params.id;

    axios.get(`http://localhost:8400/empsalary/${sid}`).then((res)=>{
        if(res.data.success){
            this.setState({
                SID:res.data.empsalary.SID,
                Date:res.data.empsalary.Date,
                Type:res.data.empsalary.Type,
                Percentage:res.data.empsalary.Percentage,
                Monthly:res.data.empsalary.Monthly,
                Deduction:res.data.empsalary.Deduction
                
            });

          console.log(res.data.empsalary.Percentage);  

        }
    });



}


    render(){
        return(
            <div style={{position:'absolute', left:'6.5%', right:'2.5%', }}> 
            <div className ="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal" style = {{marginTop:'85px'}}>Edit Employee Deduction Salary Details</h1>
                <form className ="need -validation" noValidate>

                    <div className="form group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Salary Type</label>
                        <input type="text"
                        className="form-control"
                        name="Type"
                        placeholder="Enter Salary Type"
                        value={this.state.Type}
                        onChange={this.handleInputChange}/>

                     </div>
                     
                     <div className ="form-group" style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Date</label>
                         <input type="text"
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