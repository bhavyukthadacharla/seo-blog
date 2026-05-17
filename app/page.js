import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">My Blog</h1>
      {articles && articles.length > 0 ? (
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.id}>
              <div className="border rounded-lg p-6 hover:shadow-md transition">
                <h2 className="text-2xl font-semibold">{article.title}</h2>
                <p className="text-gray-500 mt-2">{article.meta_description}</p>
                <p className="text-sm text-gray-400 mt-4">
                  {new Date(article.created_at).toDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No articles published yet.</p>
      )}
    </main>
  )
}