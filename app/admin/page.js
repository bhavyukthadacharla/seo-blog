'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [articles, setArticles] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    setArticles(data || [])
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage(file) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file)
    if (error) throw error
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)
    return data.publicUrl
  }

  async function handleSubmit() {
    if (!title || !content) return alert('Title and content are required')
    setLoading(true)

    try {
      const slug = generateSlug(title)
      let imageUrl = ''

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      if (editingId) {
        const updateData = {
          title,
          content,
          meta_description: metaDescription,
          slug,
          updated_at: new Date()
        }
        if (imageUrl) updateData.image_url = imageUrl

        await supabase
          .from('articles')
          .update(updateData)
          .eq('id', editingId)
      } else {
        await supabase
          .from('articles')
          .insert([{ title, content, image_url: imageUrl, meta_description: metaDescription, slug }])
      }

      setTitle('')
      setContent('')
      setImageFile(null)
      setImagePreview('')
      setMetaDescription('')
      setEditingId(null)
      fetchArticles()
    } catch (err) {
      alert('Error saving article: ' + err.message)
    }

    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure?')) return
    await supabase.from('articles').delete().eq('id', id)
    fetchArticles()
  }

  async function togglePublish(article) {
    await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id)
    fetchArticles()
  }

  function handleEdit(article) {
    setEditingId(article.id)
    setTitle(article.title)
    setContent(article.content)
    setImagePreview(article.image_url || '')
    setMetaDescription(article.meta_description || '')
  }

  function handleLogout() {
    document.cookie = 'admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.href = '/admin/login'
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded border text-sm hover:bg-gray-100"
        >
          Logout
        </button>
      </div>

      <div className="border rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Article' : 'New Article'}
        </h2>
        <input
          className="w-full border rounded px-3 py-2 mb-3 bg-white text-black"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded px-3 py-2 mb-3 h-40 bg-white text-black"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2 mb-3 bg-white text-black"
          placeholder="Meta description (optional)"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />
        <div className="mb-3">
          <label className="block text-sm mb-1">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2 bg-white text-black"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-40 object-cover rounded"
            />
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : editingId ? 'Update Article' : 'Create Article'}
        </button>
        {editingId && (
          <button
            onClick={() => { setEditingId(null); setTitle(''); setContent(''); setImageFile(null); setImagePreview(''); setMetaDescription('') }}
            className="ml-3 px-6 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">All Articles</h2>
      {articles.map((article) => (
        <div key={article.id} className="border rounded-lg p-4 mb-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">{article.title}</p>
            <p className="text-sm text-gray-400">{article.slug}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => togglePublish(article)}
              className={`px-3 py-1 rounded text-sm ${article.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {article.published ? 'Published' : 'Draft'}
            </button>
            <button
              onClick={() => handleEdit(article)}
              className="px-3 py-1 rounded text-sm bg-yellow-100 text-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(article.id)}
              className="px-3 py-1 rounded text-sm bg-red-100 text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  )
}