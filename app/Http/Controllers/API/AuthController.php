<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign role
        $user->assignRole('customer'); // Assign 'customer' role by default

        $token = $user->createToken('auth_token')->plainTextToken;
        $roles = $user->roles->pluck('name'); 

        return response()->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Bearer', 'roles' => $roles]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;
        $roles = $user->roles->pluck('name'); 

        return response()->json(['message' => 'Hi ' . $user->name . ', welcome to home', 
        'access_token' => $token, 
        'token_type' => 'Bearer',
        'roles' => $roles]);
    }

    public function logout(Request $request)
    {
        // Revoke the current token that the user is using
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
