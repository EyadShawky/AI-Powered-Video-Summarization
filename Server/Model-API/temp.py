






import cv2

# Open the video file
video_capture = cv2.VideoCapture('custom-video/what the highest HS % in NA looks like.mp4')  #Change 'your_video_file.mp4' to your video file path
# Get the frame rate
frame_rate = video_capture.get(cv2.CAP_PROP_FPS)
print("Frame rate of the video:"+str(frame_rate))

