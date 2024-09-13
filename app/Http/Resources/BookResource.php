<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'book';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'author' => $this->resource->author,
            'publisher' => $this->resource->publisher,
            'price' => $this->resource->price,
            'description' => $this->resource->description,
            'format' => $this->resource->format,
            'page_count' => $this->resource->page_count,
            'cover_image_path' => $this->resource->cover_image_path,
            'stores' => $this->resource->stores,
            'genres' => $this->resource->genres,
            'available' => true,
            'isbn' => $this->resource->isbn,
            'total_stock' => $this->resource->totalStock()
        ];
    }
}