<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //lista utenti
    public function index() {
        $users = User::paginate(10);
        return (new Responser())->success()->showMessage()->message('Lista utenti')->item('users', $users)->response();
    }

    //profilo utente
    public function show($user_id) {
        $user = User::with('playlists')->with('parties')->with('following')->with('followers')->find($user_id);
        if(! $user) {
            return (new Responser())->failed()->showMessage()->message('Utente non trovato')->statusCode(404)->response();
        }
        return (new Responser())->success()->showMessage()->message('Profilo utente')->item('user', $user)->response();
    }

    //ricerca utenti email/username
    public function search($value){
        if(strpos($value, '@') !== false) {
            //ricerca per email
            $users = User::where('email', $value)->get();
        } else {
            $users = User::where('username', 'LIKE', "%$value%")->get();
        }

        return (new Responser())->success()->showMessage()->message('Lista utenti trovati')->item('users', $users)->response();

    }



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
