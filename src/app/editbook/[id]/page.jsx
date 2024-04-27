"use client";

import BookForm from "@/app/components/BookForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`, {
          method: "GET",
        });
        console.log(res);
        setBook(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <main>
      <div className="min-h-screen mt-20 mb-6 lg:my-0 px-4 md:w-5/6 max-w-2xl mx-auto flex items-center flex-col justify-center">
        <h1 className="text-3xl font-bold lg:mb-8 mb-4">Edit Book</h1>
        <BookForm bookData={book} />
      </div>
    </main>
  );
}
