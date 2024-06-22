import { React } from "react";

const YouTubePlayer = ({ videoId }) => {
  return (
    <div>
      <iframe
        width={"100%"}
        height={"300"}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
