import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const { data: article } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!article) {

        return {};

    }

    return {

        title: article.title,
        description: article.meta_description,

    };

}

export default async function ArticlePage({ params }) {

    const { slug } = await params;

    const { data: article } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

   if (!article) {
    notFound();
}

if (!article.published) {
    return (
        <>
            <Navbar />

            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">

                    <h1 className="text-4xl font-bold mb-4">
                        Article Not Published
                    </h1>

                    <p className="text-lg text-gray-600 mb-6">
                        Please publish this article to view it.
                    </p>

                    <Link
                        href="/admin"
                        className="yellow-btn"
                    >
                        Back to Admin
                    </Link>

                </div>
            </main>
        </>
    );
}

    return (
        <>

            <Navbar />

            <main className="
        min-h-screen
        relative
        overflow-hidden
        px-6
        py-20
      ">

                {/* BACK BUTTON */}

                <Link
                    href="/"
                    className="
            yellow-btn
            mb-10
            inline-flex
            relative
            z-20
          "
                >

                    ← Back Home

                </Link>

                {/* BACKGROUND BLOBS */}

                <div className="blob blob1"></div>

                <div className="blob blob2"></div>

                <div className="blob blob3"></div>

                {/* ARTICLE */}

                <article className="
          max-w-4xl
          mx-auto
          relative
          z-10
        ">

                    {/* TITLE */}

                    <h1 className="
            text-5xl
            md:text-7xl
            font-black
            leading-tight
            mb-6
            text-black
          ">

                        {article.title}

                    </h1>

                    {/* DATE */}

                    <p className="
            text-black/60
            text-lg
            mb-10
          ">

                        {new Date(article.created_at).toDateString()}

                    </p>

                    {/* IMAGE */}

                    {article.image_url && (

                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="
                w-full
                rounded-3xl
                mb-10
                shadow-2xl
              "
                        />

                    )}

                    {/* DESCRIPTION */}

                    <div className="
            text-2xl
            leading-relaxed
            text-black/75
            mb-14
            font-medium
          ">

                        {article.meta_description}

                    </div>

                    {/* CONTENT */}

                    <div className="
            prose
            prose-lg
            max-w-none
            bg-white/50
            backdrop-blur-xl
            border
            border-black/5
            rounded-3xl
            p-10
            shadow-xl
          ">

                        <ReactMarkdown>

                            {article.content}

                        </ReactMarkdown>

                    </div>

                </article>

            </main>

        </>
    );
}