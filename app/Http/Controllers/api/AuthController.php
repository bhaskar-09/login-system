<?php

namespace App\Http\Controllers\API;

use App\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public $successStatus = 200;

    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 202);
        }
        $default_role = 'User';
        $input = $request->all();
        $input['role'] = $default_role;
        $input['password'] = bcrypt($input['password']);
        $user = new User($input);
        $user->save();

        $success['token'] = $user->createToken('AppName')->accessToken;
        return response()->json(['success' => $success], $this->successStatus);
    }

    public function updateuser(Request $request)
    {
        $model = User::find($request->id);

        $model->email = $request->email;
        $model->name = $request->name;
        $model->role = $request->role;

        if ($request->password !== "") {
            $model->password = bcrypt($request->password);
        }

        $model->save();
        return response()->json([
            'message' => 'Successfully Updated',
            'success' => true
        ]);
    }

    public function removeuser(Request $request)
    {
        $model = User::find($request->uid);
        $model->delete();

        return response()->json([
            'message' => 'Successfully Removed',
            'success' => true
        ]);
    }
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('AppName')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        } else {
            return response()->json(['error' => 'Enter Correct Email and Password'], 202);
        }
    }

    public function logout(Request $request)
    {
        $user = Auth::logout();

        return response()->json([
            'message' => 'Successfully logged out',
            'success' => true, 'data' => $user
        ]);
    }

    public function getUser()
    {
        $user = Auth::user();


        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'isDev' => env('IS_DEV'),
                'db' => \DB::connection()->getDatabaseName(),
            ]
        ], $this->successStatus);
    }

    public function getUsersData()
    {
        $users = User::all();

        return response()->json([
            'success' => true,
            'data' => [
                'users' => $users,
            ]
        ], $this->successStatus);
    }

}
