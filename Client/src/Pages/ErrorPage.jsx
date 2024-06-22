import React from 'react'
import '../styles/error.scss'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import error from '../lottie/error page.json'
import Lottie from 'lottie-react';

const ErrorPage = () => {
  return (
    <> 
   <div className='container '>
   <div>
   <Lottie animationData={error} className='lotti-error' />
    <Link to={'/'}> <Button className='error-button' type="primary">Back Home</Button> </Link>
   </div>
   </div>
    </>
    
  )
}

export default ErrorPage
