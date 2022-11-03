import React,{Component} from 'react';
import axios from 'axios';



export default class getempDesalary extends Component{
    constructor(props){
        super(props);

        this.state={
            empsalary:{},
        };
    }
    

    componentDidMount(){

        const id= this.props.match.params.id;

        axios.get(`http://localhost:8400/empsalary/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    empsalary:res.data.empsalary
                });

              console.log(this.state.empsalary);  

            }
        });

    }




    render(){
        const{Type,Date,Percentage,Monthly,Deduction} = this.state.empsalary;

        return(
            <div style={{ marginTop: '20px',position:'absolute', left:'10%', right:'2.5%' }}>
        <h4 style={{marginTop: '60px'}}>{Type}</h4>
        <hr />
        {/* <div class ="card2" id="content"> */}

             <dl className="row">
                 <dt className="col-sm-3">Date</dt>                
                 <dd className="col-sm-9">{Date}</dd>

                 <dt className="col-sm-3">Percentage</dt>                
                 <dd className="col-sm-9">{Percentage}</dd>

                 <dt className="col-sm-3">Monthly</dt>                
                 <dd className="col-sm-9">{Monthly}</dd>

                 <dt className="col-sm-3">Deduction</dt>                
                 <dd className="col-sm-9">{Deduction}</dd>

                 

             </dl>
             {/* </div> */}
             {/* <button className="btn3 button3" onClick={this.GeneratePDF} type="primary">Print Dr PDF</button> */}
            </div>
            
        );
    }
}