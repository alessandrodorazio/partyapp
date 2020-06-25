<?php

namespace Tests\Feature\Party;

use Tests\TestCase;

class PartyBattleTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testApproveSong()
    {
        $response = $this->get('/api/parties/10/battle/63/vote');

        $response->assertStatus(200);
    }

    public function testRandomSongs()
    {
        $response = $this->get('/api/parties/10/battle/randomSongs');
        $response->assertStatus(200);
    }

}
