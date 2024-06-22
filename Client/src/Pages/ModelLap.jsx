import { React, useState, useEffect } from "react";
import "../styles/ModelLap.scss";
import YouTubePlayer from "./YoutubePlayer";
import {
  InboxOutlined,
  LoadingOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { message, Progress, Upload } from "antd";
import axios from "axios";
import { Spin } from "antd";
import io from "socket.io-client";
import { Typography } from "antd";
const { Text } = Typography;
const { Dragger } = Upload;

const ModelLap = () => {
  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };
  const props = {
    data: { id: `${Date.now().toString()}.mp4` },
    name: "file",
    action: "http://127.0.0.1:5000/upload",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setVideoFile({
          file: info.file.originFileObj,
          id: info.file.response.data,
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [apiStatus, setApiStatus] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeVideoID, setYoutubeVideoID] = useState("");
  const [summaryFile, setSummaryFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const error = () => {
    message.error(
      "you should select a (video file/youtube link) to upload first !"
    );
  };
  useEffect(() => {
    const socket = io.connect("http://localhost:5000");
    socket.on("progress_update", (data) => {
      const progressString = data.message;
      const progressIndex = progressString.indexOf("(");
      if (progressIndex !== -1) {
        const progressPercentage = parseFloat(
          progressString.substring(
            progressIndex + 1,
            progressString.indexOf("%")
          )
        );
        if (!isNaN(progressPercentage)) {
          setProgress(progressPercentage);

          const progressMessageWithoutPercentage = progressString.replace(
            /\(\d+\.\d+%\)/,
            ""
          );

          if (
            progressPercentage === 0 ||
            progressPercentage === 20 ||
            progressPercentage === 40 ||
            progressPercentage === 60 ||
            progressPercentage === 80 ||
            progressPercentage === 100
          ) {
            setApiStatus((prevApiStatus) => [
              ...prevApiStatus,
              progressMessageWithoutPercentage,
            ]);
          }
        }
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [setApiStatus]);

  const videoInputItem = () => {
    if (videoUrl && videoId)
      return (
        <>
          <YouTubePlayer videoId={videoId} />
          <div>
            {youtubeVideoID && !uploadLoading ? (
              <>
                <span>Download Completed</span>{" "}
                <CheckOutlined
                  style={{
                    backgroundColor: "lightGreen",
                    fontSize: "22px",
                    padding: "3px",
                    borderRadius: "4px",
                  }}
                />
              </>
            ) : (
              <button className="btn-fetch mt-4" onClick={handleUploadButton}>
                Fetch
              </button>
            )}

            {uploadLoading && (
              <div>
                <span>Downloading Video.. </span>
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                        color: "$secondary !important",
                      }}
                      spin
                    />
                  }
                />
              </div>
            )}
          </div>
        </>
      );
    if (videoFile)
      return (
        <>
          {/* <h6>{videoFile.file.name}</h6> */}
          <video controls width={"100%"} height={"300"}>
            <source
              src={URL.createObjectURL(videoFile.file)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </>
      );
    else
      return (
        <Dragger className="druger" {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag video to this area to upload
          </p>
        </Dragger>
      );
  };
  const videoOutputItem = () => {
    if (summaryFile)
      return (
        <>
          <video className="vid-ratio" controls width={"100%"} height={"300"}>
            <source src={URL.createObjectURL(summaryFile)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      );
    else return <div className="output-video-summary"></div>;
  };

  const handleUploadButton = async () => {
    if (videoUrl === "") {
      return;
    }
    setUploadLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/fetch-video`, {
        params: {
          url: videoUrl,
          id: Date.now().toString(),
        },
      });
      setYoutubeVideoID(response.data);
      //changed from youtubevideo to youtubevideoID because the fetch-video only returns api returns the video id

      // setVideoFile({
      //   file: response.data,
      //   id: Date.now().toString(),
      // });
    } catch (error) {
      console.error("Error getting video:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleLinkChange = (e) => {
    setVideoUrl(e.target.value);
  };
  const handleSearchButton = (e) => {
    const url = new URL(videoUrl);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("v");
    if (id) {
      setVideoId(id);
    } else {
      console.log("Invalid YouTube URL");
    }
  };
  const handleSummarizeButton = async () => {
    if (!videoFile && !youtubeVideoID) {
      error();
      return;
    }
    setSummaryLoading(true);
    const url = videoFile
      ? `http://localhost:5000/summarize/${videoFile.id}`
      : `http://localhost:5000/summarize/${youtubeVideoID}`;

    const fetchVideo = async () => {
      try {
        const response = await axios.get(url, { responseType: "blob" });
        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        setSummaryFile(videoBlob);
      } catch (error) {
        console.error(error);
      } finally {
        setApiStatus([]);
        setSummaryLoading(false);
      }
    };
    fetchVideo();
  };
  return (
    <div className=" container model-lab-container">
      <div className=" text-center mt-4">
        <div>
          <h4 className="header">Model lap</h4>
          <p className="sub-header">the model may take some time</p>
        </div>
        <div className="row">
          <div className="youtube-search-container">
            <input
              placeholder="Enter YouTube URL"
              value={videoUrl}
              type="text"
              className="youtube-search-input"
              onChange={handleLinkChange}
            />
            <button className="btn-search" onClick={handleSearchButton}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-between video-files-container ">
        <div className="col-md-5 mb-4 mb-md-0">
          <h3>Original Video</h3>
          {videoInputItem()}
        </div>
        <div className="col-md-2 mb-4 mb-md-0">
          <div className="d-flex align-items-center justify-content-center h-100">
            {summaryLoading ? (
              <div className="container-loading text-center">
                <h3>
                  current step{" "}
                  <Text mark>{apiStatus[apiStatus.length - 1]}</Text>
                </h3>
                <div className="row">
                  <div className="col text-center">
                    <Progress
                      strokeColor={twoColors}
                      percent={progress}
                      size="small"
                      status="active"
                    />
                  </div>
                </div>
              </div>
            ) : (
              (videoFile || youtubeVideoID) && (
                <button
                  className="btn btn-model"
                  onClick={handleSummarizeButton}
                >
                  Summarize
                </button>
              )
            )}
          </div>
        </div>
        <div className="col-md-5">
          <h3>Summarized Video</h3>
          {videoOutputItem()}
        </div>
      </div>
    </div>
  );
};

export default ModelLap;
