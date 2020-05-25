<?php

namespace Tests\Feature\Playlist;

use Tests\TestCase;

class PlaylistStoreTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testStoreWithoutSongs()
    {
        $response = $this->json('POST', 'api/playlists', ['name' => 'La mia prima playlist', 'owner_id' => random_int(1, 50), 'genre_id' => random_int(1, 5)]);

        $response->assertStatus(200);
    }

    public function testStoreWithSongs()
    {
        $response = $this->json('POST', 'api/playlists',
            [
                'name' => 'La mia prima playlist',
                'owner_id' => random_int(1, 50),
                'genre_id' => random_int(1, 5),
                'songs' => '[' . random_int(1, 150) . ',' . random_int(151, 300) . ',' . random_int(301, 500) . ']',
            ]);

        $response->assertStatus(200);
    }

    public function testStoreWithoutName()
    {
        $response = $this->json('POST', 'api/playlists',
            [
                'owner_id' => random_int(1, 50),
                'genre_id' => random_int(1, 5),
                'songs' => '[' . random_int(1, 150) . ',' . random_int(151, 300) . ',' . random_int(301, 500) . ']',
            ]);

        $response->assertStatus(422);
    }

    public function testStoreWithoutOwner()
    {
        $response = $this->json('POST', 'api/playlists',
            [
                'name' => 'La mia prima playlist',
                'genre_id' => random_int(1, 5),
                'songs' => '[' . random_int(1, 150) . ',' . random_int(151, 300) . ',' . random_int(301, 500) . ']',
            ]);

        $response->assertStatus(422);
    }

    public function testStoreWithoutGenre()
    {
        $response = $this->json('POST', 'api/playlists',
            [
                'name' => 'La mia prima playlist',
                'owner_id' => random_int(1, 50),
                'songs' => '[' . random_int(1, 150) . ',' . random_int(151, 300) . ',' . random_int(301, 500) . ']',
            ]);

        $response->assertStatus(422);
    }
}
