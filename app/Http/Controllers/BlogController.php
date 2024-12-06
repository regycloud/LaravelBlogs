<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;



class BlogController extends Controller
{
    use AuthorizesRequests;
    
    public function index()
    {
        // Ambil data blog dengan relasi user
        $blogs = Blog::with('user')->get();

        // Kirim data ke komponen React Index.jsx
        return Inertia::render('Index', [
            'blogs' => $blogs,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);}

    public function create()
    {
        return Inertia::render('Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
        ]);

        Blog::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return redirect()->route('blogs.index');
    }

    public function show(Blog $blog)
    {
        $blog->load('user');
        // dd($blog);
        return Inertia::render('Show', [
            'blog' => $blog

        ]);
    }

    public function edit(Blog $blog)
    {
        // Check the owner of the post
        if (Auth::id() !== $blog->user_id) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Edit', [
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $this->authorize('update', $blog);

        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
        ]);

        $blog->update($request->all());

        return redirect()->route('blogs.index');
    }

    public function destroy(Blog $blog)
    {
        if (Auth::id() !== $blog->user_id) {
            abort(403, 'Unauthorized action.');
        }
    
        $blog->delete();
    
        return redirect()->route('blogs.index')->with('message', 'Post berhasil dihapus.');
    }

    public function register()
    {
        return Inertia::render('Register');
    }

    
}