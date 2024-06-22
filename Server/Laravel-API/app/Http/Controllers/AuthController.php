<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $inputs = $request->all();

        $v = validator($inputs, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($v->fails()) {
            return response()->json('Email or password missing', 422);
        }

        $attempt = Auth::attempt([
            'email' => $inputs['email'],
            'password' => $inputs['password'],
        ]);

        if (!$attempt) {
            return response()->json('Email or password not correct', 401);
        }

        $user = User::where('email', $inputs['email'])->first();

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'authToken' => $user->createToken('authToken')->plainTextToken,
        ]);
    }

    public function register(Request $request)
    {
        $inputs = $request->all();

        $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'phone_number' => 'required',
            'zip' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8|max:30',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image upload
        ]);


        $v = validator($inputs, [
            'firstName' => 'required',
            'lastName' => 'required',
            'phone_number' => 'required',
            'zip' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|string|min:8|max:30',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image upload

        ]);

        if ($v->fails()) {
            return response()->json($v->errors()->all(), 409);
        }
        $user = new User();
        $user->name = $request->input('firstName') . ' ' . $request->input('lastName');
        $user->phone_number = $request->input('phone_number');
        $user->zip = $request->input('zip');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));

        // Handle image upload
        if ($request->hasFile('img')) {
            $fileName = $request->file('img')->store('public/users');
            $user->img = str_replace('public/', 'storage/', $fileName);
        }

        $user->save();

        return response()->json([
            'user' => $user,
            'authToken' => $user->createToken('authToken')->plainTextToken,
        ]);
    }


    public function getProfile(Request $request)
    {
        try {
            $user_id = $request->user()->id;
            $user = User::find($user_id);
            return response()->json(['status' => 'true', 'message' => "user profile", 'data' => $user]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'false', 'message' => $e->getMessage(), 'data' => []], 500);
        }
    }
}
