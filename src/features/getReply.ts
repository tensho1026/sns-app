import { supabase } from "@/supabase/supabase.config";

export async function getReply(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
  if (error) {
    console.error("❌ リプライ取得エラー:", error.message);
    throw error;
  }
  console.log(data);
  return data;
}
