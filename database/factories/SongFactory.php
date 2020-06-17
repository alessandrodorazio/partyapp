<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Song;
use Faker\Generator as Faker;

$factory->define(Song::class, function (Faker $faker) {
    return [
        'title' => $faker->jobTitle,
        'duration' => '0' . random_int(1, 5) . ':' . random_int(0, 5) . random_int(0, 9),
    ];
});
