<?php

namespace Tests\Feature\Youtube;

use App\Song;
use Tests\TestCase;

class YoutubeSearchTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testSearch()
    {
        $response = $this->post('/api/songs/youtube/search', ['param' => 'Elegante']);
        $song = Song::where('title', 'LIKE', '%Elegante%')->first();

        $response->assertStatus(200)->assertJson($song->toArray());
    }
}
