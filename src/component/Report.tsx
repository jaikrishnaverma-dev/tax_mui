
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { formsType } from './formsFormate';
import { CardTravel } from '@mui/icons-material';
import useQuery from './customHook/useQuery';

const bull=(text:string|number) => (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
{text}
  </Box>
);



export default function Report({forms}:{forms:formsType}) {
 const getKeyValue=useQuery()



const calculateTax=()=>{
  // {
  //   nature :'',
  //   amount:'',
  //   total:''
  //  }
 let table=[]
 table.push({Nature:'income from salary', Amount: getKeyValue(forms.Income_Details,'basic_salary')})
console.log('table=>',table)
}
calculateTax()
  const card = (
  <React.Fragment>
    <CardContent>
      {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Word of the Day</Typography> */}
      {
       forms.Income_Details.map((detail)=> <Typography variant="h5"  sx={{ mb: 1.5 }} component="div">
        <Typography color="text.secondary" sx={{display:'inline'}}>
        {detail.label} : ₹
      </Typography>
         {bull(detail.value)}
      </Typography>)
      }
        {
       forms.Deduction.map((detail)=> <Typography variant="h5"  sx={{ mb: 1.5 }} component="div">
        <Typography color="text.secondary" sx={{display:'inline'}}>
        {detail.label} : ₹
      </Typography>
         {bull(detail.value)}
      </Typography>)
      }
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">DOWNLOAD REPORT</Button>
    </CardActions>
  </React.Fragment>
);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}