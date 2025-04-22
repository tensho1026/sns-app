import { supabase } from "@/supabase/supabase.config";

export async function deletePost(postId: string) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("❌ 投稿削除エラー:", error.message);
    throw error;
  }

  
}
