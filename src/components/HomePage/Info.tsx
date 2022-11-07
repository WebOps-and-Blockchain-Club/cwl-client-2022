import { useContext } from 'react'
import Language from '../../utils/lang'
import { Card, CardContent, Typography, Grid, Box } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import '../../styles/frontpage.css'
const useStyles = makeStyles(() => ({
  card: {
    margin: '10px',
  },
  header: {
    backgroundColor: 'rgb(14, 126, 237)',
    borderRadius: '16px',
    padding: '16px',
    fontColor: '#fff',
  },
}))
const Info = () => {
  const { checked } = useContext(Language)
  const classes = useStyles()
  return (
    <Grid container justifyContent='center'>
      <Grid item lg={6}>
        <Card className={classes.card} elevation={5}>
          <CardContent>
            <Grid className={classes.header}>
              {checked ? (
                <Typography variant='h5' className='question'>
                  Who we are ?
                </Typography>
              ) : (
                <Typography variant='h5' className='question'>
                  நாங்கள் யார் ?
                </Typography>
              )}
            </Grid>
            <Grid>
              {checked ? (
                <Typography className='answers'>
                  This platform enables users / public to report details such as flood location and
                  water depth, as well as add photos of flood sites with a description across the
                  Chennai region as frequently as possible. All reports are gathered onto a
                  real-time flood map. The data gathered through this platform aims to improve
                  disaster preparedness and response in communities by gathering, sorting, and
                  presenting data of flooding reports.
                </Typography>
              ) : (
                <Typography className='answers'>
                  வெள்ளத்தின் இருப்பிடம் மற்றும் நீரின் ஆழம் போன்ற விவரங்களைப் பயனர்கள்/பொதுமக்கள்
                  தெரிவிக்க இந்த தளம் உதவுகிறது, மேலும் சென்னை மண்டலம் முழுவதும் வெள்ளம் ஏற்பட்ட
                  இடங்களின் புகைப்படங்களை விவரத்துடன் சேர்க்க உதவுகிறது.
                </Typography>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6}>
        <Card className={classes.card} elevation={5}>
          <CardContent>
            <Grid className={classes.header}>
              {checked ? (
                <Typography variant='h5' className='question'>
                  What we do ?
                </Typography>
              ) : (
                <Typography variant='h5' className='question'>
                  நாம் என்ன செய்கிறோம் ?
                </Typography>
              )}
            </Grid>
            <Grid>
              {checked ? (
                <Typography className='answers'>
                  This Crowd source data, curated through this platform will help to understand the
                  reasons for waterlogging / inundation and help IIT Madras researchers to develop /
                  design remedial measures that may be recommended to GCC, PWD and other relevant
                  Govt. departments for their action.
                </Typography>
              ) : (
                <Typography className='answers'>
                  இந்தத் தளத்தின் மூலம் சேகரிக்கப்பட்ட இந்த தகவல்கள், நீர் தேங்குதல்/ வெள்ளம்
                  ஆகியவற்றுக்கான காரணங்களைப் புரிந்துகொள்ளவும், GCC, PWD மற்றும் பிற
                  தொடர்புடையவற்றுக்குப் பரிந்துரைத்து தீர்வு நடவடிக்கைகளை உருவாக்க/வடிவமைக்க
                  உதவுகிறது
                </Typography>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* <Grid item>
        <Box
          sx={{
            border: 0.1,
            height: 'auto',
            borderRadius: 2,
            width: '320px',
            background: 'red',
            padding: '10px',
            fontSize: '20px',
          }}
        >
          <span className='red'>
            {checked
              ? 'The data collected would be used only for analysis purpose, and no compliant is raised or addressed'
              : 'Hi'}
          </span>
        </Box>
      </Grid> */}
    </Grid>
  )
}
export default Info
