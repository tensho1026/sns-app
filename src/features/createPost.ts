import { supabase } from "@/supabase/supabase.config";

type Post = {
  userId: string;
  content: string;
  imageUrl?: string;
};

export async function createPost(post: Post) {
  const { userId, content, imageUrl = "" } = post;

  const { data, error } = await supabase.from("posts").insert([
    {
      user_id: userId,
      content,
      image_url: imageUrl,
    },
  ]);

  if (error) {
    console.error("🔴 投稿保存エラー:", error.message);
    throw error;
  }

  console.log("🟢 投稿が保存されました:", data);
  return data;
}
