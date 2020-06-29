<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esportazione delle canzoni</title>

    <style>
    table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    }
    th, td {
    padding: 5px;
    text-align: left;
    }
    </style>
</head>
<body>
    <h1>Esportazione delle canzoni</h1>
    <p>Party: {{ $party->name }}</p>
    <p>Playlist: {{ $playlist->name }}</p>
    <p>Creato da {{ $user->username }}</p>

    <h2>Lista delle canzoni</h2>
    <table>
        <thead>
            <tr>
                <th>Nome canzone</th>
                <th>Autori</th>
            </tr>
        </thead>
        <tbody>
            @foreach($songs as $song)
                <tr>
                    <td>{{ $song->title }} </td>
                    <td>
                        @foreach($song->authors as $author)
                            {{ $author->name }}{{ $author->name != $song->authors->last()->name?',':''}}
                        @endforeach
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
PROVA!
{{ $user->email }}
