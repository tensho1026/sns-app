import { supabase } from "@/supabase/supabase.config";

type CreateReplyProps = {
  postId: string;
  userId?: string;
  content: string;
};

export async function createReply({
  postId,
  userId,
  content,
}: CreateReplyProps) {
  const { data, error } = await supabase.from("comments").insert([
    {
      post_id: postId,
      user_id: userId,
      content,
    },
  ]);
  if (error) {
    console.log(error);
    throw error;
  }

  console.log(data);

  return data;
}
