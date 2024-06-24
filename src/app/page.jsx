import BookCard from "../components/BookCard";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getData = async () => {
  try {
    const books = await prisma.book.findMany();
    return books;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const books = await getData();

  return (
    <main className="mx-auto max-w-6xl flex min-h-screen items-center justify-center pt-20 p-4 xl:px-0">
      {books.length > 0 ? (
        <div className="grid mx-auto w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map(book => (
            <BookCard
              key={book.id}
              books={book}
            />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
    </main>
  );
}
