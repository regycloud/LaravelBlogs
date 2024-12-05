<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;



class AuthController extends Controller
{
    use AuthorizesRequests;
    
    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
    
}