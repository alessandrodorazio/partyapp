<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class PartyStoreTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testStoreOk()
    {
        $response = $this->json('POST', 'api/parties',
            ['name' => 'Party creato testando',
                'party_type' => 1, 'private_party' => 1,
                'owner_id' => 32,
                'mood_id' => 3]);
        $response->assertStatus(200);
    }

    public function testStoreWrongPartyType()
    {
        $response = $this->json('POST', 'api/parties',
            ['name' => 'Party creato testando',
                'party_type' => 6,
                'private_party' => 1,
                'owner_id' => 32,
                'mood_id' => 3]);
        $response->assertStatus(422);
    }

    public function testStoreWrongPrivateParty()
    {
        $response = $this->json('POST', 'api/parties', ['name' => 'Party creato testando', 'party_type' => 1, 'private_party' => 9, 'owner_id' => 32, 'mood_id' => 3]);
        $response->assertStatus(422);
    }

    public function testStoreWithoutPrivateParty()
    {
        $response = $this->json('POST', 'api/parties', ['name' => 'Party creato testando', 'party_type' => 1, 'owner_id' => 32, 'mood_id' => 3]);
        $response->assertStatus(200);
    }

    public function testStoreWrongOwner()
    {
        $lastOwner = User::orderBy('id', 'desc')->first();
        $owner_id = $lastOwner->id + 100;
        $response = $this->json('POST', 'api/parties', ['name' => 'Party creato testando', 'party_type' => 1, 'private_party' => 9, 'owner_id' => $owner_id, 'mood_id' => 3]);
        $response->assertStatus(422);
    }

    public function testStoreWithoutOwner()
    {
        $response = $this->json('POST', 'api/parties', ['name' => 'Party creato testando', 'party_type' => 1, 'mood_id' => 3]);
        $response->assertStatus(422);
    }

    public function testStoreWithoutMood()
    {
        $response = $this->json('POST', 'api/parties', ['name' => 'Party creato testando', 'party_type' => 1, 'owner_id' => 32]);
        $response->assertStatus(422);
    }
}
