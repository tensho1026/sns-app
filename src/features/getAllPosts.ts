
import { supabase } from "@/supabase/supabase.config";

export async function getAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false }); // 新しい順に並べる

  if (error) {
    console.error("❌ 投稿取得エラー:", error.message);
    throw error;
  }
console.log(data)
  return data;
}
