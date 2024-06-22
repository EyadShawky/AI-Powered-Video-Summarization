import React, { useState } from "react";

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      {videoUrl && (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default VideoPlayer;
