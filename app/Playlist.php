<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    //
    protected $table = "playlists";
    protected $fillable = ["name", "genre_id", "owner_id"];
    protected $appends = ["owner_username", "genre"];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function genre()
    {
        return $this->belongsTo(MusicalGenre::class, 'genre_id', 'id');
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'playlist_songs', 'playlist_id', 'song_id', 'id', 'id');
    }

    public function getOwnerUsernameAttribute()
    {
        return $this->owner()->first()->username;
    }

    public function getGenreAttribute()
    {
        return $this->genre()->first();
    }

}
