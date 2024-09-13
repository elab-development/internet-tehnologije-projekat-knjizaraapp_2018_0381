<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GenreController extends Controller
{
    /**
     * Display a listing of the genres.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $genres = Genre::all();
        return response()->json($genres);
    }

    /**
     * Store a newly created genre in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $genre = Genre::create($request->all());
        return response()->json($genre, Response::HTTP_CREATED);
    }

    /**
     * Display the specified genre.
     *
     * @param \App\Models\Genre $genre
     * @return \Illuminate\Http\Response
     */
    public function show(Genre $genre)
    {
        return response()->json($genre);
    }

    /**
     * Update the specified genre in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Genre $genre
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Genre $genre)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $genre->update($request->all());
        return response()->json($genre);
    }

    /**
     * Remove the specified genre from storage.
     *
     * @param \App\Models\Genre $genre
     * @return \Illuminate\Http\Response
     */
    public function destroy(Genre $genre)
    {
        $genre->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}