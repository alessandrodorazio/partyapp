<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'pivot',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function setPasswordAttribute($password)
    {
        if (!empty($password)) {
            $this->attributes['password'] = bcrypt($password);
        }
    }

    public function playlists()
    {
        return $this->hasMany(Playlist::class, 'owner_id');
    }

    public function parties()
    {
        return $this->hasMany(Party::class, 'owner_id');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'following', 'follower');
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower', 'following');
    }

    public function favoritesSongs()
    {
        return $this->belongsToMany(Song::class, 'user_id', 'song_id');
    }

    public function addFavoriteSong($song_id)
    {
        $this->favoritesSongs()->attach($song_id);
        $song = Song::find($song_id);
        $song->favorites++;
        $song->save();
    }

    public function removeFavoriteSong($song_id)
    {
        $this->favoritesSongs()->detach($song_id);
        $song = Song::find($song_id);
        $song->favorites--;
        $song->save();
    }
}
