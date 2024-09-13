<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GenreBookController extends Controller
{
    // Existing methods...

    /**
     * Get all books for a specific genre.
     *
     * @param \App\Models\Genre $genre
     * @return \Illuminate\Http\Response
     */
    public function getBooksByGenre(Genre $genre)
    {
        $books = $genre->books;
        return response()->json(new BookCollection($books));
    }
}