import { cookies } from "next/headers";
import { Post } from "../page";
import { redirect } from "next/navigation";

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(
    `http://${process.env.API_URI_DOCKER}:${process.env.API_PORT}/api/v1/post?id=${id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    }
  );

  if (!res.ok) {
    redirect("/login");
  }

  return res.json();
};

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="px-4 py-4 mx-5 my-5 font-normal bg-gray-300 rounded-lg">
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
            <p className="text-gray-700">By: {post.postedBy}</p>
          </div>
        </div>
        <div
          className="text-black"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
