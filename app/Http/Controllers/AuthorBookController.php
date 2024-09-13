<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\Book;
use Illuminate\Http\Request;

class AuthorBookController extends Controller
{
    public function index($author_id)
    {
        $books = Book::get()->where('author_id', $author_id);
        if (is_null($books)) {
            return response()->json('Books not found', 404);
        }
        return response()->json(new BookCollection($books));
    }
}
