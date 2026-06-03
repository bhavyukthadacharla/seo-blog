"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {

            alert(error.message);

       } else {

    alert("Login Successful");

    router.push("/admin");

}

    };

    return (

        <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[var(--background)]
      px-4
      relative
      overflow-hidden
    ">

            {/* BLOBS */}

            <div className="blob blob1"></div>

            <div className="blob blob2"></div>

            <div className="blob blob3"></div>

            {/* BACK BUTTON */}

            <Link
                href="/"
                className="
          yellow-btn
          absolute
          top-8
          left-8
          z-20
        "
            >

                ← Back Home

            </Link>

            {/* LOGIN CARD */}

            <div className="
        w-full
        max-w-md
        bg-[var(--card)]
        p-8
        rounded-3xl
        shadow-2xl
        border
        border-[var(--border)]
        backdrop-blur-xl
        relative
        z-10
      ">

                {/* TITLE */}

                <h1 className="
          text-5xl
          font-black
          text-center
          mb-8
        ">

                    Login

                </h1>

                {/* FORM */}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="
              yellow-btn
              w-full
            "
                    >

                        Login

                    </button>

                </form>

                {/* LINKS */}

                <div className="
          flex
          justify-between
          mt-6
          text-sm
          font-medium
        ">

                    <Link href="/signup">

                        Create Account

                    </Link>

                    <Link href="/forgot-password">

                        Forgot Password?

                    </Link>

                </div>

            </div>

        </div>

    );

}