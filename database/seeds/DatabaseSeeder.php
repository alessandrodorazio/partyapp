<?php

use App\MusicalGenre;
use App\PartyMood;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        PartyMood::insert([
            ['name' => '80s songs'],
            ['name' => '90s songs'],
            ['name' => '00s songs'],
            ['name' => 'Cartoons'],
            ['name' => 'Rave']
        ]);

        MusicalGenre::insert([
            ['name' => 'Rap'],
            ['name' => 'Techno'],
            ['name' => 'Dubstep'],
            ['name' => 'Rock'],
            ['name' => 'Pop']
        ]);
        // $this->call(UserSeeder::class);
        // CHIAMIAMO LE FACTORY

        factory(App\User::class, 50)->create();
        factory(App\Party::class,100)->create();
        factory(App\Playlist::class, 250)->create();
        factory(App\Song::class, 500)->create();
        factory(App\Author::class, 1000)->create();


        for($i = 0; $i<=1000; $i++) {
            DB::table('invite_user_to_party')->insert(['user_id' => random_int(1, 50), 'party_id' => random_int(1, 100)]);
            DB::table('participants')->insert(['user_id' => random_int(1, 50), 'party_id' => random_int(1, 100)]);
            DB::table('invite_user_to_party')->insert(['user_id' => random_int(1, 50), 'party_id' => random_int(1, 100)]);
            DB::table('playlist_songs')->insert(['playlist_id' => random_int(1, 250), 'song_id' => random_int(1, 500)]);
            DB::table('song_authors')->insert(['song_id' => random_int(1, 500), 'author_id' => random_int(1, 1000)]);

        }

    }
}
