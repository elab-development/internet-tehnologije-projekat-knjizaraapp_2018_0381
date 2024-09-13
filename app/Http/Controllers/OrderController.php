<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Models\Book;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // If the user is an admin, return all orders
        if ($request->user()->hasRole('admin')) {
            $orders = Order::all();
        } else {
            // If the user is a customer, return only their orders
            $orders = Order::where('user_id', $request->user()->id)->get();
        }

        return new OrderCollection($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.book_id' => 'required|exists:books,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Fetch all book IDs from the request
            $bookIds = array_column($request->items, 'book_id');
        
            // Fetch books and their stock from the book_store pivot table
            $books = Book::with('stores')->whereIn('id', $bookIds)->get();
        
            // Check stock availability
            foreach ($request->items as $item) {
                $book = $books->find($item['book_id']);
                $stock = $book->stores->sum(function($store) use ($item) {
                    return $store->pivot->stock;
                });
        
                if ($stock < $item['quantity']) {
                    // Rollback transaction and return error response
                    DB::rollBack();
                    return response()->json(['error' => 'Insufficient stock for book ID ' . $item['book_id']], 400);
                }
            }
        
            // Calculate total
            $total = array_reduce($request->items, function ($carry, $item) use ($books) {
                $book = $books->find($item['book_id']);
                $price = $book->price; // Adjust if needed to get the price based on book format or store
                return $carry + ($item['quantity'] * $price);
            }, 0);
        
            // Create order
            $order = Order::create([
                'user_id' => $request->user()->id,
                'total_amount' => $total,
                'status' => 'pending'
            ]);
        
            // Create order items and update stock
            foreach ($request->items as $item) {
                $book = $books->find($item['book_id']);
                
                // Update stock for each store
                foreach ($book->stores as $store) {
                    $storePivot = $store->pivot;
                    if ($storePivot->stock >= $item['quantity']) {
                        $storePivot->stock -= $item['quantity'];
                        $storePivot->save();
        
                        $order->items()->create([
                            'book_id' => $item['book_id'],
                            'quantity' => $item['quantity'],
                            'price' => $book->price
                        ]);
        
                        break; // Exit loop after successfully updating stock
                    }
                }
            }
        
            // Commit the transaction
            DB::commit();
        
            return response()->json(['order' => new OrderResource($order)], 201);

        } catch (\Exception $e) {
            // Rollback transaction if there is an error
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while processing your order'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Order $order)
    {
        // Check if the user is an admin
        if ($request->user()->hasRole('admin')) {
            return new OrderResource($order);
        }

        // If the user is a customer, ensure they can only view their own orders
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['error' => 'You are not authorized to view this order'], 403);
        }

        return new OrderResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $order->status = $request->status;
        $order->save();

        return response()->json(['message' => 'Order updated successfully', 'order' => new OrderResource($order)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json('order deleted successfully');
    }
}
