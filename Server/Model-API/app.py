from flask import Flask, request, Response, send_file,jsonify
from flask_cors import CORS
import os
import moviepy.editor as mp
from script import getSummarizedVideo
from helpers.video_downloader import download_video
from flask_socketio import SocketIO, emit
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mpeg', 'mov', 'mkv'} 



# Create a Flask application instance
app = Flask(__name__)

CORS(app, resources={r"*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins='*')

def emit_progress(message):
    socketio.emit('progress_update', {'message': message})



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    print(request)
    if 'file' not in request.files:
        return 'No video file in the request', 400
    file = request.files['file']
    id = request.form['id']

    if file.filename == '':
        return 'No selected file', 400
    
    if file and allowed_file(file.filename):
        emit_progress('Uploading video...')
        secure_filename(file.filename)
        print("im saving the file")
        file.save(f'custom-video/{id}')
        return jsonify({'message':'file uploaded successfully', 'data': id}),200
    else:
        return 'Invalid file format or extension', 400

@app.route('/summarize/<video_name>', methods=['GET'])
def get_video(video_name):
    print(f"before summarize : {video_name}")
 
    video_title = os.path.splitext(video_name)[0]

    video_path = f"custom-video/{video_name}"
    model_path = f"savedModel/our-attention-vas0.pt"
    save_path = f"output/{video_title}.webm"
    saved_path = getSummarizedVideo(video_path, video_name ,model_path, save_path,emit_progress)

    return send_file(saved_path, mimetype='video/mp4')



@app.route('/fetch-video', methods=['GET'])
def fetch_video():
    video_link = request.args.get('url')
    video_id = request.args.get('id')

    download_video(video_link,video_id)
    print(f"after fetching : { str(video_id)}")
    return f'{video_id}.mp4'


if __name__ == '__main__':
    app.run(debug=True)



# create code for sending video from backend to frontend in flask
    