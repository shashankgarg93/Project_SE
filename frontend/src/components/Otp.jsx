import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link, Redirect,Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {Success} from "./Success"
import { confirmAlert } from 'react-confirm-alert';
import { lime } from "@material-ui/core/colors";
export const Otp = (props) => {
    const [otp,setOtp]=useState("");
    const [school,setSchool]=useState("");
    const [year,setYear]=useState("");
    const [degree,setDegree]=useState("");
    const [verify,setVerify]=useState(false);
    const [resend,setResend]=useState(true);
    const [i,setI]=useState(30);
    const [redirctTo, setRedirctTo] = useState(false);
    const handleChange=(e)=>{

        setOtp(e.target.value);

    }
   useEffect(()=>{
     if(verify&&school!==""){
      

       
        props.location.inputList.map((obj,i)=>{ 
            const fd = new FormData();
           
      
            fd.append('photo',props.location.picture); 
            fd.append('name',props.location.detail.fname.toString()+" "+props.location.detail.lname.toString());
            fd.append('latitude',parseFloat(props.location.lat));
            fd.append('longitude',parseFloat(props.location.long));
            fd.append('contact',props.location.detail.phoneno.toString());
            fd.append('email',props.location.detail.email.toString());
            fd.append('subjects',obj.subject.toString());
            fd.append('classes',obj.class.toString());
            fd.append('about_me',props.location.detail.me.toString());
            fd.append('experience',props.location.detail.exp.toString());
            fd.append('teaches_offline',props.location.offline.toString());
            fd.append('teaches_online',props.location.online.toString());
            fd.append('home_tutor',props.location.hometutor.toString());
            fd.append('gives_demo',props.location.demo.toString());
            fd.append('schools',school.toString());
            fd.append('years',year.toString());
            fd.append('degrees',degree.toString());
            fd.append("check",i);
            fd.append('otp',otp.toString());
             axios.post("http://127.0.0.1:8000/register_tutor/",fd
            ,{headers: {
              "Content-Type": "multipart/form-data"
            }}
            ).then(function (response) {
              if(response.data.message==="success"&&i==props.location.inputList.length-1)
              {
                
                // setRedirctTo(true);
                confirmAlert({
                  title: 'Success!',
                  message: "You have been registered.",
                
                 
                  buttons: [
                    {
                      label: 'Okay',
                      
                      onClick: () => {
                        window.location.href = "http://localhost:3000";
                      }
                    }
                    
                  ]
                })
                
             
              }
              else if(response.data.message==="failure")
              {
                alert(response.data.message);
                setVerify(false);
              }
    
            }).catch(function (error) {
              alert(error);
              console.error(error);
            }
            );
   
          });

   

     
    
  

     }
   



   },[verify,degree]);
  // useEffect(()=>{
  //   if(redirctTo)
  //   {
  //     alert("Bye");
  //       <Redirect push to="/Success" />
  //   }
  //   else
  //   {
  //     alert("Hello")
  //   }
  // },[redirctTo])

   useEffect(()=>{
     if(resend)
     {
       setTimeout(()=>{
         setResend(!resend);

       },30000);
     }

   },[resend]);
   useEffect(()=>{
     if(resend){

        let myInterval = setInterval(()=>{
        
          if(i>0)
          {
            setI((prev)=>prev-1);

          }
          
         
         
       },1000)
       return ()=> {
        clearInterval(myInterval);
      };
     }
   })

   function handleClick2(e)
   {
    e.preventDefault();
    setVerify(true);
   var schoolList="";
   var degreeList="";
   var yearList="";
   for(var i=0;i<props.location.education_history.length;i++)
   {
     schoolList+=props.location.education_history[i].school+",";
     degreeList+=props.location.education_history[i].degree+",";
     yearList+=props.location.education_history[i].passing_year+",";
   }
   setSchool(schoolList);
   setYear(yearList);
   setDegree(degreeList);

   
       
    }
    const handleClick=()=>{

      
     if(!resend)
     {
      const data = {
        'phone_no' : props.location.detail.phoneno,
        'email':props.location.detail.email,
      }
      axios.post("http://127.0.0.1:8000/auth/otp/",data).then(function (response) {


        if(response.data.message==='success')
        {
          alert("otp sent");
          setResend(true);
          setI(30);
        }
        else
        {
          alert(response.data.message);
        }

      }).catch(function (error) {
        alert(error);
        console.error(error);
      });

     }
      
     
    }
    return (

      <div className='Contain'>

          <form className="container-fluid otp" method="post" >
          <center><h3>OTP Verification</h3></center>
        <br />

              <div className='row' >
              <div className="form-group">
              <label>Email</label>

              <input type="text" className="form-control" style={{width:"225px"}} value={props.location.detail.email} />
            </div>





              </div>
              <div className="row">
          <div className="form-group col-md-5 offset-2 ">
            <label>OTP</label>

            <input type="text" name="" value={otp} className="form-control" onChange={handleChange}/>
            <div className="form-group col-md-5">
            <button onClick={ handleClick2} className="btn-primary">Verify OTP</button>
            </div>
            
           
          </div>



         </div>
         <div className="row">
           {
             resend?
             <div className="col-md-2">
             <p>Resend OTP</p>
             </div>:
             <div className="col-md-2">
             <a style={resend?{PointerEvent:"none"}:null} href="javascript:void(0);" onClick={handleClick} >Resend OTP</a>
             </div>
             
           }
           
            

            </div>
          {
            resend&&i!=0?
            <div className="row">

              {i} seconds remaining
            </div>:null}


          </form>

      </div>
    )
  }
