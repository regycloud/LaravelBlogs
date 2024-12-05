<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Auth;
use App\Actions\Fortify\CreateNewUser;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\AuthController;

// Register and logout
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Need to logged in before accessing these pages
Route::middleware([HandleInertiaRequests::class, 'auth'])->group(function () {    
    // Create a new blog
    Route::get('/blogs/create', [BlogController::class, 'create'])->name('blogs.create');
    Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store');
    
    // Delete a blog
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');

    // Edit a blog
    Route::get('/blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    Route::put('/blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');
});

// Show blog in detail by ID
Route::get('/blogs/{blog}', [BlogController::class, 'show'])->name('blogs.show');

// Show blogs index
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index'); 
Route::get('/', function () {
    return Inertia::render('Home', [
        'user' => auth()->user(),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');