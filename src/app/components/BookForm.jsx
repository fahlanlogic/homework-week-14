import Image from "next/image";

export default function BookForm() {
  return (
    <>
      <form className="w-full">
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
                // onChange={handleChange}
                required
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
                // onChange={handleChange}
                required
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
                // onChange={handleChange}
                required
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
                // onChange={handleChange}
                required
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
                // onChange={handleChange}
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
                // onChange={handleChange}
                accept="image/*"
                required
              />
            </div>

            <button
              className="bg-gradient-to-b from-yellow-500 to-yellow-600 text-black shadow-lg rounded-md p-2 font-semibold w-full hover:opacity-90 duration-300 disabled:bg-pink-300"
              type="submit">
              Create Book
            </button>
          </div>
        </div>
      </form>
      <div className="flex gap-16 w-full">
        <div className="flex flex-col gap-4 w-full">
          <button
            className="my-6 bg-gradient-to-b from-yellow-500 to-yellow-600 text-black shadow-lg rounded-md p-2 font-semibold w-full hover:opacity-90 duration-300 disabled:bg-pink-300"
            type="submit">
            Delete Book
          </button>
        </div>
      </div>
    </>
  );
}
