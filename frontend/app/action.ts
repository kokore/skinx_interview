"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Tag } from "./page";

export async function posts(_prevState: any, formData: FormData) {
  const search = formData.get("search") || "";
  const page = formData.get("page") || 1;
  const pageSize = formData.get("pageSize") || 10;
  const sortBy = formData.get("sortBy") || "id";
  const orderBy = formData.get("orderBy") || "asc";
  const tags = formData.getAll("tags[]") || [];

  try {
    const resPosts = await fetch(
      `http://localhost:3000/api/v1/posts?page=${page}&pageSize=${pageSize}&search=${search}&sortBy=${sortBy}&orderBy=${orderBy}&tag=${tags.join(
        ","
      )}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${cookies().get("jwt")?.value}`,
        },
      }
    );

    const resTags = await fetch(`http://localhost:3000/api/v1/tags`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    });

    if (!resPosts.ok || !resTags.ok) {
      redirect("/login");
    }
    let dataPosts = await resPosts.json();
    let dataTags = await resTags.json();

    const outputArray = dataTags.map((item: Tag) => ({
      value: item.tag_name,
      label: item.tag_name.charAt(0).toUpperCase() + item.tag_name.slice(1),
    }));

    return { posts: dataPosts, tags: outputArray };
  } catch (error) {
    console.log("error", error);
    return { message: "Worng params" };
  }
}
