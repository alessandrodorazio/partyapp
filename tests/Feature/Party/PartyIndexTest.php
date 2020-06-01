<?php

namespace Tests\Feature;

use Tests\TestCase;

class PartyIndexTest extends TestCase
{

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndexOk()
    {
        $response = $this->json('GET', 'api/parties');

        $response->assertStatus(200);
    }
}
