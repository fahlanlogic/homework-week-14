"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === 409) throw new Error("User already exist");
      if (data.status === 400)
        throw new Error("Email and password fields cannot be empty");
      toast.success("Sign Up Succesfully");
      router.push("/sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h1 className="pb-10 text-3xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5">
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          className="px-2 py-1 rounded-md bg-black placeholder:text-white border border-slate-500 focus:outline-none focus:border-black placeholder:opacity-50"
        />
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
          placeholder="Email"
          className="px-2 py-1 rounded-md bg-black placeholder:text-white border border-slate-500 focus:outline-none focus:border-black placeholder:opacity-50"
        />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="********"
          required
          className="px-2 py-1 rounded-md bg-black placeholder:text-white border border-slate-500 focus:outline-none focus:border-black placeholder:opacity-50"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-b from-yellow-500 to-yellow-600 py-2 rounded-md font-bold text-black hover:opacity-75 duration-300">
          Sign Up
        </button>
      </form>
    </main>
  );
}
