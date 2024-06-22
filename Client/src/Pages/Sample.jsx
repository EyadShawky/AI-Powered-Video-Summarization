// import React, { useState } from 'react';
// import '../styles/Sample.scss';

// const Sample = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [clickedIndex, setClickedIndex] = useState(null);

//   const videos = [
//     { src: require('../videos/video(1).mp4'), title: 'Title 1' },
//     { src: require('../videos/video(2).mp4'), title: 'Title 2' },
//     { src: require('../videos/video(3).mp4'), title: 'Title 3' },
//     { src: require('../videos/video(4).mp4'), title: 'Title 4' },
//     { src: require('../videos/video(5).mp4'), title: 'Title 5' },
//     { src: require('../videos/video(6).mp4'), title: 'Title 6' },
//     { src: require('../videos/video(7).mp4'), title: 'Title 7' },
//     { src: require('../videos/video(8).mp4'), title: 'Title 8' },
//     { src: require('../videos/video(9).mp4'), title: 'Title 9' },
//     { src: require('../videos/video(10).mp4'), title: 'Title 10' },
//     { src: require('../videos/video(11).mp4'), title: 'Title 11' },
//     { src: require('../videos/video(12).mp4'), title: 'Title 12' },
//     { src: require('../videos/video(13).mp4'), title: 'Title 13' },
//     { src: require('../videos/video(14).mp4'), title: 'Title 14' },
//     { src: require('../videos/video(15).mp4'), title: 'Title 15' },
//     { src: require('../videos/video(16).mp4'), title: 'Title 16' },
//     { src: require('../videos/video(17).mp4'), title: 'Title 17' },
//     { src: require('../videos/video(18).mp4'), title: 'Title 18' },
//     { src: require('../videos/video(19).mp4'), title: 'Title 19' },
//     { src: require('../videos/video(20).mp4'), title: 'Title 20' },
//     { src: require('../videos/video(21).mp4'), title: 'Title 21' },
//     { src: require('../videos/video(22).mp4'), title: 'Title 22' },
//     { src: require('../videos/video(23).mp4'), title: 'Title 23' },
//     { src: require('../videos/video(24).mp4'), title: 'Title 24' },
//     { src: require('../videos/video(25).mp4'), title: 'Title 25' },
//     { src: require('../videos/video(26).mp4'), title: 'Title 26' },
//     { src: require('../videos/video(27).mp4'), title: 'Title 27' },
//     { src: require('../videos/video(28).mp4'), title: 'Title 28' },
//     { src: require('../videos/video(29).mp4'), title: 'Title 29' },
//     { src: require('../videos/video(30).mp4'), title: 'Title 30' },
//     { src: require('../videos/video(31).mp4'), title: 'Title 31' },
//     { src: require('../videos/video(32).mp4'), title: 'Title 32' },
//     { src: require('../videos/video(33).mp4'), title: 'Title 33' },
//     { src: require('../videos/video(34).mp4'), title: 'Title 34' },
//     { src: require('../videos/video(35).mp4'), title: 'Title 35' },
//     { src: require('../videos/video(36).mp4'), title: 'Title 36' },
//     { src: require('../videos/video(37).mp4'), title: 'Title 37' },
//     { src: require('../videos/video(38).mp4'), title: 'Title 38' },
//     { src: require('../videos/video(39).mp4'), title: 'Title 39' },
//     { src: require('../videos/video(40).mp4'), title: 'Title 40' },
//     { src: require('../videos/video(41).mp4'), title: 'Title 41' },
//     { src: require('../videos/video(42).mp4'), title: 'Title 42' },
//     { src: require('../videos/video(43).mp4'), title: 'Title 43' },
//     { src: require('../videos/video(44).mp4'), title: 'Title 44' },
//     { src: require('../videos/video(45).mp4'), title: 'Title 45' },
//     { src: require('../videos/video(46).mp4'), title: 'Title 46' },
//     { src: require('../videos/video(47).mp4'), title: 'Title 47' },
//     { src: require('../videos/video(48).mp4'), title: 'Title 48' },
//     { src: require('../videos/video(49).mp4'), title: 'Title 49' },
//     { src: require('../videos/video(50).mp4'), title: 'Title 50' },
//   ];
  

//   const videoRefs = [];
//   const hoverTextRefs = [];

//   const handleMouseEnter = (index) => {
//     const video = videoRefs[index];
//     video.play();
//     setIsPlaying(true);
//     hoverTextRefs[index].classList.remove('active');
//   };

//   const handleMouseLeave = (index) => {
//     const video = videoRefs[index];
//     video.pause();
//     setIsPlaying(false);
//     hoverTextRefs[index].classList.add('active');
//   };

//   const toggleModal = (index) => {
//     setModal(!modal);
//     setClickedIndex(index);
//   };

//   return (
//     <div className="container">
//       <div className='d-flex justify-content-center text-center mt-4'>
//         <div>
//           <h4 className='header'>Sample Video</h4>
//           <p className='sub-header'>What our model does</p>
//         </div>
//       </div>
//       <div className='scroller' style={{ position: 'relative', overflowY: 'auto', maxHeight: '500px' }}>
//         <div className="row">
//           {videos.map((video, index) => (
//             <div className="col-md-3 col-sm-6 mb-2" key={index}>
//               <div className="main-container">
//                 <div
//                   className="video-container"
//                   onMouseEnter={() => handleMouseEnter(index)}
//                   onMouseLeave={() => handleMouseLeave(index)}
//                   onClick={() => toggleModal(index)}
//                 >
//                   <video ref={(ref) => videoRefs[index] = ref} src={video.src}></video>
//                   <div
//                     ref={(ref) => hoverTextRefs[index] = ref}
//                     className={`hover-text ${isPlaying ? '' : 'active'}`}
//                   >
//                     12.3
//                   </div>
//                   <div>
//                     <p>{video.title}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {modal && (
//         <div className="modal-overlay" onClick={() => setModal(false)}>
//           <div className="modal-content">
//             <video src={videos[clickedIndex].src} controls></video>
//             <button className='btn btn-test'>view summary</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sample;


 import React, { useState, useEffect } from 'react';

const Sample = () => {
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/get-videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const videosData = await response.json();
      setVideos(videosData);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const toggleModal = (index) => {
    setModal(!modal);
    setClickedIndex(index);
  };

  return (
    <div className="container">
      <div className='d-flex justify-content-center text-center mt-4'>
        <div>
          <h4 className='header'>Sample Video</h4>
          <p className='sub-header'>What our model does</p>
        </div>
      </div>
      <div className='scroller' style={{ position: 'relative', overflowY: 'auto', maxHeight: '500px' }}>
        <div className="row">
          {videos.map((video, index) => (
            <div className="col-md-3 col-sm-6 mb-2" key={index}>
              <div className="main-container">
                <div
                  className="video-container"
                  onClick={() => toggleModal(index)}
                >
                  <video src={`http://127.0.0.1:8000/api/${video.filename}`}></video>
                  <div>
                    <p>{video.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal-content">
            <video src={videos[clickedIndex].filename} controls></video>
            <button className='btn btn-test'>view summary</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sample;
