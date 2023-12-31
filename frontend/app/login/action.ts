"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Login(_prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const res = await fetch(
      `http://${process.env.API_URI_DOCKER}:${process.env.API_PORT}/api/v1/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to login");
    }
    res.json().then((data) => {
      cookies().set("jwt", data.token, { maxAge: 60 * 60 * 1000 });
    });
  } catch (error) {
    console.log("error", error);
    return { message: "Worng username or password" };
  }
  redirect("/");
}
