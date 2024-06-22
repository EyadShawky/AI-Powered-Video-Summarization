<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

Route::get('/storage/users/{filename}', function ($filename) {
    $path = storage_path('app/public/users/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
})->name('user-image');

Route::get('/storage/videos/{filename}', function ($filename) {
    $path = storage_path('app/public/videos/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
})->name('user-videos');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    // Login
    Route::post('/login', [AuthController::class, 'login']);

    // Register
    Route::post('/register', [AuthController::class, 'register']);
});


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/get-profile', [AuthController::class, 'getProfile']);
});


Route::get('/get-videos', [VideoController::class, 'index']);
Route::post('/post-videos', [VideoController::class, 'postVideo']);
