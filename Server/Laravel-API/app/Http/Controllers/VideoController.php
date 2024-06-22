<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{

    public function postVideo(Request $request)
    { 
        $request->validate([
            'title' => 'required',
            'duration' => 'nullable',
            'video' => 'required|mimes:mp4,mov,avi,wmv', 
        ]);

        if ($request->hasFile('video')) {
            $fileNameWithExt = $request->file('video')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('video')->getClientOriginalExtension();
            $fileNameToStore = $fileName . '_' . time() . '.' . $extension;
            $path = $request->file('video')->storeAs('public/videos', $fileNameToStore);
        } else {
            return response()->json(['error' => 'No file uploaded.'], 400);
        }

        $video = new Video();
        $video->title = $request->input('title');
        $video->duration = $request->input('duration');
        $video->filename = 'storage/videos/' . $fileNameToStore;
        $video->save();

        return response()->json(['message' => 'Video uploaded successfully.']);
    }

    public function index()
    {
        $videos = Video::all();
        return response()->json($videos);
    }
}