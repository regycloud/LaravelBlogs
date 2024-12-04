<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Auth;



Route::get('/blogs/{blog}', function (App\Models\Blog $blog) {
    return Inertia::render('Show', [
        'blog' => $blog, // Kirim data blog ke React
    ]);
})->name('blogs.show');
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index'); // Halaman daftar blog
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/login'); // Redirect ke halaman login setelah logout
})->name('logout');
// Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store'); // Simpan blog

Route::middleware([HandleInertiaRequests::class, 'auth'])->group(function () {
    Route::get('/blogs/create', [BlogController::class, 'create'])->name('blogs.create'); // Halaman buat blog
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');

    Route::get('/blogs/create', function () {
    return Inertia::render('Create'); // Menunjuk ke file Create.jsx
    })->name('blogs.create');


    Route::get('/blogs/{blog}/edit', function (App\Models\Blog $blog) {
    return Inertia::render('Edit', [
        'blog' => $blog, // Kirim data blog ke React
    ]);})->name('blogs.edit');

    Route::put('/blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');

    // debug
    Route::get('/blogs/create-debug', function () {
    return "Route /blogs/create-debug berhasil diakses!";});
    // Semua route Inertia.js

});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});


Route::middleware(['auth'])->group(function () {
    // Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
    // Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store');
    // Route::get('/blogs/{blog}', [BlogController::class, 'show'])->name('blogs.show');
    // Route::get('/blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    Route::put('/blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');
    // Route::delete('/blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');
});
