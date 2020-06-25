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
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testAddNextSong()
    {
        $response = $this->get('/api/parties/10/addNextSong');

        $response->assertStatus(200);
    }
}
