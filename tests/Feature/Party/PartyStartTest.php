<?php

namespace Tests\Feature\Party;

use App\Party;
use App\Playlist;
use Tests\TestCase;

class PartyStartTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testPartyStart()
    {
        $party = Party::find(10);
        $party->playlist_id = 2;
        $party->save();
        $playlist = Playlist::find(2);
        $playlist->songs()->syncWithoutDetaching([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
        $response = $this->get('/api/parties/10/start');

        $response->assertStatus(200);
    }

    public function testGetQueue()
    {
        $response = $this->get('/api/parties/10/queue');

        $response->assertStatus(200);
    }

    public function testApproveSong()
    {
        $party = Party::find(10);
        $song = $party->songs()->wherePivot('start', null)->first();
        $response = $this->get('/api/parties/10/battle/' . $song->id . '/vote');

        $response->assertStatus(200);
    }

    public function testRandomSongs()
    {
        $response = $this->get('/api/parties/10/battle/randomSongs');
        $response->assertStatus(200);
    }

    public function testSuggestSongOk()
    {
        $response = $this->get('/api/parties/104/songs/143/suggest');

        $response->assertStatus(200);
    }

    public function testSuggestSongWrong()
    {
        $response = $this->get('/api/parties/104/songs/421521/suggest');

        $response->assertStatus(500);
    }

}
