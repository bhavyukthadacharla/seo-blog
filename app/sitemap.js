import { supabase } from '@/lib/supabase'

export default async function sitemap() {
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('published', true)

  const articleUrls = articles?.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updated_at),
  })) || []

  return [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL,
      lastModified: new Date(),
    },
    ...articleUrls,
  ]
}