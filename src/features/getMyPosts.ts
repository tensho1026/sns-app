import { supabase } from "@/supabase/supabase.config";

export async function getMyPosts(userId: string) {
  const { data, error } = await supabase

    .from("posts")
    .select(
      `
      *,
      User (
        username,
        icon
      )
    `
    )
    // .select("*, User(username, icon)") こっちかもしれない

    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // 新しい順に並べる

  if (error) {
    console.error("❌ 投稿取得エラー:", error.message);
    throw error;
  }
  console.log(data);
  return data;
}
