import os
import cv2
import torch
import numpy as np
from savedModel.model import VASNet
from helpers.VideoProccessor import VideoPreprocessor, write_video_summary ,combine_video_audio
from helpers.AudioProccessor import write_audio_summary
from helpers.vsum_helper import generate_summary,custom_cps
import json




def summarizeVideo(video_path, video_name,model_path, save_path,emit_progress):

    def emit_progress_wrapper(message, progress):
        emit_progress(message + f" ({progress:.2f}%)")


    video_name = os.path.splitext(video_name)[0]
    tmp_path = 'temp/'

    emit_progress_wrapper('Loading model', 0)
    model = VASNet()
    model = model.eval().to("cpu")
    state_dict = torch.load(model_path,map_location=lambda storage, loc: storage)
    model.load_state_dict(state_dict)

    emit_progress_wrapper('Preprocessing video',20)
    video_proc = VideoPreprocessor(15)
    n_frames, seq, cps, nfps, picks = video_proc.run(video_path)

    n_cps,_ = cps.shape
    if n_cps < 3:
        print(f'WARNING!!! -> current cps {str(cps.shape)} rewrite change points...')
        cps,nfps  = custom_cps(n_frames, 400)


    emit_progress_wrapper('Predicting summary',40)
    with torch.no_grad():
        seq_torch = torch.from_numpy(seq).unsqueeze(0).to("cpu")

        pred_cls = model.predict(seq_torch)

        pred_summ = generate_summary(pred_cls, cps, n_frames, nfps, picks)

    
    with open(tmp_path+video_name+".json", 'w') as json_file:
        json.dump(pred_summ.tolist(), json_file)

    emit_progress_wrapper('Writing summary video',60)
    vid_summ_path = write_video_summary(video_name,tmp_path,video_path,pred_summ)
    emit_progress_wrapper('Writing summary Audio',80)
    aud_summ_path = write_audio_summary(video_name,tmp_path,video_path,pred_summ)
    emit_progress_wrapper('combining video and audio',85)
    summary_path = combine_video_audio(vid_summ_path, aud_summ_path, save_path)

    emit_progress_wrapper('Done !',100)
    print('video summary saved at:', summary_path)

def getSummarizedVideo(video_path,video_name ,model_path, save_path,emit_progress):
    summarizeVideo(video_path, video_name,model_path, save_path,emit_progress)
    return save_path