<?php

namespace Tests\Feature\Playlist;

use Tests\TestCase;

class PlaylistIndexTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testIndexOk()
    {
        $response = $this->get('api/playlists');
        $response->assertStatus(200);
    }
}
