"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(_prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const res = await fetch(
      `http://${process.env.API_URI_DOCKER}:${process.env.API_PORT}/api/v1/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to signup");
    }

    res.json().then((data) => {
      cookies().set("jwt", data.token, { maxAge: 60 * 60 * 1000 });
    });
  } catch (error) {
    console.log("error", error);
    return { message: "username or password exising" };
  }
  redirect("/");
}
