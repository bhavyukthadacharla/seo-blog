import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export async function generateStaticParams() {
  const { data: articles } = await supabase
    .from('articles')
    .select('slug')
    .eq('published', true)

  return (articles || []).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!article) return {}

  return {
    title: article.title,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      images: article.image_url ? [{ url: article.image_url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.meta_description,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

export default async function ArticlePage({ params }) {
  const slug = (await params).slug

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!article || !article.published) notFound()

  const wordCount = article.content?.split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: 'Bhavyuktha',
    },
    ...(article.image_url && { image: article.image_url }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex gap-4 text-sm text-gray-400 mb-6">
          <time>{new Date(article.created_at).toDateString()}</time>
          <span>{readingTime} min read</span>
        </div>
        {article.image_url && (
          <div className="relative w-full h-64 my-6 rounded-lg overflow-hidden">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={false}
            />
          </div>
        )}
        <div className="prose prose-invert mt-6 max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </>
  )
}