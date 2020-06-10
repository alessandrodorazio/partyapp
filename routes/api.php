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

Route::prefix('users')->group(function () {
    Route::resource('follows', 'FollowController')->only(['store', 'destroy']);
    Route::get('follows/followers', 'FollowController@followers')->name('users.follows.followers');
    Route::get('follows/following', 'FollowController@following')->name('users.follows.following');

    Route::get('search/{value}', 'UserController@search')->name('users.search');
    Route::post('{user_id}/password/change', 'UserController@changePassword')->name('users.changepassword');

});
Route::resource('users', 'UserController')->except(['create', 'store']);

Route::resource('genres', 'MusicalGenreController')->only(['index', 'store']);

Route::prefix('parties')->group(function () {
    Route::get('myparties', 'PartyController@userParties')->name('party.myparties');
    Route::get('{party_id}/export/copyright', 'PartyController@exportCopyright')->name('party.export.copyright');
});
Route::resource('parties', 'PartyController');

Route::prefix('playlists')->group(function () {
    Route::get('myplaylists', 'PlaylistController@userPlaylists')->name('playlist.myplaylists');
    Route::post('{playlist_id}/songs/add', 'PlaylistController@addSongs')->name('playlist.add_songs');
});

Route::resource('playlists', 'PlaylistController');
Route::resource('moods', 'PartyMoodController');
