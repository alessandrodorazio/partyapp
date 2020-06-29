<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\Party;
use App\PartyMood;
use App\Playlist;
use App\Song;
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

        if ($request->playlist_id) {
            $playlist_id = $request->playlist_id;
            $party->playlist_id = $playlist_id;
        }

        $party->save();
        return (new Responser())->success()->showMessage()->message('Il tuo party è stato creato')->item('party', $party)->response();
    }

    //inizializza il party
    public function startParty($party_id)
    {
        //aggiunge le canzoni della playlist a "party_songs"

        //TODO verifica che l'utente sia corretto

        //TODO verifica che non ci sia nessuna canzone nel party, altrimenti significa che è iniziato

        $now = Carbon::now()->addHours(2);

        $party = Party::find($party_id);
        $playlist = Playlist::with('songs')->find($party->playlists->id);
        $songs = $playlist->songs()->get()->pluck('id');

        $party->songs()->sync($songs);
        $firstSong = $party->songs()->first();
        $firstSong->pivot->start = $now;
        $firstSong->pivot->save();

        return (new Responser())->success()->item('party', $party)->item('next_song', $firstSong)->response();

    }

    //seleziona canzoni per la battle
    public function randomSongsBattle($party_id)
    {
        $party = Party::find($party_id);
        $songsForBattle = $party->songs()->wherePivot('start', null)->inRandomOrder()->limit(2)->get();
        return $songsForBattle;
    }

    //aggiungi voto alla canzone
    public function addVoteSongBattle($party_id, $song_id)
    {
        $party = Party::find($party_id);
        $song = $party->songs()->where('song_id', $song_id)->withPivot('votes')->first();
        $song->pivot->votes++;
        $song->pivot->save();
        return $song;
    }

    //consiglia una canzone
    public function suggestSong($party_id, $song_id)
    {
        //TODO verificare che non sia già stata consigliata
        $party = Party::find($party_id);
        $party->songs()->syncWithoutDetaching($song_id);
        $party->songs()->updateExistingPivot($song_id, ['approved' => 0]);
        return (new Responser())->success()->showMessage()->message('Canzone consigliata')->response();
    }

    //ritorna le canzoni consigliate per un party
    public function suggestedSongs($party_id)
    {
        $party = Party::find($party_id);
        $songs = $party->songs()->wherePivot('approved', 0)->get();
        return (new Responser())->success()->message('Canzoni in attesa di essere approvate')->showMessage()->item('songs', $songs)->response();
    }

    //approva una canzone nella playlist
    public function approveSong($party_id, $song_id)
    {
        $party = Party::find($party_id);
        $party->songs()->updateExistingPivot($song_id, ['approved' => 1]);
        return (new Responser())->success()->showMessage()->message('Canzone inserita in coda')->response();
    }

    //imposta la prossima canzone, deve essere richiamata 20 secondi prima che la canzone debba iniziare
    public function addNextSong($party_id, $song_id = null)
    {
        //TODO controllare se non c'è più nulla
        $party = Party::find($party_id);

        if ($song_id) { //se è stata passata una canzone
            $song = Song::find($song_id);
        } else {
            if ($party->type === 1) { //battle
                //selezioniamo la canzone passata tramite richiesta HTTP
                $party->songs()->syncWithoutDetaching($song_id);
            } else { //democracy
                //canzone più votata
                $song = $party->songs()->wherePivot('start', null)->orderBy('favorites', 'desc')->first();
            }
        }

        //la canzone deve partire appena dopo quella attuale
        $previousSong = $party->songs()->wherePivotNotNull('start')->orderBy('party_songs.start', 'desc')->first();

        $duration = $previousSong->duration;
        $minutes = $duration[1];
        $seconds = $duration[3] . $duration[4];

        $timeNextSong = Carbon::createFromFormat('Y-m-d H:i:s', $previousSong->pivot->start)->addMinutes($minutes)->addSeconds($seconds)->addSeconds(5);

        $party->songs()->updateExistingPivot($song->id, ['start' => $timeNextSong]);

        $song = $party->songs()->wherePivotNotNull('start')->orderBy('party_songs.start', 'desc')->first();

        return (new Responser())->success()->showMessage()->message('Prossima canzone')->item('song', $song)->response();

    }

    //ritorna la canzone attuale e la successiva, deve essere richiamata prima della fine della prossima canzone
    public function getQueue($party_id)
    {
        $party = Party::find($party_id);
        $previousSong = $party->songs()->wherePivot('start', '<', Carbon::now()->addHours(2))->first();
        $nextSong = $party->songs()->wherePivot('start', '>=', Carbon::now()->addHours(2))->first();
        return (new Responser())->success()->showMessage()->message('Coda del party')->item('previousSong', $previousSong)->item('nextSong', $nextSong)->response();
    }

    //esportazione PDF per la SIAE
    public function exportCopyright($party_id)
    {
        $party = Party::find($party_id);
        $user = User::find($party->owner_id);

        //TODO sync playlist e party
        $playlist = Playlist::find(129);
        $songs = $playlist->songs()->get();
        $pdf = PDF::loadView('party.export.copyright', ['user' => $user, 'party' => $party, 'playlist' => $playlist, 'songs' => $songs]);
        return $pdf->download('invoice.pdf');
    }
}
