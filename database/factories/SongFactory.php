<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Song;
use Faker\Generator as Faker;

$factory->define(Song::class, function (Faker $faker) {
    return [
        'title' => $faker->jobTitle
    ];
});
