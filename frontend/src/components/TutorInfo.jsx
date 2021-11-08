import { NavigationTutor } from "./navigation_tutor";
import { Reviews } from "./Reviews";
import React,{useState,useEffect} from "react";
import axios from "axios";
import StarRateOutlinedIcon from '@material-ui/icons/StarRateOutlined';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {useParams} from "react-router-dom"

const useConstructor=(callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  };
export const TutorInfo=(props)=>
{
let {id}=useParams();

const [subjects,setSubjects]=useState([])
const [detail,setDetail]=useState({id:"",name:"",contact:"",gives_demo:"",teaches_online:"",teaches_offline:"",email:"",photo:"",home_tutor:""})

useConstructor(()=>{
   
    const options={
      id:id,
    }
    
  
      axios.post("http://127.0.0.1:8000/get_tutor_details/",options).then(function (response) {
    
        if(response.data.message!=="failure")
        {
        setDetail(response.data.message);
       
        }
        else
        {
          alert(response.data.message)
        }
    
      }).catch(function (error) {
        alert(error);
        console.error(error);
      });

})
let path,demo_check,online_check,offline_check,home_check;
useEffect(() => {

 
 
  const options={
    phone_no:detail.contact.toString(),
  }

  axios.post("http://127.0.0.1:8000/get_subjects_tutor/",options).then(function (response) {
    
    if(response.data.message!=="failure")
    {
    setSubjects(response.data.message);
  

    }
    else
    {
      alert(response.data.message)
    }

  }).catch(function (error) {
    alert(error);
    console.error(error);
  });
 
 
}, [detail])





/*Tutor Subects table*/
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 800
  }
});

// const rows = [
//   createData("Class 5", "Hindi,English"),
//   createData("Class 11", "Physics,Chemistry,Science")
// ];

const rows = subjects.map(sub=>{
  return(
    createData(sub.classes, sub.subjects)
  );
});

function createData(Class, Subjects) {
  return { Class, Subjects };
}

function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" style={{fontSize:"16px"}}>Class</StyledTableCell>
            <StyledTableCell align="center" style={{fontSize:"16px"}}>Subjects</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.Class}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Subjects}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/*------------------------------------*/

path="http://127.0.0.1:8000" + detail.photo;
demo_check = (detail.gives_demo ? <i class="fas fa-check" style={{color:"green"}}></i> : <i class="fas fa-times" style={{color:"red"}}></i>);
online_check = (detail.teaches_online ? <i class="fas fa-check" style={{color:"green"}}></i> : <i class="fas fa-times" style={{color:"red"}}></i>);
offline_check = (detail.teaches_offline ? <i class="fas fa-check" style={{color:"green"}}></i> : <i class="fas fa-times" style={{color:"red"}}></i>);
home_check = (detail.home_tutor ? <i class="fas fa-check" style={{color:"green"}}></i> : <i class="fas fa-times" style={{color:"red"}}></i>);



    return (
      <div>
      <div>
      <NavigationTutor />
      </div>


      <div className ="container CH2" style={{marginTop:"7%",padding:"3%"}}>
      <div className="row CH2" style={{padding:"2%"}}>
          <div className="col-md-8">
              <div className="row">
                  <div className="col-md-3 form-group">
                        <img src={path} height="120px" width="120px" style={{borderRadius:"50%"}} alt="" />
                  </div>

                  <div className="col-md-6 form-group">
                      <h3>{detail.name} </h3>
                      <i class="fas fa-user-check">Id Verified</i>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-2">
                        <div style={{fontSize:"18px"}}>Demo:  {demo_check}</div>
                  </div>
                  <div className="col-md-3">
                      <div style={{fontSize:"18px"}}>Home Tutor:  {home_check}</div>
                  </div>
                  <div className="col-md-2">
                        <div style={{fontSize:"18px"}}>Online:  {online_check}</div>
                  </div>
                  <div className="col-md-3">
                    <div style={{fontSize:"18px"}}>    Offline:  {offline_check}</div>
                  </div>
              </div>
              <div className="row">
                <div className="col-md-1" style={{fontSize:"20px"}}>
                    Contact:
                </div>
                <div className="col-md-2" style={{fontSize:"20px",marginLeft:"36px"}}>
                    {detail.contact}
                </div>
              </div>

              <div className="row">
                <div className="col-md-1" style={{fontSize:"20px"}}>
                    Email:
                </div>
                <div className="col-md-2" style={{fontSize:"20px",marginLeft:"20px"}}>
                    {detail.email}
                </div>
              </div>
          </div>


          <div className="col-md-3">
              <div className="row">
                  <div className="col" style={{height:"35px"}}> 
                        <div className="row" style={{fontSize:"20px"}}>
                            <div className="col-md-3">
                              <label htmlFor="" style={{fontSize:"20px"}}>Rating: </label>
                            </div>

                            <div className="col-md-1">
                              <StarRateOutlinedIcon style={{fontSize:"31px",color:"#FFD700"}}/> 
                            </div>  

                            <div className="col-md-1">
                             <font style={{fontSize:"20px",marginLeft:"5px"}}>{detail.rating}</font>   
                            </div>
                        </div>   
                  </div>
              </div>
              
              
          </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>About me :</h3>
          <font style={{fontSize:"17px"}}>
          I am a highly experienced secondary school teacher of Biology and Chemistry. I recently retired after teaching 12 years at a renowned private school where I obtained top results for all my pupils regardless of ability. Stretching and challenging students, so they can attain the highest levels, is rewarding for me and deserved by my students. Everyone has the potential to do well when provided with quality teaching and most importantly a belief in their own ability, You can trust me to deliver on this.
          </font>
        </div>

      </div>
      <br />
      <div className="row">
        <div className="col">
          <h3>Experience :</h3>
          <font style={{fontSize:"17px"}}>
          18 years teaching at state and private schools, preceeded by working as a Research Scientist at GSK.
Teaching Biology, Chemistry and Physics to Gcse and Biology to A level.
          </font>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-2"></div>
        <div className="container col-md-8">
          <hr />  
          <CustomizedTables />
        </div>
      </div>
     
  </div>


  <div className="container-fluid">
      <Reviews phone_no={detail.contact} />
  </div>


  </div>
    );
}