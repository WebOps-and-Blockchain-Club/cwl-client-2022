import React, { useState } from 'react';
import { Paper, Grid, Typography, Button } from '@mui/material';
// import WizardHeader from './wizardHeader';
// import RadioMasters from './radioMasters';
// import SelectService from './selectService';
import ComplaintType from './complaintType';
import PersonDetails from './personDetails';
// import '../../styles/cp_style.css';

const Content = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const tabs = ['PersonDetail', 'Address', 'ComplaintType', 'ComplaintDetails'];

  const pageDisplay =() =>{
    if(activeStep === 0){
      return <PersonDetails/>
    }
    else if(activeStep === 1){
      return <ComplaintType/>
    }

  }
  

  return (
    // <Paper elevation={1} className='content'>
      // {/* <Typography
      //   variant='h4'
      //   gutterBottom
      //   color='primary'
      //   style={{ padding: '0 8px' }}
      // >
      //   Complaint Portal
      // </Typography>
      // <Typography gutterBottom>
      //   This information will be directed to government authority.
      // </Typography> */}
      // {/* <WizardHeader
      //   tabs={tabs}
      //   activeStep={activeStep}
      //   formSubmitted={formSubmitted}
      // /> */}
      <Paper elevation={10} className='content center'>

      <h1>{tabs[activeStep]}</h1>

      {/* // <form onSubmit={handleSubmit}>
      //   <SwipeableViews>
      //     <RadioMasters />
      //     <SelectService />
      //     <SelectDateDaypart />
      //     <ComplaintType/>
      //     <PersonDetails formSubmitted={formSubmitted} />
      //     <PersonDetails />
      //   </SwipeableViews>
      //   <div>{pageDisplay()}</div> */}

      {/* //   <Grid container justify='space-between' style={{ padding: '16px 16px' }} > */}
        {/* <Grid container style={{ padding: '16px 16px' }} > */}
          {/* <Grid item> */}
            <Button
              disabled={activeStep === 0 || formSubmitted}
              onClick={handlePrev}
              variant='contained'
              className= 'prevBtn'
            >
              Back
            </Button>
          {/* </Grid> */}
          {/* {activeStep < tabs.length - 1 ? (
            <Grid item>
              <Button
                color='primary'
                className='navigation'
                variant='contained'
                onClick={handleNext}
                disabled={formSubmitted}
              >
                Next
              </Button>
            </Grid>
          ) */}
          {/* // {activeStep === tabs.length - 1 && 
           : (
            <Grid item>
              <Button
                type='submit'
                color='primary'
                className='navigation'
                variant='contained'
                disabled={formSubmitted}
              >
                Submit
              </Button>
            </Grid>
          )} */}
         {/* </Grid> */}
      
      {/* // // </form> */}
 </Paper>
   );
};
export default Content;
