import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import '../styles/Services.scss';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, price, features }) => (
  <div className="col-sm mt-3 mb-3">
    <div className="main-card">
      <span className='bg-header'>{title}</span>
      <h4 className='mt-4'>  <span className='dollar-color'>$<span className='num-color'>{price}</span></span>/month</h4><p>{features.description}</p>
      <div>
        {features.items.map((item, index) => (
          <div className="row mt-2" key={index}>
            <div className="col-2">{item.icon}</div>
            <div className="col-10">{item.description}</div>
          </div>
        ))}
      </div>
      <div className='d-flex justify-content-center'>
        <Link to='/subscriptions'>
          <button className='btn-service mt-4' >Subscribe</button>
        </Link>
      </div>
    </div>
  </div>
);

const Services = () => {
  const servicePlans = [
    {
      title: 'Basic Plan',
      price: 0,
      features: {
        description: 'Ideal for beginners',
        items: [
          { icon: <CheckOutlined />, description: 'One video per day' },
          { icon: <CloseOutlined />, description: 'Standard video quality' },
          { icon: <CloseOutlined />, description: 'No advanced editing' }
        ]
      }
    },
    {
      title: 'Standard Plan',
      price: 10,
      features: {
        description: 'More features and flexibility',
        items: [
          { icon: <CheckOutlined />, description: 'Three videos per day' },
          { icon: <CheckOutlined />, description: 'Up to 1080p quality' },
          { icon: <CloseOutlined />, description: 'No watermark' }
        ]
      }
    },
    {
      title: 'Premium Plan',
      price: 30,
      features: {
        description: 'Best for businesses',
        items: [
          { icon: <CheckOutlined />, description: 'Unlimited uploads' },
          { icon: <CheckOutlined />, description: 'Up to 4K quality' },
          { icon: <CheckOutlined />, description: 'Advanced editing tools' }
        ]
      }
    }
  ];


  return (
    <>
      <div className='d-flex justify-content-center text-center mt-4'>
        <div>
          <h4 className='header'>Services We Provide</h4>
          <p className='sub-header'>Here are our plans for the model. Choose the best one for you!</p>
        </div>
      </div>
      <div className="row">
        {servicePlans.map((plan, index) => (
          <ServiceCard key={index} title={plan.title} price={plan.price} features={plan.features} />
        ))}
      </div>
    </>
  );
};

export default Services;
