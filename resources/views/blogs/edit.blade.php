<h1>Edit Blog</h1>
<form method="POST" action="{{ route('blogs.update', $blog->id) }}">
    @csrf
    @method('PUT')
    <label>Judul:</label>
    <input type="text" name="title" value="{{ $blog->title }}" required>
    <label>Konten:</label>
    <textarea name="content" required>{{ $blog->content }}</textarea>
    <button type="submit">Perbarui</button>
</form>