import { Container } from '@mui/system'
import React from 'react'
import FormSteps from './FormSteps';

const Home = () => {
  return (
<>
<Container fixed sx={{paddingTop:'50px'}}>
    <FormSteps/>
</Container>
</>
  )
}

export default Home;