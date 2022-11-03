import React,{Component} from 'react';
import axios from 'axios';



export default class getempAddisalary extends Component{
    constructor(props){
        super(props);

        this.state={
            addiempsalary:{},
        };
    }
    

    componentDidMount(){

        const id= this.props.match.params.id;

        axios.get(`http://localhost:8400/addiempsalary/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    addiempsalary:res.data.addiempsalary
                });

              console.log(this.state.addiempsalary);  

            }
        });

    }




    render(){
        const{AddType,AddDate,AddPercentage,AddMonthly,Additional} = this.state.addiempsalary;

        return(
            <div style={{ marginTop: '20px',position:'absolute', left:'10%', right:'2.5%' }}>
        <h4 style={{marginTop: '60px'}}>{AddType}</h4>
        <hr />
        {/* <div class ="card2" id="content"> */}

             <dl className="row">
                 <dt className="col-sm-3">Date</dt>                
                 <dd className="col-sm-9">{AddDate}</dd>

                 <dt className="col-sm-3">Percentage</dt>                
                 <dd className="col-sm-9">{AddPercentage}</dd>

                 <dt className="col-sm-3">Monthly</dt>                
                 <dd className="col-sm-9">{AddMonthly}</dd>

                 <dt className="col-sm-3">Addition</dt>                
                 <dd className="col-sm-9">{Additional}</dd>

                 

             </dl>
             {/* </div> */}
             {/* <button className="btn3 button3" onClick={this.GeneratePDF} type="primary">Print Dr PDF</button> */}
            </div>
            
        );
    }
}