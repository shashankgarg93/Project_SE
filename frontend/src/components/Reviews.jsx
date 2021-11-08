
import React,{useEffect, useState} from "react";
import { Divider, Avatar, Grid, Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import PersonIcon from '@material-ui/icons/Person';

const useConstructor=(callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

const labels = {

  1: 'Useless+',

  2: 'Poor+',

  3: 'Ok+',

  4: 'Good',

  5: 'Excellent+',
};



export const Reviews=(props)=>
{
  const [review,setReview]=useState("");
  const [name,setName]=useState("");
  const [detail,setDetail]=useState([]);
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  
  const classes = useStyles();
  useConstructor(()=>{
    const options={
      phone_no:props.phone_no.toString(),
    }

    axios.post("http://127.0.0.1:8000/get_reviews/",options).then(function (response) {

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
   


  });
  const handleName=(e)=>{
    setName(e.target.value);
  }
  const handleReview=(e)=>{
    setReview(e.target.value);
  }
  useEffect(()=>{
    const options={
      phone_no:props.phone_no,
    }

    axios.post("http://127.0.0.1:8000/get_reviews/",options).then(function (response) {


      if(response.data.message!=="failure")
      {
      setDetail(response.data.message);

      }
    }).catch(function (error) {
      alert(error);
      console.error(error);
    });

  })
 function handleClick(){

    const options={
      phone_no:props.phone_no.toString(),
      review_by:name.toString(),
      review:review.toString(),
      rating:value,
    }

     axios.post("http://127.0.0.1:8000/post_rating/",options).then(function (response) {

      if(response.data.message==="sucess")
      {
      }
      else
      {
        alert(response.data.message);
      }

    }).catch(function (error) {
      alert(error);
      console.error(error);
    });


    
    setName("");
    setReview("");
  }
  async function getData(){

    

  }

    const imgLink =
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

      return (
        <div>
        <div style={{ padding: "3%",width:"70%",marginLeft:"10%"}} >
        <h3>Comments</h3>
          <div className="CH">
          <h4>Add your own review</h4>


            <div className="row">
                <div className="col-md-4 form-group">
                    <label>Name</label>
                    <input Type="text" name="revName" className="form-control" placeholder="Yzour Name" onChange={handleName} value={name}/>
                </div>


                <ReactStars
    count={5}
    value={value}
    onChange={(newValue)=>{
      setValue(newValue);

    }}
    size={35}
    activeColor="#ffd700"
  />

            </div>
            <div className="row">
                <div className="col-md-12 form-group">
                    <label>Review</label>
                    <textarea rows="2" cols="6" name="revReview" value={review} className="form-control" placeholder="Your Review" onChange={handleReview} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-11 form-group">
                </div>
                <div className="col-md-1 form-group">
                    <button className="btn-custom" style={{marginLeft:"-25px"}} onClick={handleClick}>
                        post
                    </button>
                </div>
            </div>
          </div>
          </div>
          <div>
        {

          detail.map((det)=>{

            return (
              
              <div style={{ padding: "40px 20px", marginLeft:"10%"}}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <PersonIcon style={{height:"30px",width:"35px"}} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 2, textAlign: "left" }}>{det.review_by}</h4>
                <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={det.rating} readOnly />
      </Box>
                <p style={{ textAlign: "left" }}>
                  {det.review}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                 Posted on {det.date_posted}
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ marginLeft: "20%",width:"60%" }}  />
            </div>
            );

          })

        }

        </div>
        </div>
      );




}
