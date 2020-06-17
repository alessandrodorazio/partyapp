<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('party_type'); // 1 = battle, 2 = democracy
            $table->tinyInteger('private_party')->default(0); // 0 = public, 1 = private
            $table->bigInteger('owner_id')->unsigned();
            $table->bigInteger('mood_id')->unsigned();
            $table->bigInteger('playlist_id')->unsigned()->nullable();
            $table->timestamps();
            $table->foreign('owner_id')->references('id')->on('users');
            $table->foreign('mood_id')->references('id')->on('party_moods');
            $table->foreign('playlist_id')->references('id')->on('playlists');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parties');
    }
}
