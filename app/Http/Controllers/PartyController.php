<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\Party;
use App\PartyMood;
use App\User;
use Illuminate\Http\Request;

class PartyController extends Controller
{
    //
    public function index()
    {
        $parties = Party::where('private_party', 0)->get();
        return (new Responser())->success()->showMessage()->message('Lista dei party pubblici')->item('parties', $parties)->response();
    }

    public function show($party_id)
    {
        $party = Party::findOrFail($party_id);
        $participants = $party->participants()->get(['user_id', 'username']);
        return (new Responser())->success()->showMessage()->message('Informazioni sul party')->item('party', $party)->item('participants', $participants)->response();
    }

    public function create()
    {}

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'party_type' => 'required|integer|min:1|max:2',
            'private_party' => 'integer|min:0|max:1',
            'owner_id' => 'required',
            'mood_id' => 'required',
        ]);

        $name = $request->name;
        $party_type = $request->party_type;
        if ($request->private_party) {
            $private_party = $request->private_party;
        } else {
            $private_party = 0;
        }
        $owner_id = $request->owner_id; //TODO AUTH => Auth::id()
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
}
