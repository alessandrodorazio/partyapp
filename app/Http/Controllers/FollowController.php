<?php

namespace App\Http\Controllers;

use App\Http\Responser;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    //lista persone che seguiamo
    public function following() {
        $user = User::find(Auth::id());
        return (new Responser())->success()->showMessage()->message('Persone seguite da '. $user->username)->item('following', $user->following()->paginate(10))->response();
    }

    //lista persone che ci seguono
    public function followers() {
        $user = User::find(Auth::id());
        return (new Responser())->success()->showMessage()->message('Persone che seguono '. $user->username)->item('following', $user->followers()->paginate(10))->response();
    }

    //nuovo follow
    public function store(Request $request) {
        $user = User::find(Auth::id());
        $following = $request->following;
        $user->following()->attach($following);
        return (new Responser())->success()->showMessage()->message('Persona aggiunta')->response();
    }

    public function destroy($following_id) {
        $user = User::find(Auth::id());
        $following = $following_id;
        $user->following()->detach($following);
        return (new Responser())->success()->showMessage()->message('Persona rimossa')->response();
    }
}
