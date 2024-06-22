import React from 'react';
import '../styles/AboutModel.scss';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import modelAnimation from '../lottie/aboutModel.json';

const AboutModel = () => {
  return (
    <>
      <div>
        <div className='d-flex justify-content-center align-items-center text-center mt-4'>
          <div>
            <h4 className='header'>Let's have some fun</h4>
            <p className='sub-header'>Try our model and test it with your content</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className='header-model'>
              <div>
                <h2 className='body-header-content '>
                 CLIPIFY
                </h2>
                <p className='body-content mt-3'>
                  <ul>
                    <li>Clipify offers the first web-based solution for summarizing diverse video content effortlessly. Join content creators, consumers, and media professionals in experiencing the future of video consumption.</li>
                    <br />
                    <li>Discover Clipify's streamlined video summarization for tutorials, vlogs, and commercials. Save time and boost productivity with instant, easy-to-digest summaries. Try Clipify now for efficient video consumption.</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-2 mt-2 d-none d-md-block">
            <Lottie animationData={modelAnimation} className='model-lottie' />
          </div>
        </div>

        <div className='d-flex justify-content-center text-center'>
          <div>
            <Link to='/model-lap'><button className='btn-model-lap'>Try the future</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutModel;
