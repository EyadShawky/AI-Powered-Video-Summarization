<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/login', [AuthController::class,'loginForm']);
// Route::post('/login', [AuthController::class,'login']);

// Route::get('/register', [AuthController::class,'registerForm']);
// Route::post('/register', [AuthController::class,'register']);

// Route::post('/logout', [AuthController::class,'logout']);

