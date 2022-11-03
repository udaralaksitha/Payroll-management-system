import React,{Component} from 'react'
import axios from"axios"
import {BrowserRouter as Router, Link} from 'react-router-dom';


export default class percentageedit extends Component{

    constructor(props){
        super(props);
        this.state={
        HID:"",
        Percentage:"",
        perhour:""
           
            
        }
    
    }

    handleInputChange = (e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }
   



    onSubmit =(e) =>{

        e.preventDefault();
       
        //declaring error variable as err
        // const err = this.validate();

        const sid= this.props.match.params.id;
        const{HID,Percentage,perhour} = this.state;

        const sdata ={
        HID:HID,
        Percentage:Percentage,
        perhour:perhour
          
            
        }


        console.log(sdata)
       
        // if(!err){

        axios.put(`http://localhost:8400/empsalaryper/update/${sid}`,sdata).then((res) =>{
            if(res.data.success){
                alert("updated successfully")
                this.setState({
                    HID:"",
                    Percentage:"",
                    perhour:""
                    
                    })

                
            }
        })

        


    // }else{
    //     alert('Invalid Type!');//if the speciman is having a name which is having less than 5 characters they are not saving as a valid speciman 
    // }
}

componentDidMount(){

    const sid= this.props.match.params.id;

    axios.get(`http://localhost:8400/empsalaryper/${sid}`).then((res)=>{
        if(res.data.success){
            this.setState({
              
                Percentage:res.data.empsalaryper.Percentage,
                perhour:res.data.empsalaryper.perhour,
              
                
            });

          console.log(this.state.empsalaryper);  

        }
    });



}


    render(){
        return(
            <div style={{position:'absolute', left:'6.5%', right:'2.5%', }}> 
            <div className ="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal" style = {{marginTop:'85px'}}>Edit Salary percentage Details</h1>
                <form className ="need -validation" noValidate>

                    
                     

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
                         <label style={{marginBottom:'5px'}}>perhour</label>
                         <input type="number"
                         max={100}
                         className="form-control"
                         name="perhour"
                         placeholder="Enter rate per hour"
                         value={this.state.perhour}
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