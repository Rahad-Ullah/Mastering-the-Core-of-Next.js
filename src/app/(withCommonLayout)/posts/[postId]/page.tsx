import PostDetails from "@/components/ui/PostDetails";
import { getPost } from "@/services/PostServices";

type TProps = {
  params: {
    postId: string;
  };
};

const PostDetailsPage = async ({ params }: TProps) => {
  const { postId } = params;
  const post = await getPost(postId);

  return (
    <div className="p-6">
      <PostDetails post={post} />
    </div>
  );
};

export default PostDetailsPage;
