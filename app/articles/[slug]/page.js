import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!article) return {}

  return {
    title: article.title,
    description: article.meta_description,
  }
}

export default async function ArticlePage({ params }) {
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!article || !article.published) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <time className="text-sm text-gray-400">
        {new Date(article.created_at).toDateString()}
      </time>
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full rounded-lg my-6"
        />
      )}
      <div className="prose mt-6 whitespace-pre-wrap">
        {article.content}
      </div>
    </article>
  )
}