<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartySongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('party_songs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('party_id')->unsigned();
            $table->bigInteger('song_id')->unsigned();
            $table->dateTime('startDate');
            $table->timestamps();

            $table->foreign('party_id')->references('id')->on('parties');
            $table->foreign('song_id')->references('id')->on('songs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('party_queue');
    }
}
