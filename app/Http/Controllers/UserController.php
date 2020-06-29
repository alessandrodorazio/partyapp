<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function changePassword(Request $request, $user_id)
    {

        $validatedData = $request->validate([
            'old_password' => 'required',
            'new_password' => 'required',
        ]);

        //check se l'utente autenticato sta provando a modificare la sua password
        if (Auth::id() != $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $oldPassword = $request->old_password;
        $newPassword = $request->new_password;

        $user = User::find($user_id);
        if (Hash::check($request->old_password, $user->password)) {
            $user->password = $newPassword;
            $user->save();
            return (new Responser())->success()->showMessage()->message('Password modificata')->item('user', $user)->response();
        } else {
            return (new Responser())->failed()->showMessage()->message('La vecchia password è errata')->response();
        }

    }
}
