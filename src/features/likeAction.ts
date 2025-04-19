import { supabase } from "@/supabase/supabase.config";

export async function toggleLike(postId: string, userId: string) {
  const { data: existingLike, error } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  if (existingLike) {
    // いいねを取り消す
    await supabase.from("likes").delete().eq("id", existingLike.id);
    return { liked: false };
  } else {
    // いいねを追加する
    await supabase.from("likes").insert({
      post_id: postId,
      user_id: userId,
    });
    return { liked: true };
  }
}
