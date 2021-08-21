<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('sync-uploadjs', function (Request $request) {
 $uploadjs = file_get_contents('../resources/js/plugins/upload.js');
 $addimagesfile = file_put_contents('../resources/js/plugins/add-images.js',$uploadjs);
 echo "synced";
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
