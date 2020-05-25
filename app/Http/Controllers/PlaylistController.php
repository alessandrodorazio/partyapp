<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\MusicalGenre;
use App\Playlist;
use App\User;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    public function index()
    {
        $playlists = Playlist::all();
        return (new Responser())->success()->showMessage()->message('Lista delle playlist')->item('playlists', $playlists)->response();
    }

    public function show($playlist_id)
    {
        $playlist = Playlist::findOrFail($playlist_id);
        $songs = $playlist->songs()->get(['song_id', 'title']);
        return (new Responser())->success()->showMessage()->message('Informazioni sulla playlist')->item('playlist', $playlist)->item('songs', $songs)->response();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'owner_id' => 'required',
            'genre_id' => 'required',
        ]);

        $name = $request->name;
        $owner_id = $request->owner_id; //TODO AUTH => Auth::id()
        $genre_id = $request->genre_id;
        if (isset($request->songs)) {
            $songs = json_decode($request->songs);
        } else {
            $songs = [];
        }

        $playlist = new Playlist();
        $playlist->name = $name;

        if (User::where('id', $owner_id)->exists()) {
            $playlist->owner_id = $owner_id;
        } else {
            return (new Responser())->failed()->showMessage()->message('Ooops... non riusciamo a trovare il tuo utente')->response();
        }

        if (MusicalGenre::where('id', $genre_id)->exists()) {
            $playlist->genre_id = $genre_id;
        } else {
            return (new Responser())->failed()->showMessage()->message('Seleziona il genere della playlist')->response();
        }

        $playlist->save();

        $playlist->songs()->attach($songs);

        return (new Responser())->success()->showMessage()->message('La tua playlist è stata creata')->item('playlist', $playlist)->response();
    }

    public function addSongs(Request $request, $playlist_id)
    {
        //TODO AUTH CHECK
        $songs = json_decode($request->songs);
        $playlist = Playlist::find($playlist_id);
        $playlist->songs()->syncWithoutDetaching($songs);
        $songs = $playlist->songs()->get(['song_id', 'title']);
        return (new Responser())->success()->showMessage()->message('I brani sono stati aggiunti alla playlist')->item('playlist', $playlist)->item('songs', $songs)->response();
    }
}
