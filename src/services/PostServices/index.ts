import { delay } from "@/utils/delay";

export const getAllPosts = async (type?: string, wait = false) => {
  let fetchOptions = {};

  if (type === "ssr") {
    fetchOptions = {
      cache: "no-store",
    };
  } else if (type === "isr") {
    fetchOptions = {
      next: {
        revalidate: 30,
      },
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/posts`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }

  if (wait) {
    delay(2000);
  }

  return res.json();
};

export const getPost = async (id: string, wait = false) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }

  if (wait) {
    delay(2000);
  }

  return res.json();
};

