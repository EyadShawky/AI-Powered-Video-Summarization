import React, { useRef, useState } from 'react';
import '../styles/Register.scss';
import { Link } from 'react-router-dom';
import { Alert, Space, Spin, message } from 'antd'; // Import message component
import Marquee from 'react-fast-marquee';
import Lottie from 'lottie-react';
import registerAnimation from '../lottie/register.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    zip: '',
    img: null
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name !== 'img') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, img: e.target.files[0] });
    }
  };

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      message.error('Password does not match the confirmation');
      return false;
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;
      if (!passwordRegex.test(password)) {
        message.error('Password must be 8-30 characters long and include at least one letter, one digit, and one special character.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const passwordsMatch = validatePassword(formData.password, formData.password_confirmation);
      if (!passwordsMatch) return;

      const formDataWithFile = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFile.append(key, value);
      });
      setLoading(true);

      let response = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        body: formDataWithFile
      });
      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("Token", data.authToken);
        message.success('Registration successful');
        setTimeout(() => {
          window.location.href = '/home';
        }, 2000);
      } else {
        message.error('Registration failed');
        window.location.reload();
      }
    } catch (error) {
      message.error('Failed to register');
      window.location.reload();
      setLoading(false);
    }
  };
  return (
    <>
    <Header/>
      <div className='container'>
        <div className="row ">
          <div className="col-6">          <Lottie animationData={registerAnimation} className='lotti-register' />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                <h2>create an account.</h2>
                  <p>Welcome! Fill your data in the required fields.</p>
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="First name" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="col-12 mt-3">
                  <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="col-12 mt-3">
                  <Alert
                    type='info'
                    message={
                      <Marquee pauseOnHover={false} gradient={false}>
                        Password must be 8-30 characters long and include at least one letter, one digit, and one special character.
                      </Marquee>
                    }
                  />
                </div>
                <div className="col-6 mt-3">
                  <input type="password" className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="col-6 mt-3">
                  <input type="password" className="form-control" placeholder="Confirm password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
                </div>
                <div className="col-8 mt-3">
                  <input type="tel" className="form-control" placeholder="Phone number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                </div>
                <div className="col-4 mt-3">
                  <input type="number" className="form-control" placeholder="ZIP Code" name="zip" value={formData.zip} onChange={handleChange} />
                </div>
                <div className="col-12 mt-3">
                  <input type="file" className="form-control" name="img" onChange={handleChange} ref={inputRef} />
                </div>
                <div className="col-12 mt-3">
                  {loading ? (
                    <Spin />
                  ) : (
                    <button className='btn-log'>Get Started</button>
                  )}
                </div>
                <div className="col-12 mt-2 text-design">
                  <h5>Already have an account? <Link to='/home'><span>Login</span></Link></h5>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Register;
