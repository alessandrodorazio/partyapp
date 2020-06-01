<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{

    public function generateRandomString($length = 10)
    {
        return substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
    }

    /** @test */
    public function registerTestEmail()
    {
        if (!(User::where('email', '=', 'test@email.com')->exists())) {
            $response = $this->post('api/auth/register', [
                'username' => $this->generateRandomString(),
                'email' => 'test@email.com',
                'password' => '123456',
            ]);
            $response->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
        }

        $this->expectNotToPerformAssertions();

    }

    /** @test */
    public function it_will_register_a_user()
    {
        $response = $this->post('api/auth/register', [
            'username' => $this->generateRandomString(),
            'email' => $this->generateRandomString() . '@email.com',
            'password' => '123456',
        ]);

        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in',
        ]);
    }

    /** @test */
    public function it_will_log_a_user_in()
    {
        $response = $this->post('api/auth/login', [
            'email' => 'test@email.com',
            'password' => '123456',
        ]);

        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in',
        ]);
    }

    /** @test */
    public function it_will_not_log_an_invalid_user_in()
    {
        $response = $this->post('api/auth/login', [
            'email' => 'test@email.com',
            'password' => 'notlegitpassword',
        ]);

        $response->assertJsonStructure([
            'error',
        ]);
    }
}
