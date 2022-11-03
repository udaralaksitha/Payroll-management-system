import {BrowserRouter as Router, Routes, Component, Route} from 'react-router-dom';
import AdmindashDe from './Component/Salarymgmt/AdmindashDe';
import empWelcome from './Component/Salarymgmt/empWelcome';
import AdmindashAd1 from './Component/Salarymgmt/AdmindashAd1';
import AdmindashAd2 from './Component/Salarymgmt/AdmindashAd2';
import AdminDetable from './Component/Salarymgmt/AdminDetable';
import AdminAddtable from './Component/Salarymgmt/AdminAddtable';
import empDash from './Component/Salarymgmt/empDash';
import empDded from './Component/Salarymgmt/empDded';
import empDadd from './Component/Salarymgmt/empDadd';
import createnewsalary from './Component/Salarymgmt/createnewsalary';
import createnewAddisalary from './Component/Salarymgmt/createnewAddisalary';
import editsalary from './Component/Salarymgmt/editsalary';
import editAddisalary from './Component/Salarymgmt/editAddisalary';
import getempDesalary from './Component/Salarymgmt/getempDesalary';
import getempAddisalary from './Component/Salarymgmt/getempAddisalary';
import salarypercentage from './Component/Salarymgmt/salarypercentage';
import percentageedit from './Component/Salarymgmt/percentageedit';
import './Components/project_budgeting/pb.css';
import 'react-datepicker/dist/react-datepicker.css';
import Manldash from './Components/Shift_Time/Manleavedash';
import ApproveL from './Components/Shift_Time/ApproveL';
import Emptimesheet from './Components/Shift_Time/EmpTime/Emptimesheet';
import Empleave from './Components/Shift_Time/Empleave';
import DenyL from './Components/Shift_Time/DenyL';
import Emptimesheets from './Components/Shift_Time/EmpTime/ManTimesheet';
import ApproveTimesheet from './Components/Shift_Time/EmpTime/ApproveTimesheet';
import DenyTimesheet from './Components/Shift_Time/EmpTime/DenyTimesheet';
import Manshifts from "./Components/Shift_Time/ManEmpshifts";
import ManshiftDash from "./Components/Shift_Time/ManShiftDash";
import SpecEmpShift from "./Components/Shift_Time/SpecEmpShift";
import EditEmpShift from "./Components/Shift_Time/Editempshift";
import BankAccount from "./Components/Employee/pages/BankAccount";
import UserProfileControl from "./Components/Employee/pages/UserProfileControl";
import EmpHome from "./Components/Employee/pages/EmpHome";
import Department from "./Components/Employee/pages/Department";
import ProfileView from "./Components/Employee/pages/ProfileView";
import ProfileEdit from "./Components/Employee/pages/ProfileEdit";
import BankEdit from "./Components/Employee/pages/BankEdit";
import DepartmentEdit from "./Components/Employee/pages/DepartmentEdit";
import Employee from "./Components/Employee/pages/Employee";
import ViewNic from "./Components/Employee/pages/ViewNic";
import Login from "./Components/Employee/pages/Login";
import Chat from "./Components/Employee/pages/Chat";
import Reset  from "./Components/Employee/pages/Reset";
import EmpleaveDash from './Components/Shift_Time/EmpleaveDash';
import EmpTimesheetDash from './Components/Shift_Time/EmpTime/EmpTimesheetDash';
import EmployeeShiftDash from './Components/Shift_Time/EmployeeShiftDash';
import ForgotPassword from "./Components/Employee/pages/ForgotPassword";
import ProfileUpdate from "./Components/Employee/pages/ProfileUpdate";
import NicUpdate from "./Components/Employee/pages/NicUpdate";
import CreateProject from './Components/project_budgeting/projects/CreateProject';
import PHome from './Components/project_budgeting/projects/PHome';
import Pberror from './Components/project_budgeting/pberror';
import EditPProjects from './Components/project_budgeting/projects/EditPProjects';
import PProjectDetails from './Components/project_budgeting/projects/PProjectDetails';
import THome from './Components/project_budgeting/tasks/THome';
import CreateTask from './Components/project_budgeting/tasks/CreateTasks';
import EditTasks from './Components/project_budgeting/tasks/EditTasks';
import Details from './Components/project_budgeting/tasks/Details';
import Cal from './Components/project_budgeting/calendar/Cal';





