<?php

namespace Tests\Feature\User;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserShowTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testShowUserOk()
    {
        $response = $this->get('api/users/1');
        $response->assertStatus(200)->assertJsonPath('success', true);
    }

    public function testShowUserFail()
    {
        $usersCount = User::count();
        $usersCount++;
        $response = $this->get('api/users/'.$usersCount);
        $response->assertStatus(404)->assertJsonPath('success', false);
    }
}
