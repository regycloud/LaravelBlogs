<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Auth;

// Logout request
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/login'); // Redirect ke halaman login setelah logout
})->name('logout');

// Need to logged in before accessing these pages
Route::middleware([HandleInertiaRequests::class, 'auth'])->group(function () {    
    // Create a new blog
    Route::get('/blogs/create', function () {
        return Inertia::render('Create'); 
    })->name('blogs.create');
    Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store');
    
    // Delete a blog
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');

    // Edit a blow
    Route::get('/blogs/{blog}/edit', function (App\Models\Blog $blog) {
    return Inertia::render('Edit', [
        'blog' => $blog, // Kirim data blog ke React
    ]);})->name('blogs.edit');
    Route::put('/blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');

    // debug
    Route::get('/blogs/create-debug', function () {
    return "Route /blogs/create-debug berhasil diakses!";});
});

// Menampilkan detail blog berdasarkan ID
Route::get('/blogs/{blog}', function (App\Models\Blog $blog) {
    return Inertia::render('Show', [
        'blog' => $blog, // Kirim data blog ke React
    ]);
})->name('blogs.show');

// Halaman daftar blog
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index'); 


Route::get('/', function () {
    return Inertia::render('Home', [
        'user' => auth()->user(),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');