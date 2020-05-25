<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PlaylistTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function PlaylistStoreOk()
    {
        $response = $this->json('POST', 'api/playlists', [
            'name' => 'Creazione party con test',
            'owner_id' => '15',
            'gerne_id' => '2',
        ]);
        $response->assertStatus(200);
    }
}
