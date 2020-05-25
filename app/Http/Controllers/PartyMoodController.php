<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\PartyMood;

class PartyMoodController extends Controller
{
    //
    public function index()
    {
        $partyMoods = PartyMood::all();
        return (new Responser())->success()->showMessage()->message('Lista dei party moods')->item('party_moods', $partyMoods)->response();
    }
}
