import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:3000/api/v1/posts", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
  });

  if (!res.ok) {
    redirect("/login");
  }

  return res.json();
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col items-center justify-center">
      {posts.map((post, index) => {
        return (
          <a
            href={`/${post.id}`}
            key={index}
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
