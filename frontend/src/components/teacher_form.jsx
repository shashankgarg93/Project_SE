import SelectSearch from 'react-select-search';
import fuzzySearch from '../extra functions/fuzzySearch';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import Switch from '@material-ui/core/Switch';

import image from './Spinner-1s-200px.gif'
const useConstructor=(callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};




export function RegisterTeacher() 
{
  const [showLoading,setShowLoading]=useState(false);
  const [inputList, setInputList] = useState([{ subject: "", class: "" }]);
  const [homeTutor,setHomeTutor]=useState(false);
  const [detail,setDetail]=useState({phoneno:"",email:"",fname:"",lname:"",exp:"",me:""});
  
const [edu,setEdu]=useState([{school:"",degree:"",passing_year:""}]);
  //consts class and subjects
  const classes = [
    {name: 'Class 5', value: 'Class 5'},
    {name: 'Class 6', value: 'Class 6'},
    {name: 'Class 7', value: 'Class 7'},
    {name: 'Class 8', value: 'Class 8'},
    {name: 'Class 9', value: 'Class 9'},
    {name: 'Class 10', value: 'Class 10'},
    {name: 'Class 11', value: 'Class 11'},
    {name: 'Class 12', value: 'Class 12'},
    // {
    //     type: 'group',
    //     name: 'Group name',
    //     items: [
    //         {name: 'Spanish', value: 'es'},
    //     ]
    // },
  ];
  const subjects = [
    {name: 'Hindi', value: 'Hindi'},
    {name: 'English', value: 'English'},
    {name: 'Science', value: 'Science'},
    {name: 'Maths', value: 'Maths'},
    {name: 'Chemistry', value: 'Chemistry'},
    {name: 'Physics', value: 'Physics'},
    {name: 'Biology', value: 'Biology'},
    {name: 'Social Studies (SST)', value: 'Social Studies (SST)'},
    {name: 'History', value: 'History'},
    {name: 'Geography', value: 'Geography'},
    {name: 'Economics', value: 'Economics'},
    {name: 'Art', value: 'Art'},
    {name: 'Punjabi', value: 'Punjabi'},
    {name: 'Psychology', value: 'Psychology'},

  ];

  // const handleInputChangeClass = (e, index) => {

  // };
  // const handleInputChangeSubject = (e, index) => {
  //   const list = [...inputList];

  //   list[index].subject = e;
  //   setInputList(list);
  // };

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setDetail((prev)=>({
      ...prev,
      [name]: value
    }))

  }


  const Checkphone = (e)=>
  {
    var pattern = new RegExp(/^[6-9]{1}[0-9]{9}$/);
    if(!pattern.test(e.target.value))
      alert("Invalid");
  }

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleEduRemove=(index)=>{
    const list=[...edu];
    list.splice(index,1);
    setEdu(list);
  }


  //this is for location
  const [inputAddress,setInputAddress]=useState("");
  const [city, setCity] = useState({
    data : "Click for Location",
    loading:true
  })

  const handleInputChange=()=>{



    const options2 = {
      method: 'GET',
      url: 'https://us1.locationiq.com/v1/search.php?key=pk.2c62dcd847cb0e8ccfceed5c813677a3&q='+inputAddress+'&format=json',

    };

     axios.request(options2).then(function (response) {
      setLat(response.data[0].lat)
      setLong(response.data[0].lon)


    }).catch(function (error) {
      console.error(error);
    });
  }

  // The element to be shown in the modal window
const [demo,setDemo] = useState(false);
const [onl,setOnline] = useState(false);
const [off,setOffline] = useState(true);
  const handleDemo = (event) => {
      const cal=demo;
    setDemo(!cal);
  }
  const handleOnl = (event) => {
      const cal=onl;
    setOnline(!cal);
  }
  const handleOff = (event) => {
      const cal=off;
    setOffline(!cal);
  }


  const handleSubmit=()=>{

setDisplayModel(true);
//     inputList.map((obj)=>{

//       const fd = new FormData();
// fd.append('photo',picture);

      // const options = {

      //   name: detail.fname.toString()+detail.lname.toString(),
      //   photo: fd,
      //   latitude:parseFloat(lat),
      //   longitude:parseFloat(long),
      //   contact:detail.phoneno.toString(),
      //   email:detail.email.toString(),
      //   subjects:obj.subject.toString(),
      //   classes:obj.class.toString(),
      //   about_me:detail.me.toString(),
      //   experience:detail.exp.toString(),


      // };
      // fd.append('name',detail.fname.toString()+detail.lname.toString());
      // fd.append('latitude',parseFloat(lat));
      // fd.append('longitude',parseFloat(long));
      // fd.append('contact',detail.phoneno.toString());
      // fd.append('email',detail.email.toString());
      // fd.append('subjects',obj.subject.toString());
      // fd.append('classes',obj.class.toString());
      // fd.append('about_me',detail.me.toString());
      // fd.append('experience',detail.exp.toString());








      // axios.post("http://127.0.0.1:8000/register_tutor/",fd,{headers: {
      //   "Content-Type": "multipart/form-data"
      // }}).then(function (response) {


      //   if(response.data.message==='success')
      //   {
      //     alert("Registered");
      //   }

      // }).catch(function (error) {
      //   alert(error);
      //   console.error(error);
      // });
      // });


  }
