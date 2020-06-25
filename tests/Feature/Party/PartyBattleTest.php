<?php

namespace Tests\Feature\Party;

use App\Party;
use Tests\TestCase;

class PartyBattleTest extends TestCase
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
        $response = $this->get('/api/parties/10/start');

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

}
