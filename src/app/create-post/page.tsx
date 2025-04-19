"use client";
import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { createPost } from "@/features/createPost";

export default function CreatePost() {
  const user = useUser();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState("");


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCreatePost = async () => {
    if (!user.isSignedIn || !user.user) return;
  
    await createPost({
      userId: user.user.id,
      content: content,
      imageUrl: previewUrl ?? "", // プレビューURLをそのまま仮で保存
    });
  
    // 成功後の処理（例: リダイレクトやstateリセット）
    setContent("");
    setPreviewUrl(null);
  };

  return (
    <main className='min-h-screen bg-white'>
      <header className='border-b p-4 sticky top-0 bg-white z-10'>
        <div className='max-w-2xl mx-auto flex justify-between items-center'>
          <Link
            href='/'
            className='text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors'
          >
            <ArrowLeft size={20} />
            <span className='sr-only'>戻る</span>
          </Link>
          <h1 className='text-lg font-bold'>新規投稿</h1>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors'
            onClick={handleCreatePost}
          >
            投稿する
          </button>
        </div>
      </header>

      <div className='max-w-2xl mx-auto p-4'>
        <div className='flex'>
          <div className='mr-3'>
            <div className='w-10 h-10 rounded-full bg-gray-200'>
              <Image
                src={user.user?.imageUrl ?? "/syoki.jpg"} // ← 小文字の `imageUrl`
                alt='User profile image'
                width={100}
                height={100}
                className='rounded-full'
              />
            </div>
          </div>
          <div className='flex-1'>
            <textarea
              placeholder='今どうしてる？'
              value={content}
              className='w-full border-0 text-lg focus:outline-none resize-none h-32'
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            {/* プレビュー表示（画像が選択されたときだけ） */}
            {previewUrl && (
              <div className='mt-4 mb-2'>
                <img
                  src={previewUrl}
                  alt='プレビュー'
                  className='w-full rounded'
                />
              </div>
            )}

            <div className='border-t pt-3 flex justify-between'>
              <div className='flex space-x-4 text-blue-500'>
                <label className='hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer'>
                  <ImageIcon size={20} />
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
