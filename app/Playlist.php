<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    //
    protected $table = "playlist";
    protected $fillable = ["name", "genre_id", "owner_id"];
    protected $appends = ["genre"];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function genre()
    {
        return $this->belongsTo(MusicalGenre::class, 'genre_id', 'id');
    }

    public function song()
    {
        return $this->belongsToMany(Song::class, 'playlist_song', 'playlist_id', 'song_id', 'id', 'id');
    }

    public function getGenreAttribute()
    {
        return $this->genre()->first();
    }
}
