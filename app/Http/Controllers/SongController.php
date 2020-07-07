<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\Song;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::all();
        return (new Responser())->showMessage()->message('Lista canzoni')->item('songs', $songs)->response();
    }
}
