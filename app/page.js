import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default async function Home() {

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />

      <main className="min-h-screen relative overflow-hidden">

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>

        <section className="max-w-6xl mx-auto px-6 py-28 text-center relative z-10">
          <div className="inline-block mb-6 px-5 py-2 rounded-full glass-card text-sm font-medium">
            ✨ Modern SEO Publishing Platform
          </div>

          <h1 className="hero-title text-5xl md:text-7xl font-black leading-tight mb-8">
            Create.
            <br />
            Publish.
            <br />
            Inspire.
          </h1>

          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto leading-relaxed mb-10">
            Craft beautiful content, share your ideas, and build your digital
            presence with a modern publishing experience.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/signup" className="yellow-btn">
              Get Started
            </Link>

            <Link href="/login" className="yellow-btn">
              Login
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-black">
              Latest Articles
            </h2>

            <p className="opacity-70">
              {articles?.length || 0} Articles
            </p>
          </div>

          {articles && articles.length > 0 ? (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {articles.map((article) => (

                <div
                  key={article.id}
                  className="article-card"
                >
                  <div className="p-6">

                    <h3 className="text-2xl font-black mb-4">
                      {article.title}
                    </h3>

                    <p className="opacity-80 mb-6">
                      {article.meta_description}
                    </p>

                    <Link
                      href={`/articles/${article.slug}`}
                      className="readmore-btn"
                    >
                      Read More
                    </Link>

                  </div>
                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-20">

              <h3 className="text-2xl font-bold mb-3">
                No Articles Published Yet
              </h3>

              <p className="opacity-70">
                Check back soon for new content.
              </p>

            </div>

          )}

        </section>

      </main>
    </>
  );
}