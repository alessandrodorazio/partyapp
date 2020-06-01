<?php

use Illuminate\Support\Facades\Route;

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

//ROUTE AUTH
Route::prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login')->name('auth.login');
    Route::post('register', 'AuthController@register')->name('auth.register');
    Route::post('logout', 'AuthController@logout')->name('auth.logout');
    Route::post('refresh', 'AuthController@refreshToken')->name('auth.refresh');
    Route::get('me', 'AuthController@me')->name('auth.me');
});

Route::resource('/parties', 'PartyController');
Route::post('/playlists/{playlist_id}/songs/add', 'PlaylistController@addSongs')->name('playlist.add_songs');
Route::resource('/playlists', 'PlaylistController');
Route::resource('/moods', 'PartyMoodController');
