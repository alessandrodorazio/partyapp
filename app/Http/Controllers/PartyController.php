<?php

namespace App\Http\Controllers;

use App\Helper\CollectionHelper;
use App\Http\Responser;
use App\Party;
use App\PartyMood;
use App\Playlist;
use App\Song;
use App\User;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

        //aggiungere come partecipante se si tratta di un utente autenticato
        if (Auth::check()) {
            if ($party->participants()->where('user_id', Auth::id())->count() == 0) {
                $party->participants()->syncWithoutDetaching(Auth::id());
                $user = User::find(Auth::id());
                $user->points += 25;
                $user->save();
            }
        }

        return (new Responser())->success()->showMessage()->message('Informazioni sul party')->item('party', $party)->item('songs', $songs)->item('participants', $participants)->response();
    }

    public function create()
    {
    }

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
            $user = User::find($owner_id);
            if ($user) {
                $user->points += 75;
                $user->save();
            }
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
    public function closeParty($party_id)
    {
        DB::table('party_songs')->where('party_id', $party_id)->update(['start' => Carbon::now()]);
        return (new Responser())->success()->showMessage()->message('Il tuo party è stato concluso')->response();
    }

    //seleziona canzoni per la battle

    public function randomSongsBattle($party_id)
    {
        $party = Party::find($party_id);
        $songsForBattle = $party->songs()->wherePivot('start', null)->limit(2)->get();
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
        $nextSong = false;

        if ($song_id) { //se è stata passata una canzone
            $song = Song::find($song_id);
            $nextSong = true;
        } else {
            if ($party->party_type === 1) { //battle
                //selezioniamo la canzone passata tramite richiesta HTTP
                $song = $party->songs()->wherePivot('start', null)->orderBy('party_songs.votes', 'desc')->first();
                $party->songs()->syncWithoutDetaching($song->id);
                $nextSong = true;
            } else { //democracy
                //canzone più votata
                $song = $party->songs()->wherePivot('start', null)->orderBy('favorites', 'desc')->first();
                if ($song) {
                    $nextSong = true;
                }
            }
        }

        if ($nextSong == false) {
            return (new Responser())->success()->showMessage()->message('Party concluso')->response();
        }

        //la canzone deve partire appena dopo quella attuale
        $previousSong = $party->songs()->wherePivotNotNull('start')->orderBy('party_songs.start', 'desc')->first();

        $duration = $previousSong->duration;
        $minutes = $duration[1];
        $seconds = $duration[3] . $duration[4];

        $timeNextSong = Carbon::createFromFormat('Y-m-d H:i:s', $previousSong->pivot->start)->addMinutes($minutes)->addSeconds($seconds)->addSeconds(5);
        $now = Carbon::now();
        if (!$song) {
            return (new Responser())->success()->showMessage()->message('Party concluso')->response();
        }
        if ($timeNextSong < $now) {
            $party->songs()->updateExistingPivot($song->id, ['start' => $now]);
        } else {
            $party->songs()->updateExistingPivot($song->id, ['start' => $timeNextSong]);
        }

        $song = $party->songs()->wherePivotNotNull('start')->orderBy('party_songs.start', 'desc')->first();

        return (new Responser())->success()->showMessage()->message('Prossima canzone')->item('song', $song)->response();
    }

    //ritorna la canzone attuale e la successiva, deve essere richiamata prima della fine della prossima canzone
    public function getQueue($party_id)
    {
        $party = Party::find($party_id);
        $previousSong = $party->songs()->wherePivot('start', '<', Carbon::now()->addHours(2))->orderBy('party_songs.start', 'desc')->first();
        $nextSong = $party->songs()->wherePivot('start', '>=', Carbon::now()->addHours(2))->orderBy('party_songs.start', 'asc')->first();
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
    //visualizzazione party di utenti che seguo che non sono ancora iniziati
    public function upcomingParties()
    {

        $user = User::find(Auth::id());
        $followingUser = $user->following()->get();
        $parties = [];
        foreach ($followingUser as $user) {
            $partiesApp = $user->parties()->get();
            foreach ($partiesApp as $party) {
                if ($party->songs()->count() == 0) {
                    $parties[] = $party;
                }
            }
        }
        return (new Responser())->success()->showMessage()->message('Party che stanno per iniziare')->item('parties', \App\Helper\CollectionHelper::paginate(new Collection($parties), 10))->response();
    }
    //visualizzazione party di utenti che seguo che non sono già iniziati
    public function startedParties()
    {

        $user = User::find(Auth::id());
        $followingUser = $user->following()->get();

        $parties = [];
        foreach ($followingUser as $user) {
            $partiesApp = $user->parties()->get();
            foreach ($partiesApp as $party) {
                if ($party->songs()->wherePivot('start', null)->count() > 0) {
                    $parties[] = $party;
                }
            }
        }
        return (new Responser())->success()->showMessage()->message('Party iniziati')->item('parties', \App\Helper\CollectionHelper::paginate(new Collection($parties), 10))->response();
    }
}
