
import { supabase } from "@/supabase/supabase.config";

export async function getOtherPosts(userId:string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .not('user_id', 'eq',userId)
    .order("created_at", { ascending: false }); // 新しい順に並べる

  if (error) {
    console.error("❌ 投稿取得エラー:", error.message);
    throw error;
  }
console.log(data)
  return data;
}
