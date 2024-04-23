"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "../api/sign-up/route";

export default function Register() {
  const [state, action] = useFormState(signUp, undefined);
  const { pending } = useFormStatus();

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24">
      <h1 className="pb-10 text-3xl font-bold">Sign Up</h1>
      <form
        action={action}
        className="flex flex-col gap-5">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          className="px-2 py-1 rounded-md bg-black placeholder:text-white border border-slate-500 focus:outline-none focus:border-black placeholder:opacity-50"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="px-2 py-1 rounded-md bg-black placeholder:text-white border border-slate-500 focus:outline-none focus:border-black placeholder:opacity-50"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className="px-2 py-1 rounded-md bg-black placeholder:text-white border border-slate-500 focus:outline-none focus:border-black placeholder:opacity-50"
        />
        <button
          type="submit"
          aria-disabled={pending}
          className="w-full bg-gradient-to-b from-yellow-500 to-yellow-600 py-2 rounded-md font-bold text-black hover:opacity-75 duration-300">
          {pending ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
