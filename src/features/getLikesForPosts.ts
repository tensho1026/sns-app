import { supabase } from "@/supabase/supabase.config";

export async function getLikeData(postId: string, userId: string) {
  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  const { data: liked } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  return {
    count: count ?? 0,
    liked: !!liked,
  };
}
