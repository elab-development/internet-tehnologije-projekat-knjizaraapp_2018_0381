<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author_id',
        'publisher_id',
        'price',
        'page_count',
        'description',
        'format',
        'isbn',
        'cover_image_path'
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }
    public function stores()
    {
        return $this->belongsToMany(Store::class)->withPivot('stock'); // 'stock' now tracked in the pivot table
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function totalStock()
{
    return $this->stores()->sum('stock');
}
}
