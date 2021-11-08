import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

  
export const Filter = () => {
  
  // Our States
  const [value, setValue] =  React.useState([2,10]);
  const [dist,setDist]=React.useState(2);
  const [state, setState] = React.useState(false);
  const [online, setOnline] = React.useState(false);
  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
  const rangeDist = (event,newDist)=>{
      setDist(newDist);
      console.log(newDist);
  }
  const handleClick=()=>{

  }
  const handleChange = (event) => {
      const cal=state;
    setState(!cal);
    
  };
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
  
  return (
      <div className="container">
           <div style={{
     
      display: 'block',
      width: 'fit-content'
    }}>
      <h3>How to create Price Range Selector in ReactJS?</h3>
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
    
    <div style={{
     
      display: 'block',
      width: '30%'
    }}>
        <h3>Distance Radius</h3>

        <Typography id="discrete-slider-small-steps" gutterBottom>

</Typography>
<Slider
  defaultValue={2}

  step={1}
  min={1}
  max={15}
  onChange={rangeDist}
  value={dist}
  valueLabelDisplay="auto"
/>

</div>
<h3>Home Tutor</h3>
<Switch
        checked={state}
        onChange={handleChange}
        name="checkedA"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <h3>Online</h3>
 <Switch
        checked={online}
        onChange={handleOnline}
        name="checkedA"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />     
<button  className="btn btn-custom " style={{marginLeft:"100px", marginTop:"50px"}} onClick={handleClick}>
Apply Filters
            </button>
    </div>
  );
}