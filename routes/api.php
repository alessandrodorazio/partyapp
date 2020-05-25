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

Route::resource('/parties', 'PartyController');
Route::post('/playlists/{playlist_id}/songs/add', 'PlaylistController@addSongs')->name('playlist.add_songs');
Route::resource('/playlists', 'PlaylistController');
