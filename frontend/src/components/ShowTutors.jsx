import {Card} from "./Card";
import React,{useEffect,useState} from "react";
import axios from "axios";
import { NavigationTutor } from "./navigation_tutor";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link , useParams} from "react-router-dom";
import { Container,Row,Col,Nav } from "react-bootstrap";



const useConstructor=(callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  };

export const ShowTutors=(props)=>{
  let {classes,subjects,lati,longi} = useParams();

    const [value, setValue] =  React.useState([2,10]);
    const [demo,setDemo]=React.useState(false);
    const [state, setState] = React.useState(false);
    const [online, setOnline] = React.useState(false);
    const [km,setKm]=React.useState(2);
  const [lat,setLat]=useState("");
  const [long,setLong]=useState("");
    const [detail,setDetail]=useState([]);
    
    useConstructor(async() => {
      


     
        const options={
          km:"2".toString(),
          latitude:parseFloat(lati),
          longitude:parseFloat(longi),
          classes:classes,
          subjects:subjects,
          gives_demo:demo.toString(),
          teaches_online:online.toString(),
          home_tutor:state.toString(),
        }
       axios.post("http://127.0.0.1:8000/find_tutor/",options).then(function (response) {

          if(response.data.message!=="failure")
          {
          setDetail(response.data.data);
         

          }



        }).catch(function (error) {
          alert(error);
          console.error(error);
        });

        
        

     
       });

      const rangeSelector = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
      };
      const rangeDist = (event,newDist)=>{
          setKm(newDist);
          console.log(newDist);
      }
      const handleClick=()=>{
        const options={
            km:km.toString(),
            latitude:parseFloat(lati),
          longitude:parseFloat(longi),
          classes:classes,
          subjects:subjects,
          gives_demo:demo.toString(),
          teaches_online:online.toString(),
          home_tutor:state.toString(),


          };
        axios.post("http://127.0.0.1:8000/find_tutor/",options).then(function (response) {

            if(response.data.message!=="failure")
            {
            setDetail(response.data.data);

            }
            else{
                alert(response.data.message);
            }

          }).catch(function (error) {
            alert(error);
            console.error(error);
          });

      }
      const handleChange = (event) => {
          const cal=state;
        setState(!cal);

      };
      const handleDemo=()=>{
          const cal=demo;
          setDemo(!cal);
      }
      const handleOnline = (event) => {
        const cal=online;
        if(cal)
        {
            setOnline(!cal);
            return;
        }

      confirmAlert({
        title: 'Enabling this will disable the location filter',
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                setOnline(!cal);
            }
          },
          {
            label: 'No',
            onClick: () =>{

            }
          }
        ]
      })

    };
    const onReset=()=>{
        setKm(2);
        setOnline(false);
        const options={
            km:"2".toString(),
            latitude:parseFloat(lati),
          longitude:parseFloat(longi),
          classes:classes,
          subjects:subjects,
          gives_demo:demo.toString(),
          teaches_online:online.toString(),
          home_tutor:state.toString(),
          }
        axios.post("http://127.0.0.1:8000/find_tutor/",options).then(function (response) {

            // response.data=JSON.stringify(response.data)
            // alert(response.data);
            if(response.data.message!=="failure")
            {
            setDetail(response.data.data);
            }
            else{
                alert(response.data.message);
            }



          // alert(response.data.8528608198.name);
          }).catch(function (error) {
            alert(error);
            console.error(error);
          });



    }




    return (

   

      <Container fluid="md sm" style={{marginTop:"100px"}}>
        <div className="row">
          <div className="col">
          <NavigationTutor />
          </div>
        </div>
      
    
        <Row>
            <Col md={3} sm={12} className="conti">
                  <div className="row">
                    <div className="col-md-5">
                        <small style={{fontSize:"25px",fontWeight:"bolder",color:"black"}}><strong>Filters</strong></small>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-4">
                    <button style={{padding:"5px",border:"0px",borderRadius:"5px 5px 5px 5px",backgroundColor: "#4d5dfb",backgroundImage: "linear-gradient(315deg, #4d5dfb 0%, #08c8f6 74%)",color:"white"}} onClick={onReset}><i className="fas fa-trash-restore" style={{color:"white"}}></i>  Reset</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <span style={{color:"black",fontWeight:"bold",fontSize:"17px",fontFamily:"sans-serif"}}>Price Range</span>
                        <Typography id="range-slider" gutterBottom>
        Select Price Range:
      </Typography>
      <Slider
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
      />
      Your range of Price is between {value[0]} /- and {value[1]} /-

                    </div>


                </div>

                <div className="row">
                <div className="col-md-8">
                <span style={{color:"black",fontWeight:"bold",fontSize:"17px",fontFamily:"sans-serif"}}>Proximity Radius</span>
                <Typography id="discrete-slider-small-steps" gutterBottom>
        Select Proximity Radius:
</Typography>
<Slider
  defaultValue={2}

  step={1}
  min={1}
  max={15}
  onChange={rangeDist}
  value={km}
  valueLabelDisplay="auto"
  disabled={online}
/>
Your range of Proximity Radius is between 1KM and 15KM.
              </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                    <h4>Home Tutor</h4>
                    <Switch
        checked={state}
        onChange={handleChange}
        name="checkedA"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                    <h4>Online</h4>
                    <Switch
        checked={online}
        onChange={handleOnline}
        name="checkedA"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                    <h4>Demo</h4>
                    <Switch
        checked={demo}
        onChange={handleDemo}
        name="checkedA"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
                    </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <center>
                    <button  className="btn btn-custom" style={{marginBottom:"10px"}} onClick={handleClick}>
                      Apply Filters
                    </button>
                    </center>
                  </div>
                </div>
            </Col>
            <Col md={8} sm={12}>
              
              <div className="row" style={{marginLeft:"20px"}}>
            {
           detail.length==0?<h1>You should try increasing Proximity Radius.</h1>:
             detail.map((det,i)=>
             {
                 return (
                         <Link style ={{color:"black"}}to={{pathname:"/TutorInfo/"+detail[i].id,

                         detail:detail[i]

                     }}>
                     <Card name={det.name} me={det.about_me} img={det.photo} subjects={det.subjects} rating={det.rating} demo={det.gives_demo} online={det.teaches_online} home={det.home_tutor} />
                     </Link>

                 )

             })
         }
          </div>
          
            </Col>
            </Row>
      </Container>

    );


}
