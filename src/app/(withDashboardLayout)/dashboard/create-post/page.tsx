import { createPost, getAllPosts } from "@/services/PostServices";
import { TPost } from "@/types";
import { revalidateTag } from "next/cache";

const CreatePostPage = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const posts = await getAllPosts();

    const bookData = {
      id: JSON.stringify(posts.length + 1),
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: formData.get("image"),
    };

    try {
      const res = await createPost(bookData as TPost);
      if (res) {
        revalidateTag("Posts");
        console.log("Post created successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" shadow-xl bg-base-100 w-[80%] my-12">
      <h1 className="text-center text-4xl">
        Create a <span className="text-fuchsia-900">New Book</span>
      </h1>
      <form action={handleSubmit} className="p-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Book Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Book Name"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            name="category"
            type="text"
            placeholder="Fantasy, Fiction, etc."
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            name="image"
            type="url"
            placeholder="Image URL"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-accent btn-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
