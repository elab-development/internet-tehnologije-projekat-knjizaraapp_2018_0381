<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        // Check if the user is authenticated and has the required role
        if ($request->user() && $request->user()->role === $role) {
            return $next($request);
        }

        // If the user does not have the required role, return a 403 response
        abort(403, 'Unauthorized.');
    }
}
