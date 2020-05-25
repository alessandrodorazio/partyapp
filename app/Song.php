<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $table = "songs";
    protected $fillable = ["title"];
    protected $hidden = ["pivot"];

}
