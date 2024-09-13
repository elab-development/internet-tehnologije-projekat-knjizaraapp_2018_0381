<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'order';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'user' => $this->resource->user,
            'status' => $this->resource->status,
            'total_amount' => $this->resource->total_amount,
            'items' => $this->resource->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'book' => new BookResource($item->book),
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                ];
            }),
        ];
    }
}
