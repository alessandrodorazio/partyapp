<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    //
    protected $table = "parties";
    protected $fillable = ["name", "party_type", "private_party", "owner_id", "mood_id"];
    protected $appends = ["mood", "link", "countParticipants"];
    protected $hidden = ['pivot'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function mood()
    {
        return $this->belongsTo(PartyMood::class, 'mood_id', 'id');
    }

    public function getMoodAttribute()
    {
        return $this->mood()->first();
    }

    public function playlists()
    {
        return $this->belongsTo(Playlist::class, 'playlist_id', 'id');
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'party_songs', 'party_id', 'song_id', 'id', 'id')->withPivot('start', 'votes');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'participants', 'party_id', 'user_id', 'id', 'id');
    }

    public function getLinkAttribute()
    {
        //TODO CUSTOM LINK
        return url('/parties/' . $this->id);
    }

    public function getCountParticipantsAttribute()
    {
        return $this->participants()->count();
    }

}
