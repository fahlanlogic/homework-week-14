/* eslint-disable @next/next/no-img-element */

export default function BookCard({ books }) {
  const { title, author, publisher, year, pages, image } = books;
  return (
    <div className="w-full p-4 flex flex-col xl:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 gap-4">
      <div className="flex flex-col flex-auto">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-slate-400">{author}</p>
      </div>
      <img
        src={image}
        alt=""
        className="w-full h-64 object-cover rounded-md "
      />
      <div className="pb-4">
        <p className="text-sm text-slate-400">
          Publisher : <span className="text-white">{publisher}</span>
        </p>
        <p className="text-sm text-slate-400">
          Pages : <span className="text-white">{pages}</span>
        </p>
        <p className="text-sm text-slate-400">
          Year : <span className="text-white">{year}</span>
        </p>
      </div>
      <div className="flex w-full gap-2">
        <button className="text-sm font-bold py-1 hover:opacity-80 duration-300 bg-gradient-to-b from-yellow-500 to-yellow-600 w-full rounded-md">
          Edit
        </button>
        <button className="text-sm font-bold py-1 hover:opacity-80 duration-300 bg-gradient-to-b from-red-500 to-red-600 w-full rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}
