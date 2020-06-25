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
    public function testExample()
    {
        $response = $this->get('/api/parties/10/start');

        $response->assertStatus(200);
    }
}