function App() {
  return (
    <Router> 
      
        {/* <Route exact path="/"  component={< Dashboard/>}/> */}
        <Route exact path="/"  component={Login}/>
        <Route exact path="/AdmindashDe"  component={AdmindashDe}/>
        <Route exact path="/AdmindashAd1" component={ AdmindashAd1}/>
        <Route exact path="/AdmindashAd2"  component={AdmindashAd2}/>
        <Route exact path="/AdminDetable"  component={AdminDetable}/>
        <Route exact path="/AdminAddtable"  component={AdminAddtable}/>
        <Route exact path="/empWelcome"  component={empWelcome}/>
        <Route exact path="/empDash"  component={empDash}/>
        <Route exact path="/empDded"  component={empDded}/>
        <Route exact path="/empDadd"  component={empDadd}/>
        <Route exact path="/createnewsalary"  component={createnewsalary}/>
        <Route exact path="/createnewAddisalary"  component={createnewAddisalary}/>
        <Route exact path="/editsalary/:id"  component={editsalary}/>
        <Route exact path="/editAddisalary/:id"  component={editAddisalary}/>
        <Route exact path="/getempDesalary/:id"  component={getempDesalary}/>
        <Route exact path="/getempAddisalary/:id"  component={getempAddisalary}/>
        <Route exact path="/salarypercentage"  component={salarypercentage}/>
        <Route exact path="/percentageedit/:id"  component={percentageedit}/>
        <Route path= "*"exact component = {Pberror}> </Route>
        <Route path= "/createproject"exact component = {CreateProject}></Route>
        <Route path= "/phome"exact component = {PHome}></Route>
        <Route path= "/proj/updates/:id"exact component = {EditPProjects}></Route>
        <Route path= "/getspecproj/:id"exact component = {PProjectDetails}> </Route>
        <Route path= "/createtask"exact component = {CreateTask}></Route>
        <Route path= "/thome"exact component = {THome}></Route>
        <Route path= "/task/updates/:id"exact component = {EditTasks}></Route>
        <Route path= "/getspectask/:id"exact component = {Details}></Route>
        <Route path="/cal" exact component={Cal}></Route>
        <Route  path="/emptimesheet" exact component={Emptimesheet} />
        <Route  path="/emptimsheetdash" exact component={EmpTimesheetDash} />
        <Route  path="/empshiftdash" exact component={EmployeeShiftDash} />
        <Route  path="/userempleave" exact component={EmpleaveDash} />
        <Route  path="/empleave" exact component={Empleave} />
        <Route  path="/manemptimesheet" exact component={Emptimesheets} />
        <Route  path="/approvetimesheet/:id" exact component={ApproveTimesheet} />
        <Route  path="/denytimesheet/:id" exact component={DenyTimesheet} />
        <Route  path="/empleave/:id" exact component={DenyTimesheet} />
        <Route  path="/manempleave" exact component={Manldash} />
        <Route path="/manempshift" exact component={Manshifts}></Route>
        <Route path="/manempshift/:id" exact component={SpecEmpShift}></Route>
        <Route path="/manshiftdash" exact component={ManshiftDash}></Route>
        <Route path="/maneditshift/:id" exact component={EditEmpShift}></Route>
        <Route path="/emplapprove/:id" component={ ApproveL}/>
        <Route path="/empldeny/:id" component={DenyL }/>
        <Route path="/bankdetails" exact component={BankAccount}></Route>
        <Route path="/userprofile" exact component={UserProfileControl}></Route>
        <Route path="/empregister" exact component={Employee}></Route>
        <Route path="/departments" exact component={Department}></Route>
        <Route path="/viewprofile" exact component={ProfileView}></Route>
        <Route path="/editbank" exact component={BankEdit}></Route>
        <Route path="/editdept" exact component={DepartmentEdit}></Route>
        <Route path="/editprofile" exact component={ProfileEdit}></Route>
        <Route path="/employees" exact component={EmpHome}></Route>
        <Route path="/viewnic" exact component={ViewNic}></Route>
        <Route path='/chat' exact component={Chat}></Route>
        <Route path='/reset' exact component={Reset}></Route>
        <Route path="/reset/:token" exact component={ForgotPassword}></Route>
        <Route path='/profileupdate' exact component={ProfileUpdate}></Route>
        <Route path='/nicupdate' exact component={NicUpdate}></Route>
       
        
        

        
        
        
        

      

    </Router>
    
  );
}

export default App;