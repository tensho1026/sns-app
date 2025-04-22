import { supabase } from "@/supabase/supabase.config";

export async function getReply() {
  const { data, error } = await supabase.from("comments").select("*");
  if (error) {
    console.error("❌ リプライ取得エラー:", error.message);
    throw error;
  }
  console.log(data);
  return data;
}
