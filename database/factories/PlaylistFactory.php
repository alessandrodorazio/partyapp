<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Playlist;
use Faker\Generator as Faker;

$factory->define(Playlist::class, function (Faker $faker) {
    return [
        'name' => $faker->colorName,
        'genre_id' => random_int(1, 5),
        'owner_id' => random_int(1,50),
    ];
});
