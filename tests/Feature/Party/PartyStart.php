<?php

namespace Tests\Feature\Party;

use Tests\TestCase;

class PartyStart extends TestCase
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
}
