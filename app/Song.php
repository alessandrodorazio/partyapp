<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $table = "songs";
    protected $fillable = ["title"];
    protected $hidden = ["pivot"];

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'song_authors', 'song_id', 'author_id');
    }

}
