import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { withStyles, FormControlLabel, Grid, Switch } from '@mui/material';
import '../../styles/cp_style.css'


const ComplaintType = () => {
   
 const complaint=[{'asd', 'asdac', 'asdc']
const ComplaintType = (complaint) => {
   const [serviceSelected, setServiceSelected] = useState(getInitialState())};
  const handleChange = (name) => (e) => {
    const selected = { ...serviceSelected, [name]: e.target.checked };
    setServiceSelected(selected);
  };

//   const textSelected = Object.keys(serviceSelected)
//     .filter((key) => serviceSelected[key])
//     .join(', ');

  return ( 
    <Grid
      container
      className='complaintType'
      justify='center'
      alignItems='center'
      spacing={0}
    >
      
        <Grid
          item
          // key={complaint[]}
          container
          justify='space-between'
          alignItems='center'
          className='row'
        >
          <p>option1</p>
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange(complaint[])}
                value={complaint[]}
                color='primary'
              />
            }
            label={complaint[]}
            checked={serviceSelected[complaint[]]}
            labelPlacement='start'
          />
        </Grid>
      
      <input
        type='text'
        value={textSelected}
        name='selected services'
        id='selected-services'
        style={{ width: 1, height: 1, opacity: 0.1 }}
        readOnly
      />
    </Grid>
  );
};

// SelectService.propTypes = {
//   classes: PropTypes.object
// };
// export default withStyles(style)(ComplaintType);
export default ComplaintType;