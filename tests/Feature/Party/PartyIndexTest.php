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
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testIndexOk()
    {
        $response = $this->json('GET', 'api/parties');

        $response->assertStatus(200);
    }
}
