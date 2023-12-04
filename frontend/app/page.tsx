"use client";
// @ts-ignore
import { useFormState } from "react-dom";

import { posts } from "./action";
export interface Post {
  id: number;
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  tag_name: string;
}

type initType = {
  posts: Post[];
  tags: Tag[];
};

export default function Home() {
  const initialState: initType = {
    posts: [],
    tags: [],
  };

  const [state, formAction] = useFormState(posts, initialState);

  console.log();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w my-5 bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <form action={formAction}>
            <div className="relative">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none text-gray-800"
              />
              <label
                htmlFor="search"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Search
              </label>
            </div>
            <div className="relative flex flex-row mt-5 gap-6">
              <div className="">
                <input
                  type="text"
                  name="page"
                  id="page"
                  placeholder="Page"
                  className="peer mt-1 border-b-2 border-gray-300 px-0 py-1 placeholder-black focus:border-gray-500 focus:outline-none text-gray-800"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="pageSize"
                  id="pageSize"
                  placeholder="Page Size"
                  className="peer mt-1 border-b-2 border-gray-300 px-0 py-1 placeholder-black focus:border-gray-500 focus:outline-none text-gray-800"
                />
              </div>
              <div className="">
                <select
                  id="sortBy"
                  name="sortBy"
                  className=" px-4 py-3 border rounded-lg text-black-primary focus:outline-none text-sm"
                >
                  <option value="id" defaultValue="id">
                    Id
                  </option>
                  <option value="title">Title</option>
                  <option value="content">Content</option>
                  <option value="postedAt">Posted At</option>
                  <option value="postedBy">Posted By</option>
                </select>
              </div>
              <div className="">
                <select
                  id="orderBy"
                  name="orderBy"
                  className=" px-4 py-3 border rounded-lg text-black-primary focus:outline-none text-sm"
                >
                  <option value="asc" defaultValue="asc">
                    Asc
                  </option>
                  <option value="desc">Desc</option>
                </select>
              </div>

              <div className="">
                <select
                  id="tags"
                  name="tags[]"
                  multiple
                  className="border rounded-lg text-black-primary focus:outline-none text-sm"
                >
                  <option value="" defaultValue="">
                    Select Tag
                  </option>
                  {state.tags.map(
                    (tag: { value: string; label: string }, index: number) => {
                      return (
                        <option
                          className="text-black"
                          value={tag.value}
                          key={index}
                        >
                          {tag.label}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
              <button
                type="submit"
                className="rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {state.posts.map((post: Post, index: number) => {
        return (
          <a
            href={`/${post.id}`}
            key={`${index}-${post.title}`}
            className="px-4 py-4 mx-5 my-5 font-normal bg-gray-300 rounded-lg"
          >
            <div className="flex flex-col justify-between md:flex-row">
              <h3 className="mb-2 text-2xl font-semibold leading-snug text-black px-3">
                {post.title}
              </h3>
              <div className="flex items-center mb-2 space-x-2">
                {post.tags.map((tag, index) => {
                  return (
                    <p
                      key={`${index}-${tag.tag_name}`}
                      className={`px-2 bg-black text-white rounded`}
                    >
                      {tag.tag_name}
                    </p>
                  );
                })}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
