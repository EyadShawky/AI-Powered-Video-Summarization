import React from 'react';
import Lottie from 'lottie-react';
import '../styles/Home.scss';
import logo from '../imgs/Logos/mainlogo.png';
import videoAnimation from '../lottie/video.json';
import landingAnimation from '../lottie/Landing.json';
const Home = () => {
  return (
    <div className='homme'>
      <div className="container ">
      <div className="row">
        <div className="col-md-6 main-home-style">
          <div>
            <img className="mb-3 d-none d-md-block" src={logo} alt="clipify logo" width={300} />
            <div className="text-landing-home">
              <h1 className="d-flex">
                Welcome to the next <br /> level off the future{' '}
                <Lottie animationData={videoAnimation} className="lottie" />
              </h1>
              <p>
                here is the next level of the future and saving time by passing your video to the model and our model
                will save your time by a summarized one of the original video
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <Lottie animationData={landingAnimation} className="lotti-home" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
