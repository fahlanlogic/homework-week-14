import BookForm from "@/app/components/BookForm";

export default function EditBook() {
  return (
    <main>
      <div className="min-h-screen mt-20 mb-6 lg:my-0 px-4 md:w-5/6 max-w-2xl mx-auto flex items-center flex-col justify-center">
        <h1 className="text-3xl font-bold lg:mb-8 mb-4">Edit Book</h1>
        <BookForm />
      </div>
    </main>
  );
}