const [displayModel,setDisplayModel]=useState(false);

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { subject: "", class: "" }]);
  };
  const handleAddEdu=()=>{
    setEdu([...edu,{degree:"",school:"",passing_year:""}]);
  }
  const [lat,setLat]=useState("");
  const [long,setLong]=useState("");
  var successHandler = function(position) {

    setLat (position.coords.latitude);
    setLong (position.coords.longitude);

    const options = {
      method: 'GET',
      url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse',
      params: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        'accept-language': 'en',
        polygon_threshold: '0.0'
      },
      headers: {
        'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
        'x-rapidapi-key': '9a2be66f9amsh1f3aa48f360a496p197215jsn3210fc010dbe'
      }

    };

    axios.request(options).then(function (response) {
      setCity
      ({
        data:response.data.address.county,
        loading:false
      })
      setShowLoading(false);
    }).catch(function (error) {
      console.error(error);
    });
    };
    var errorHandler = function (errorObj) {
      alert("Please enable location services or enter your city!");


      };

  const [picture, setPicture] = useState(null);
  const handleHomeTutor=()=>{
    const cal=homeTutor;
    setHomeTutor(!cal);

  }

// if(displayModel===true)
//  {return (
//   <CustomExample />
//  )}
//  else{
  useConstructor(()=>{
    navigator.geolocation.getCurrentPosition( successHandler,errorHandler,{enableHighAccuracy: true, maximumAge: 10000});
  })
  return (

      <div className="Contain">
    <form className="container-fluid" onSubmit={handleSubmit}>

        <center><h3>Teacher Registration</h3></center>
        <br />
        <div className="row">
          <div className="form-group col-md-5 offset-2">
              <label>First name</label>

              <input type="text" Value={detail.fname} name="fname" onChange={handleChange} className="form-control" placeholder="First name" />
            </div>

            <div className="form-group col-md-5">
              <label>Last name</label>

              <input type="text" Value={detail.lname}  name="lname" onChange={handleChange} className="form-control" placeholder="Last name" />
            </div>

            <div className="col-md-2 form-group">
            <label>Upload Pic</label>
            <input type="file"  name="picture" onChange={(e) => setPicture(e.target.files[0])}  />
            </div>

        </div>

        <div className="row">
          <div className="form-group col-md-5 offset-md-1">
            <label>Email</label>

            <input type="email" Value={detail.email}  name="email"  onChange={handleChange} className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group col-md-5">
              <label>Contact</label>

              <input type="text" Value={detail.phoneno} name="phoneno" onBlur={Checkphone} onChange={handleChange} className="form-control" placeholder="Contact No." />
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 form-group">
            <label>About Me </label>

            <textarea Value={detail.me} onChange={handleChange}  name="me" className="form-control" rows="2" />
            </div>

            <div className="col-md-5 form-group">
              <label>Experience </label>

              <textarea Value={detail.exp} onChange={handleChange} name="exp" className="form-control" rows="2" />
              </div>

        </div>

        <div className="row">
        <div className="form-group col-md-5">
        
                  <input type="text" className="city form-control" placeholder={city.data} value={inputAddress} onBlur={handleInputChange} onChange={(e)=>{

                    setInputAddress(e.target.value);
                  }} />



           
 </div>
  <div className="col-md-5 form-group">
    <div className="row" style={{height:"55px"}}>
          <div className="col-md-5 form-group" style={{marginTop:"-14px"}}>
          <div style={{float:'left',marginLeft:"-10px",marginTop:'0px'}}>
    <a  className="btn" onClick={()=>{
      setShowLoading(true);
      navigator.geolocation.getCurrentPosition( successHandler,errorHandler,{enableHighAccuracy: true, maximumAge: 10000});

    }
      } >




  <span><i class="fas fa-map-marker-alt" style={{color:"crimson",fontSize:"25px"}}></i></span>
    </a>
   </div>
          <div style={{marginLeft:"5px",float:"left"}}>       
            {(showLoading)?(
              <img src={image} alt="loading" style={{height:"55px",width:"50px",marginTop:"-8px"}}/>):null
            }
         </div>
         </div>
    </div>
  </div>
 </div>
 <div className="row" style={{marginTop:"-30px"}}>
   <div className="col-md-12">
     <div className="row">
            <div className="col-md-6">
            <font style={{fontSize:'16px'}}>Do you Provide Demo Classes? </font> 
            <small>
 <Switch
         checked={demo}
         onChange={handleDemo}
         name="checkedA"
         color="primary"
         inputProps={{ 'aria-label': 'secondary checkbox' }}
       />
</small>
            </div>
     
            <div className="col-md-6">
            <font style={{fontSize:'16px'}}>Will you teach Offline?  </font> 
            <small>
            <Switch
        checked={off}
        onChange={handleOff}
        name="checkedC"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
</small>
            </div>
     </div>
     <div className="row">
            <div className="col-md-6">
            
<font style={{fontSize:'16px'}}>Will you also be a Home Tutor?</font> 
            <small>
            <Switch
      checked={homeTutor}
      onChange={handleHomeTutor}
      name="checkedD"
      color="primary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
</small>
            </div>
     
            <div className="col-md-6">
            <font style={{fontSize:'16px'}}>Will you teach Online? </font> 
            <small>
            <Switch
      checked={onl}
      onChange={handleOnl}
      name="checkedB"
      color="primary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
</small>
            </div>
     </div>
   </div>
 </div>
 <h3>Educaton</h3>
 {edu.map((ele,i)=>
 {
  
   return(

     <div className="box teacher-box drop">
    <div className="row">
    <div className="col-md-8">
      <div className="row">
          <div className="col-md-6 form-group">
            <label for="">School</label>
            <input type="text" className="form-control"  value={ele.school} onChange={(e)=>{
              const list=[...edu];
              list[i].school=e.target.value;
              setEdu(list);
      }} />
          </div>
      </div>

      <div className="row">
    <div className="col-md-6 form-group">
      <label for="">Degree</label>
      <input type="text" className="form-control" value={ele.degree} onChange={(e)=>{
        const list=[...edu];
        list[i].degree=e.target.value;
        setEdu(list);
      }} />
    </div>

    <div className="col-md-3">
      <label for="">Passing Year</label>
      <input type="text" className="form-control"  value={ele.passing_year} onChange={(e)=>{
        const list=[...edu];
        list[i].passing_year=e.target.value;
        setEdu(list);
      }}/>
    </div>
  </div>


      
    </div>
    
    <div className="col-md-4" style={{marginLeft:"-9px"}}>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>

      <div className="row">
        <div className="col-md-6"></div>
      <div className="btn-box col-md-5">

{edu.length !== 1 && edu.length === i+1 && <button style={{background:'#f4f4f5'}}
  className="mr10 btn"
  onClick={() => {handleEduRemove(i)}}><span><i class="fas fa-trash" style={{color:"crimson" ,fontSize:"25px"}}></i></span></button>}
{edu.length - 1 === i && <button style={{background:'#f4f4f5',marginLeft:'5px'}} className="btn" onClick={handleAddEdu}><span><i class="fas fa-plus" style={{fontSize:"25px"}}></i></span></button>}
</div>
      </div>
    </div>
    

  </div>
  
</div>

   )
 })}

        <h3> Add Subjects </h3>
        {inputList.map((x, i) => {
              return (
                <div className="box teacher-box drop">
                <div className="container-fluid">
                  <div className="row">

                <div style={{float:"left"}} className="col-md-5">  <SelectSearch className= "select-search ss col-sm-3 col-md-12" options={classes} name="class"  name="language" onChange={(e)=>{
                     const list = [...inputList];

                     list[i].class = e;
                     setInputList(list);
                }} placeholder="Choose your class"   />
                </div>
                <div style={{float:"left"}} className="col-md-5">
                  <SelectSearch
                  name="subject"
        className="select-search ss col-sm-3 col-md-12"
        closeOnSelect={false}
        printOptions="on-focus"
        multiple
        search={true}

        filterOptions={fuzzySearch}
        placeholder="Select your subject(s)"

        onChange = {(e)=>{
          const list = [...inputList];

          list[i].subject = e;
          setInputList(list);
        }}
        options={subjects}
    /></div>
                  <div className="btn-box col-md-2" style={{marginLeft:"0px"}}>

                    {inputList.length !== 1 && inputList.length === i+1 && <button style={{background:'#f4f4f5'}}
                      className="mr10 btn"
                      onClick={() => {handleRemoveClick(i)}}><span><i class="fas fa-trash" style={{color:"crimson" ,fontSize:"25px"}}></i></span></button>}
                    {inputList.length - 1 === i && <button style={{background:'#f4f4f5',marginLeft:'5px'}} className="btn" onClick={handleAddClick}><span><i class="fas fa-plus" style={{fontSize:"25px"}}></i></span></button>}
                  </div>
                </div>
                </div>
                </div>
              );
             })}




    </form>

<center>
    <Link className="btn btn-custom " style={{marginBottom:"10px"}} to={{pathname:"/otpVerify",

      detail:detail,
      inputList:inputList,
      lat:lat,
      long:long,
      picture:picture,
      online:onl,
      offline:off,
      demo:demo,
      hometutor:homeTutor,
      education_history:edu


    }} onClick={()=>{
      const data = {
        'phone_no' : detail.phoneno,
        'email':detail.email,
      }
      axios.post("http://127.0.0.1:8000/auth/otp/",data).then(function (response) {


        // if(response.data.message==='success')
        // {
        //   alert("otp sent");
        // }

      }).catch(function (error) {
        alert(error);
        console.error(error);
      });

    }}>
            Register

              </Link>


              </center>
    </div>





);

            }



// }