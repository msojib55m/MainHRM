<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // Allow requests from all origins (*). You can replace '*' with specific domains if needed.
        $response->headers->set('Access-Control-Allow-Origin', '*');
        
        // Allow these HTTP methods.
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        
        // Allow these headers in the request.
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Return the response with the headers
        return $response;
    }
}
