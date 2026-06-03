"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset email sent");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">

      <div className="w-full max-w-md bg-[var(--card)] p-8 rounded-2xl shadow-xl border border-[var(--border)]">

        <h1 className="text-4xl font-black text-center text-[var(--accent)] mb-6">
          Forgot Password
        </h1>

        <form onSubmit={handleReset} className="space-y-4">

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 rounded-xl border border-[var(--border)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-bold hover:opacity-90"
          >
            Send Reset Link
          </button>

        </form>

      </div>
    </div>
  );
}