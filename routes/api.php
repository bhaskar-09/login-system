<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/





Route::prefix('v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('user', [AuthController::class, 'getUser']);
        Route::get('users', [AuthController::class, 'getUsersData']);
        Route::post('remove-user', [AuthController::class, 'removeuser']);
        Route::post('update-user', [AuthController::class, 'updateuser']);
    });
});
