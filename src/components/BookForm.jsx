/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function BookForm({ bookData }) {
  const { id } = useParams();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    pages: "",
    image: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (bookData) {
      try {
        const res = await fetch(`/api/books/${id}`, {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        toast.success("Book updated successfully");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
      return;
    }

    try {
      const res = await fetch("/api/newbook", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      toast.success("Book Created");
      router.push("/");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageUpload = async e => {
    const image = e.target.files[0];
    const imageData = new FormData();
    imageData.append("image", image);
    try {
      const res = await fetch("/api/newbook/uploads", {
        method: "POST",
        body: imageData,
      });

      const data = await res.json();
      if (data.image_url) {
        setImageUrl(data.image_url);
        setFormData({
          ...formData,
          image: data.image_url,
        });
      }
      return data;
    } catch (error) {}
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteBook = async () => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      toast.success("Book Deleted");
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/");
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
    }
  }, [imageUrl]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <form
        className="w-full"
        onSubmit={handleSubmit}>
        <div className="lg:flex gap-16 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="formControl flex flex-col text-left gap-1">
              <label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="border px-3 py-2 rounded-lg bg-black border-slate-400 focus:border-black focus:outline-none"
                onChange={handleChange}
                required
                defaultValue={bookData?.book.title}
              />
            </div>
            <div className="formControl flex flex-col text-left gap-1">
              <label htmlFor="author">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                className="border px-3 py-2 rounded-lg bg-black border-slate-400 focus:border-black focus:outline-none"
                onChange={handleChange}
                required
                defaultValue={bookData?.book.author}
              />
            </div>
            <div className="formControl flex flex-col text-left gap-1">
              <label htmlFor="publisher">
                Publisher <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="publisher"
                className="border px-3 py-2 rounded-lg bg-black border-slate-400 focus:border-black focus:outline-none"
                onChange={handleChange}
                required
                defaultValue={bookData?.book.publisher}
              />
            </div>
            <div className="formControl flex flex-col text-left gap-1">
              <label htmlFor="year">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="year"
                className="border px-3 py-2 rounded-lg bg-black border-slate-400 focus:border-black focus:outline-none"
                onChange={handleChange}
                required
                defaultValue={bookData?.book.year}
              />
            </div>
            <div className="formControl flex flex-col text-left gap-1 w-full">
              <label htmlFor="pages">
                Pages <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="pages"
                className="border px-3 py-2 rounded-lg bg-black border-slate-400 focus:border-black focus:outline-none"
                onChange={handleChange}
                defaultValue={bookData?.book.pages}
              />
            </div>
          </div>
          <div className="flex flex-col text-left gap-4 w-full">
            <div className="formControl flex flex-col text-left gap-1">
              <label htmlFor="image">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="image"
                className="border px-3 py-2 rounded-lg w-full"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
            {selectedImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-full shadow-md rounded-md"
                src={selectedImage}
                alt="Selected Image"
              />
            )}
            {bookData?.book.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-full shadow-md rounded-md"
                src={bookData.book.image}
                alt="Selected Image"
              />
            )}
            <button
              className="bg-gradient-to-b from-yellow-500 to-yellow-600 text-black shadow-lg rounded-md p-2 font-semibold w-full hover:opacity-90 duration-300 disabled:bg-pink-300"
              type="submit">
              {bookData ? "Edit Book" : "Create Book"}
            </button>
          </div>
        </div>
      </form>
      {bookData && (
        <div className="flex gap-16 w-full">
          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={handleDeleteBook}
              className="my-6 bg-gradient-to-b from-red-600 to-red-700 text-white shadow-lg rounded-md p-2 font-semibold w-full hover:opacity-90 duration-300 disabled:bg-pink-300"
              type="submit">
              Delete Book
            </button>
          </div>
        </div>
      )}
    </>
  );
}
