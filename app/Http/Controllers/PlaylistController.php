<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Responser;
use App\Song;
use App\Playlist;
use App\User;
use App\MusicalGenre;


class PlaylistController extends Controller
{
    public function index()
    {
        $playlists = Playlist::all();
        return (new Responser())->success()->showMessage()->message('Lista delle playlist')->item('playlist', $playlists)->response();
    }

    public function show($playlist_id)
    {
        $playlist = Playlist::findOrFail($playlist_id);
        $songs = $playlist->playlist_song()->get(['song_id', 'title']);
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
        $songs = $request->songs;

        $playlist = new Playlist();
        $playlist->songs()->attach($songs);
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
        return (new Responser())->success()->showMessage()->message('la tua playlisty è stata creato')->item('playlist', $playlist)->response();
    }

    public function addSongs(Request $request, $id)
    {
        $songs = $request->songs;
        $playlist = Playlist::where('playlist_id', $id);
        $playlist->songs()->attach($songs);
    }
}
