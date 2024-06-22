import React, { useState, useEffect } from 'react';
import '../styles/Profile.scss';
import { Alert, Space } from 'antd';
import profile from '../lottie/profile.json'
import Lottie from 'lottie-react';
const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    img: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfileData(); // Fetch user profile data when the component mounts
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/get-profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({
          firstName: data.data.name,
          email: data.data.email,
          phone_number: data.data.phone_number,
          img: data.data.img
        });
      } else {
        setMessage({ type: 'error', text: 'Failed to fetch profile data' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching profile data' });
    }
  };
 

  return (
    <div className='profile'>
      <div className="row container ">
      
        <div className="col-12 design-reg-card ">

          <form>
            <div className="row m-5">
              <div className="col-12 mb-3">
                {message.type && (
                  <Space
                    direction="vertical"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Alert
                      description={message.text}
                      type={message.type}
                      closable
                    />
                  </Space>
                )}
              </div>

              <div className="card mb-3" >
                <div className="row no-gutters">
                  <div className="col-md-6">
                    <img className='img-size' src={`http://127.0.0.1:8000/api/${formData.img}`} alt={`this is image is relative to the user whose name is ${formData.firstName} and whose email is ${formData.email}`}/>
                  </div>
                  <div className="col-md-6">
                    <div className=' h-profile d-flex align-items-center justify-content-center'>
                    <div className=" card-body ">
                    <Lottie animationData={profile} className='lottie-profile' />
                      <h5 className="card-title">{formData.firstName}</h5>
                      <p className="card-text">{formData.email}</p>
                      <p className="card-text phone_text">{formData.phone_number}</p>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
