<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location'
    ];

    // Many-to-Many relationship with Book
    public function books()
    {
        return $this->belongsToMany(Book::class)->withPivot('stock'); // 'stock' is stored in the pivot table
    }
}
