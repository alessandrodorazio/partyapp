<?php

namespace Tests\Feature\Party;

use Tests\TestCase;

class PartyQueue extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetQueue()
    {
        $response = $this->get('/api/parties/10/queue');

        $response->assertStatus(200);
    }
}
