import os
import cv2
import numpy as np
import soundfile as sf
import numpy as np
import moviepy.editor as mp
import librosa

def write_audio_summary(video_name,tmp_path,video_path,summary):

    cap = cv2.VideoCapture(video_path)
    fps = round(cap.get(cv2.CAP_PROP_FPS))
    
    audio_path = extract_audio(video_path,video_name,tmp_path)
    sum_audio_path = summarize_audio(audio_path,fps,summary,tmp_path,video_name)

    return sum_audio_path


def extract_audio(video_path,video_name,tmp_path):
    video_clip = mp.VideoFileClip(video_path)
    audio_clip = video_clip.audio
    audio_path = tmp_path + video_name + '.wav'
    audio_clip.write_audiofile(audio_path)
    return audio_path

def summarize_audio(audio_path,fps,summary,tmp_path,video_name):

    y, sr = librosa.load(audio_path,sr=fps* 1000)
    num_samples = len(y)

    sm_c = round(num_samples/len(summary))

    new_length = sm_c*len(summary)
    truncated_array = y[:new_length]

    stacked_signal = truncated_array.reshape(len(summary), sm_c)
    selected_parts = stacked_signal[summary]

    combined_signal = selected_parts.reshape(-1)

    sum_audio_path = tmp_path + video_name + '-sum.wav'
    sf.write(sum_audio_path, combined_signal ,samplerate = fps *sm_c)

    return sum_audio_path