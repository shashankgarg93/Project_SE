import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { RegisterTeacher } from "./components/teacher_form";
import {ShowTutors} from "./components/ShowTutors";
import {TutorInfo} from "./components/TutorInfo";
import {Success} from "./components/Success";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { NavigationTutor } from "./components/navigation_tutor";
import { Otp } from "./components/Otp";
import {Card} from "./components/Card";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
       
      <Switch>
        <Route path="/ShowTutors/:classes/:subjects/:lati/:longi" component={ShowTutors} >
         
          </Route>
          <Route path="/TutorInfo/:id" component={TutorInfo}></Route>
      <Route path="/otpVerify" component={Otp} />
     
         
         
     
         
      
          <Route path="/teacher_form">
            <NavigationTutor/>
            <div style={{position:"relative",marginTop:"100px"}}>
            <RegisterTeacher/>

            </div>
            </Route>
          <Route path="">
          <Navigation />

      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
      
          </Route>
         

        </Switch>
     
    

    </Router>
   
  );
};

export default App;
