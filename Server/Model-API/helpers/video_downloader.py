from pytube import YouTube



def download_video(video_url,id):

    yt = YouTube(video_url)
    stream = yt.streams.get_highest_resolution()

    filename = f"{id}.mp4"
    stream.download("custom-video", filename=filename)
    path = f"custom-video/{id}.mp4"

    return path, yt.title



