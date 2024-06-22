import React from 'react';
import '../styles/AboutTeam.scss';
import eyad from '../imgs/teamMember/eyad shawky.png';
import shady from '../imgs/teamMember/mohamed shady.jpg';
import abdelraouf from '../imgs/teamMember/mohamed abdelraouf.jpg';
import karemTamer from '../imgs/teamMember/karem Tamer.jpg';
import adam from '../imgs/teamMember/Adam.jpg';
import assma from '../imgs/teamMember/Dr assma.jpg';
import mariam from '../imgs/teamMember/Dr mariam.jpg';
import ahmed from '../imgs/teamMember/ahmed khaled.jpg';
import mohamed from '../imgs/teamMember/mohamed Salah.jpg';
import karem from '../imgs/teamMember/Karem Roshdy.jpg';
import nagham from '../imgs/teamMember/Dr naghm.jpg';

const TeamList = ({ title, members }) => (
  <div className="col-6 mt-2">
    <ul className="list-group">
      <li className="list-group-item header-list">{title}</li>
      {members.map((member, index) => (
        <li key={index} className="list-group-item">{member}</li>
      ))}
    </ul>
  </div>
);

const AboutTeam = () => {
  const underSupervision = ['Dr. Assma Elkholy', 'TA. Nagham Yahya', 'TA. Mariam Essam'];
  const teamMembers = [
    'Mohamed Shady', 'Eyad Shawky', 'Mohamed AbdelRauof',
    'Ahmed Khaled', 'Adam Osama', 'Mohamed Salah',
    'Karem Roshdy', 'Kareem Tamer'
  ];

  const teamMembersWithImages = [
    { name: 'Dr. Assma', image: assma },
    { name: 'TA. Nagham', image: nagham },
    { name: 'TA. Mariam', image: mariam },
    { name: 'Mohamed Shady', image: shady },
    { name: 'Eyad Shawky', image: eyad },
    { name: 'Mohamed AbdelRauof', image: abdelraouf },
    { name: 'Ahmed Khaled', image: ahmed },
    { name: 'Adam Osama', image: adam },
    { name: 'Mohamed Salah', image: mohamed },
    { name: 'Kareem Roshdy', image: karem },
    { name: 'Karem Tamer', image: karemTamer },
  ];

  return (
    <div className="container about-height text-center">
      <div className="row">
        <div className="col-md-5 p-4">
          <h2 className='text-header-about'>Hello from Our Team</h2>
          <p>
            This project, a testament to professional collaboration, was created by MTI University students, guided by doctoral mentors and teaching assistants, setting new standards in quality and innovation.
          </p>
          <div className="row">
            <TeamList title="Under Supervision" members={underSupervision} />
            <TeamList title="Team Members" members={teamMembers} />
          </div>
        </div>
        <div className="col-md-7 p-4">
          <div className='scroller' style={{ position: 'relative', overflowY: 'auto', maxHeight: '500px' }}>
            <div className="row">
              {teamMembersWithImages.map((member, index) => (
                <div key={index} className="col-6 col-sm-6 col-md-3 col-lg-2 col-xl-3 mb-2">
                  <img src={member.image} className="img-fluid" alt={`${member.name} Img.`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;
