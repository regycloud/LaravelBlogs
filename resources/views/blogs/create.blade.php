<h1>Buat Blog Baru</h1>
<form method="POST" action="{{ route('blogs.store') }}">
    @csrf
    <label>Judul:</label>
    <input type="text" name="title" required>
    <label>Konten:</label>
    <textarea name="content" required></textarea>
    <button type="submit">Simpan</button>
</form>