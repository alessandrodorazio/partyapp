<?php

namespace Tests\Feature\Party;

use Tests\TestCase;

class PartyAddNextSong extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/api/parties/10/addNextSong');

        $response->assertStatus(200);
    }
}
