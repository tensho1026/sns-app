import { supabase } from "@/supabase/supabase.config";
import { NextResponse } from "next/server";

export async function getMyPosts(userId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")

    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // 新しい順に並べる

  if (error) {
    console.error("❌ 投稿取得エラー:", error.message);
    throw error;
  }
  console.log(data);
  return data;
}
