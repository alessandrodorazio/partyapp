<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Party;
use Faker\Generator as Faker;

$factory->define(Party::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'party_type' => random_int(1, 2),
        'private_party' => $faker->boolean,
        'owner_id' => random_int(1,50),
        'mood_id' => random_int(1,5)
    ];
});
