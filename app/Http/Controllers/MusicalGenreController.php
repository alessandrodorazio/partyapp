<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\MusicalGenre;
use Illuminate\Http\Request;

class MusicalGenreController extends Controller
{
    //lista generi musicali
    public function index() {
        $genres = MusicalGenre::all();
        return (new Responser())->success()->showMessage()->message('Generi musicali')->item('genres', $genres)->response();
    }

    //inserimento genere musicale
    public function store(Request $request) {
        $genre = new MusicalGenre;
        $genre->name = $request->name;
        $genre->save();

        return (new Responser())->success()->showMessage()->message('Genere musicale inserito')->item('genre', $genre)->response();
    }
}
