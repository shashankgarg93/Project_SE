import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import image from "./new2.png";
import { useState } from 'react';
import {Col,Row,Container} from "react-bootstrap";
export const Card=(props)=>
{
 
    const demo = props.demo ? <li><Col className="tags" md={2} sm={4}><div><i className="fas fa-id-card"></i><small style={{marginLeft: "20px",fontSize: "17px"}}>Demo</small></div></Col></li>:"";
    const online = props.online ? <li><Col className="tags" md={2} sm={4} style={{width:"105px"}}><div><i className="fas fa-laptop"></i><small style={{marginLeft: "20px",fontSize: "17px"}}>Online</small></div></Col></li>:"";
    const home = props.home ? <li><Col className="tags" md={2} sm={4} style={{width:"150px"}}><div><i className="fas fa-home"></i><small style={{marginLeft: "20px",fontSize: "17px"}}>Home Tutor</small></div></Col></li>:"";
    
  const path="http://127.0.0.1:8000"+ props.img;
    return (
            
      <div className="tutorCard" style={{marginBottom:"20px"}}>
        <div className="row g-0">
          <div className="col-md-3 col-sm-3">      
              <img src={path}  className="img-fluid rounded-start" style={{marginTop:"15%",height:"165px",width:"155px",borderRadius:'10px 10px 10px 10px'}} alt="..." />    
          </div>

          <div className="col-md-9">
            <Container fluid="sm">
            <Row>
              <Col md={8} sm={2}>
                  <span style={{fontWeight:'bolder',fontSize:'20px'}}>{props.name}</span> <br />
                  ({props.subjects})
                  <hr style={{marginLeft:"0px",marginTop:"7px",marginBottom:"-5px"}}  />

              </Col>    

              <Col md={1} sm={10}>
                  <span>
                  <Box component="fieldset" mt={1} borderColor="transparent">
                  {props.rating == "0"?<img src ={image} style={{height:"40px", width:"65px"}}/>:<Rating name="read-only" value={props.rating} readOnly />}
                  </Box>
                  </span>
              </Col>
            </Row>
            </Container>

            <div className="row">
              <div className="col-md-12">
                <small className="text-muted" style={{textAlign:'justify'}}>{props.me}</small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
              <ul>
                {demo}
                {online}
                {home}
              </ul>
              </div>
            </div>





          </div>

        </div>
      </div>

    );
}
