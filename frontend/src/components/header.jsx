import SelectSearch from 'react-select-search';
import fuzzySearch from '../extra functions/fuzzySearch';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import image from './Spinner-1s-200px.gif';
import {Col} from "react-bootstrap";
const useConstructor=(callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

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
const countries = [


  // {
  //     type: 'group',
  //     name: 'Group name',
  //     items: [
  //         {name: 'Spanish', value: 'es'},
  //     ]
  // },
];
export const Header = (props) => {
  const [showLoading,setShowLoading]=useState(false);

  const [class_selected, setClass_selected] = useState('');
  const [city, setCity] = useState({
    data : "Enter/Click for locatione",
    loading:true
  })
  const[sub_selected, setSub_selected] = useState('');
   const handleChangeClass = function(e) {
    setClass_selected(e);
    //alert(class_selected);
  }
  
  const handleChangeSubject = function(e) {
    setSub_selected(e);
    //alert(sub_selected);
  }
  const [lat,setLat]=useState("");
  const [long,setLong]=useState("");
  const [detail,setDetail] =useState({name:"",contact:"",email:"",lat:"",long:"",class:"",subjects:"",me:"",exp:"",photo:""}) ;
  // const [detail,setDetail] =useState(null) ;

  var successHandler = function(position) {

    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    const options = {
      method: 'GET',
      url: 'https://us1.locationiq.com/v1/reverse.php?key='+'pk.2c62dcd847cb0e8ccfceed5c813677a3'+'&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&format=json',
      // params: {
      //   lat: position.coords.latitude,
      //   lon: position.coords.longitude,
      //   'accept-language': 'en',
      //   polygon_threshold: '0.0'
      // },
      // headers: {
      //   'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
      //   'x-rapidapi-key': '9a2be66f9amsh1f3aa48f360a496p197215jsn3210fc010dbe'
      // }

    };

    axios.request(options).then(function (response) {
      setShowLoading(false);
      setInputAddress(response.data.display_name)
    }).catch(function (error) {
      console.error(error);
    });
    };
    const handleFindTutor=()=>{
      const options={
        km:"2".toString(),
        latitude:parseFloat(lat),
        longitude:parseFloat(long),
        classes:class_selected.toString(),
        subjects:sub_selected.toString(),
      }
      

    }
    const [inputAddress,setInputAddress]=useState("");
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
    useConstructor(()=>{
      navigator.geolocation.getCurrentPosition( successHandler,errorHandler,{enableHighAccuracy: true, maximumAge: 10000});
    })
    
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
              </div>
            </div>

            <div className="row">
            <Col md={1} sm={2}>
                  {/* <div style={{float:"left",marginLeft:"110px",marginTop:'-5px',position:"absolute"}}> */}
   {(showLoading)?(
     <img src={image} alt="loading" style={{height:"45px",width:"45px",float:"right",marginTop:"0px"}}/>):null
   }
   </Col>
   <Col md={1} sm={2}>
                  {/* <div style={{float:'left',marginLeft:"160px",marginTop:'-2px'}}> */}
            <a  className="btn" onClick={()=>{
                  setShowLoading(true);
              navigator.geolocation.getCurrentPosition( successHandler,errorHandler,{enableHighAccuracy: true, maximumAge: 10000});

            }
              } >




<span><i class="fas fa-map-marker-alt" style={{color:"crimson",fontSize:"25px",marginBottom:"10px"}}></i></span>
            </a>
           {/* </div> */}
           </Col>

           <Col md={3} sm={7} style={{}}>
                  {/* <div style={{float:'left'}} > */}
                  <input type="text" className="city header_input" placeholder={city.data} value={inputAddress} onBlur={handleInputChange} onChange={(e)=>{

                    setInputAddress(e.target.value);
                  }} />



           {/* </div> */}
            </Col>

            <Col md={3} sm={12} style={{}}>
           {/* <div style={{float:'left',marginLeft:"10px"}} > */}
                    <SelectSearch className= "select-search header_input" options={classes} value="sv" name="language" placeholder="Choose your class" onChange={handleChangeClass} />
                   </Col>
                    {/* </div> */}
                  {/* <div style={{float:'left',marginLeft:"10px"}} > */}
                  <Col md={3} sm={12}  style={{marginBottom:"5px"}}>
                  <SelectSearch
                  className= "select-search header_input"
        closeOnSelect={false}
        printOptions="on-focus"
        multiple
        search={true}
        filterOptions={fuzzySearch}
        placeholder="Select your subject(s)"
        options={subjects}
        onChange = {handleChangeSubject}
    />
                  {/* </div> */}
                  </Col>
            </div>

            <div className="row">
                <div className="col-md-2 col-md-offset-5 col-xs-offset-4">
                <Link  className="btn btn-custom " style={{marginTop:"5px",marginBottom:"10px"}} to={{pathname:"/ShowTutors/"+class_selected+"/"+sub_selected+"/"+lat+"/"+long,lat:lat,long:long,class_selected:class_selected,sub_selected:sub_selected}} >

Find Tutors
            </Link>
                </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}

var errorHandler = function (errorObj) {
  alert("Please enable location services or enter your city!");


  };
