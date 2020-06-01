<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\MusicalGenre;
use App\Playlist;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaylistController extends Controller
{
    public function index()
    {
        $playlists = Playlist::whereIn('owner_id', [1, Auth::id()])->paginate(10);
        return (new Responser())->success()->showMessage()->message('Lista delle playlist')->item('playlists', $playlists)->response();
    }

    public function userPlaylists()
    {
        $playlists = Playlist::where('owner_id', Auth::id())->paginate(10);
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
            'genre_id' => 'required',
        ]);

        $name = $request->name;
        if ($request->owner_id) {
            $owner_id = $request->owner_id;
        } else {
            $owner_id = Auth::id();
        }
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
        $playlist = Playlist::find($playlist_id);
        if ($playlist->owner_id == Auth::id()) {
            $songs = json_decode($request->songs);

            $playlist->songs()->syncWithoutDetaching($songs);
            $songs = $playlist->songs()->get(['song_id', 'title']);
            return (new Responser())->success()->showMessage()->message('I brani sono stati aggiunti alla playlist')->item('playlist', $playlist)->item('songs', $songs)->response();

        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

    }
}
