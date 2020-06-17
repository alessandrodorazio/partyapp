<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\Party;
use App\PartyMood;
use App\Playlist;
use App\User;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PartyController extends Controller
{
    //
    public function index()
    {
        $parties = Party::where('private_party', 0)->paginate(10);
        return (new Responser())->success()->showMessage()->message('Lista dei party pubblici')->item('parties', $parties)->response();
    }

    public function userParties()
    {
        $parties = Party::where('owner_id', Auth::id())->paginate(10);
        return (new Responser())->success()->showMessage()->message('Party dell\' utente')->item('parties', $parties)->response();
    }

    public function show($party_id)
    {
        $party = Party::findOrFail($party_id);
        $songs = $party->songs()->get();
        $participants = $party->participants()->get(['user_id', 'username']);
        return (new Responser())->success()->showMessage()->message('Informazioni sul party')->item('party', $party)->item('songs', $songs)->item('participants', $participants)->response();
    }

    public function create()
    {}

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'party_type' => 'required|integer|min:1|max:2',
            'private_party' => 'integer|min:0|max:1',
            'mood_id' => 'required',
        ]);

        $name = $request->name;
        $party_type = $request->party_type;
        if ($request->private_party) {
            $private_party = $request->private_party;
        } else {
            $private_party = 0;
        }
        if ($request->owner_id) {
            $owner_id = $request->owner_id;
        } else {
            $owner_id = Auth::id();
        }
        $mood_id = $request->mood_id;

        $party = new Party();
        $party->name = $name;

        if ($party_type == 1 || $party_type == 2) {
            $party->party_type = $party_type;
        } else {
            return (new Responser())->failed()->showMessage()->message('Devi inserire il tipo del party')->response();
        }

        if ($private_party == 0 || $private_party == 1) {
            $party->private_party = $private_party;
        }

        if (User::where('id', $owner_id)->exists()) {
            $party->owner_id = $owner_id;
        } else {
            return (new Responser())->failed()->showMessage()->message('Ooops... non riusciamo a trovare il tuo utente')->response();
        }

        if (PartyMood::where('id', $mood_id)->exists()) {
            $party->mood_id = $mood_id;
        } else {
            return (new Responser())->failed()->showMessage()->message('Seleziona il mood del party')->response();
        }

        $party->save();
        return (new Responser())->success()->showMessage()->message('Il tuo party è stato creato')->item('party', $party)->response();
    }

    public function startParty($party_id)
    {
        //aggiunge le canzoni della playlist a "party_songs"
        $party = Party::find($party_id);
        $playlist = $party->playlist;
        return $playlist;
        $now = Carbon::now()->addHours(2);

        $duration = "03:50";
        $minutes = $duration[1];
        $seconds = $duration[3] . $duration[4];

        $now->addMinutes($minutes)->addSeconds($seconds);
    }

    public function updateQueue(Request $request)
    {

    }

    public function getQueue($party_id)
    {

    }

    public function exportCopyright($party_id)
    {
        $party = Party::find($party_id);
        $user = User::find($party->owner_id);

        //TODO sync playlist
        $playlist = Playlist::find(129);
        $songs = $playlist->songs()->get();
        $pdf = PDF::loadView('party.export.copyright', ['user' => $user, 'party' => $party, 'playlist' => $playlist, 'songs' => $songs]);
        return $pdf->download('invoice.pdf');
    }
}
