import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const socket = io.connect("http://localhost:5000");
    socket.on("progress_update", (data) => {
      setProgress(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUploadSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("video", file);
    formData.append("videoName", file.name);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };
  const handleLinkSubmit = async (event) => {
    event.preventDefault();

    if (videoUrl === "") {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/fetch-video?link=${videoUrl}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error getting video:", error);
    }
  };

  return (
    <>
      <div className="main-input-video-containter">
        <form className="video-youtube-container" onSubmit={handleLinkSubmit}>
          <h3>enter video link here</h3>
          <div className="input-group-search">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button type="submit">get Link and summarize</button>
          </div>
        </form>
        <form className="video-upload-container" onSubmit={handleUploadSubmit}>
          {file?.name ? (
            <h1>
              selected file is{" "}
              <span style={{ color: "cyan" }}>{file.name}</span>
            </h1>
          ) : null}
          <div className="input-video-item">
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </div>
        </form>
        {file?.name != undefined ? (
          <VideoPlayer file_name={file?.name} />
        ) : null}
      </div>
    </>
  );
}

export default App;

const VideoPlayer = ({ file_name }) => {
  const url = `http://localhost:5000/summarize/${file_name}`;
  const [videoUrl, setVideoUrl] = useState("");

  const handleSummarizeButtonClick = () => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(url, { responseType: "blob" });
        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        const videoURL = URL.createObjectURL(videoBlob);
        setVideoUrl(videoURL);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  };

  return (
    <div className="video-item">
      <button onClick={handleButtonClick}>Summarize</button>
      {videoUrl && (
        <video width="420" height="340" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};
