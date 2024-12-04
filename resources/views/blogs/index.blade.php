<h1>Daftar Blog</h1>
@if (Auth::check())
<a href="{{ route('blogs.create') }}">Buat Blog Baru</a>
@endif
@if ($blogs->isEmpty())
    <p>Tidak ada blog yang tersedia saat ini.</p>
@else
<ul>
    @foreach ($blogs as $blog)
        <li>
            <a href="{{ route('blogs.show', $blog->id) }}">{{ $blog->title }}</a>
            <!-- @if (Auth::check())
            <a href="{{ route('blogs.edit', $blog->id) }}">Edit</a>
            <form method="POST" action="{{ route('blogs.destroy', $blog->id) }}">
                @csrf
                @method('DELETE')
                <button type="submit">Hapus</button>
            </form>
            @endif -->
            @if (Auth::check() && Auth::id() === $blog->user_id)
            <a href="{{ route('blogs.edit', $blog) }}" style="color: blue;">Edit</a>
            <form action="{{ route('blogs.destroy', $blog) }}" method="POST" style="display: inline;">
                @csrf
                @method('DELETE')
                <button type="submit" style="color: red; border: none; background: none; cursor: pointer;">Hapus</button>
            </form>
        @endif
        </li>
    @endforeach
</ul>
@if (Auth::check())
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" style="background-color: red; color: white; padding: 10px; border: none; cursor: pointer;">
                    Logout
                </button>
            </form>
        @endif
@endif
