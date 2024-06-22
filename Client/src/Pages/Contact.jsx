import React, { useState } from 'react';
import '../styles/Contact.scss';
import { Alert, Space } from 'antd';
import emailjs from '@emailjs/browser';
import Lottie from 'lottie-react';
import contactUs from '../lottie/contac-us.json';

const Contact = () => {
  const [message, setMessage] = useState({ type: '', text: '' });

  const sendEmail = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    if (!formData.get('message').trim()) {
      setMessage({ type: 'error', text: 'Please type a message before sending' });
      return;
    }

    try {
      const response = await emailjs.sendForm('service_huuwma7', 'template_j8l88kc', form, {
        publicKey: 'HQzY6ljI-Lz7jwlLo',
      });
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'Message sent successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to send message' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send message' });
    }
  };

  return (
    <div className='container'>
       <div className='d-flex justify-content-center text-center mt-4'>
        <div>
          <h4 className='header'>contact US</h4>
          <p className='sub-header'>let's keep in touch</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6 col-md-12 contact-high'>
          <form onSubmit={sendEmail}>
            <div className='row m-5'>
              <div className='col-12 mt-3'>
                {message.type && (
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <Alert description={message.text} type={message.type} closable />
                  </Space>
                )}
              </div>
              <div className='col-md-6 mt-3'>
                <input type='text' className='form-control' placeholder='User Name' name='user_name' />
              </div>
              <div className='col-md-6 mt-3'>
                <input type='number' className='form-control' placeholder='Phone Number' name='user_number' />
              </div>
              <div className='col-12 mt-3'>
                <input type='email' className='form-control' placeholder='Email' name='user_email' />
              </div>
              <div className='col-12 mt-3'>
                <textarea
                  className='form-control'
                  placeholder='Type your message here and our team will help you ASAP!'
                  rows='3'
                  name='message'
                ></textarea>
              </div>
              <div className='col-12 mt-3'>
                <button type='submit' className='btn-reg'>
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-lg-6 col-md-12 d-none d-md-block'>
          <Lottie animationData={contactUs} className='style-contact' />
        </div>
      </div>
    </div>
  );
};

export default Contact;
