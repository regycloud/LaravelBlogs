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
        // Ambil data blog
        $blogs = Blog::all();

        // Kirim data ke komponen React Index.jsx
        return Inertia::render('Index', [
            'blogs' => $blogs,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

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
        return view('blogs.show', compact('blog'));
    }

    public function edit(Blog $blog)
    {
        // Periksa apakah user login adalah pemilik post
        if (Auth::id() !== $blog->user_id) {
            abort(403, 'Unauthorized action.');
        }

        return view('blogs.edit', compact('blog'));
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
        return redirect()->route('blogs.index')->with('success', 'Post berhasil dihapus.');
    }
}