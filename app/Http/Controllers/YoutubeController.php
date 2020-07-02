<?php

namespace App\Http\Controllers;

use Alaouy\Youtube\Facades\Youtube;
use App\Song;
use Illuminate\Http\Request;

class YoutubeController extends Controller
{
    //
    public function search(Request $request)
    {
        $param = $request->param;

        if (strpos($param, 'http') !== false) { //ricerca tramite link
            //check se la canzone è nel db
            $countSong = Song::where('link', $param)->count();
            if ($countSong > 0) { //la canzone è presente nel db
                $song = Song::where('link', $param)->first();
            } else { //canzone nuova cerca da youtube
                $videoId = Youtube::parseVidFromURL($param);
                $video = Youtube::getVideoInfo($videoId);

                //salviamo la canzone nel db
                $song = new Song;
                $song->title = $video->snippet->title;
                $song->link = $param;
                $song->duration = $video->contentDetails->duration;
                $song->duration = '0' . $song->duration[2] . ':' . $song->duration[4] . $song->duration[5];
                $song->save();
            }

        } else { //ricerca tramite nome

            $countSong = Song::where('title', 'LIKE', '%' . $param . '%')->count();
            if ($countSong > 0) { //la canzone è presente nel db
                $song = Song::where('title', 'LIKE', '%' . $param . '%')->first();
            } else { //canzone nuova, cerca da youtube
                $results = Youtube::search($param);
                $result = $results[0];
                $video = Youtube::getVideoInfo($result->id->videoId);

                //salviamo la canzone nel db
                $song = new Song;
                $song->title = $video->snippet->title;
                $song->link = 'https://www.youtube.com/watch?v=' . $result->id->videoId;
                $song->duration = $video->contentDetails->duration;
                $song->duration = '0' . $song->duration[2] . ':' . $song->duration[4] . $song->duration[5];
                $song->save();
            }
        }
        return $song;

    }
}
