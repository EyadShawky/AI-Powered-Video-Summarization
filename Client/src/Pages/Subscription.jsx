import React, { useState } from 'react';
import { Steps, message } from 'antd';
import '../styles/Register.scss';
import { Link } from 'react-router-dom';

const { Step } = Steps;

const Subscription = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e) => {
        message.success('Subscription is successful!');

    }

    
    const countries = [
        "Egypt",
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "France",
        "Japan",
        "China",
        "Brazil"
      ];

    return (
        <>
            <div className="container">
                <div className='d-flex justify-content-center text-center mt-4'>
                    <div>
                        <h4 className='header'>subscription </h4>
                    </div>
                </div>
                <Steps className='mt-4' current={currentStep}>
                    <Step title="Personal Information" />
                    <Step title="address" />
                    <Step title="Credit Card Details" />
                </Steps>



                <div className=" d-flex justify-content-center align-items-center vh-50 mt-5">
                    <div className='container'>
                        <form>
                            {currentStep === 0 && (
                                <div className='row'>
                                    {/* Step 1: Personal Information */}
                                    <div className='col-9 m-auto'>
                                        <form>
                                            <div class="row mt-5">
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="First name" />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="Last name" />
                                                </div>
                                                <div class="col-12 mt-2">
                                                    <input type="number" class="form-control" placeholder="Phone Number" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            
                            {currentStep === 1 && (
                                <div className='row'>
                                    {/* Step 3: Password */}
                                    <div className='col-9 m-auto'>
                                        <form>
                                            <div class="row mt-5">
                                                <div class="col-12">
                                                    <input type="text" class="form-control mt-2" placeholder="Street Address" />
                                                </div>
                                                <div class="col-12">
                                                    <input type="text" class="form-control mt-2" placeholder="Street Address Line 2" />
                                                </div>
                                                <div class="col-4">
                                                    <input type="text" class="form-control mt-2" placeholder="City" />
                                                </div>
                                                <div class="col-4">
                                                    <input type="text" class="form-control mt-2" placeholder="State / Province" />
                                                </div>
                                                <div class="col-4">
                                                    <input type="number" class="form-control mt-2" placeholder="Postal / Zip Code" />
                                                </div>

                                            </div>
                                        </form>                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className='row'>
                                    {/* Step 3: Password */}
                                    <div className='col-9 m-auto'>
                                        <form>
                                            <div class="row mt-5">
                                                <div class="col-6">
                                                    <input type="text" class="form-control" placeholder="First name" />
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" placeholder="Last name" />
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" class="form-control mt-2" placeholder="1234 1234 1234 1234" />
                                                </div>
                                                <div class="col-3">
                                                    <input type="text" class="form-control mt-2" placeholder="MM/YY" />
                                                </div>
                                                <div class="col-3">
                                                    <input type="number" class="form-control mt-2" placeholder="cvc" />
                                                </div>
                                                <div class="col-12">
                                                <select id="inputState" className="form-control mt-2">
                                                    {countries.map((country, index) => (
                                                        <option key={index}>{country}</option>
                                                    ))}
                                                </select>                                              </div>

                                            </div>
                                        </form>                                    </div>
                                </div>
                            )}
                            <div className="row mt-3">
                                <div className="col-12 text-center">
                                    {currentStep > 0 && (
                                        <button className=' w-75 btn-prev mb-2' onClick={handlePrev} >Previous</button>
                                    )}
                                </div>
                                <div className="col-12 text-center">
                                    {currentStep < 2 ? (
                                        <button className=' w-75 btn-next' onClick={handleNext}>Next</button>
                                    ) : (
                                        <Link to={'/model-lap'}>
                                            <button className=' w-75  btn-next' onClick={handleSubmit}>Submit</button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscription;
