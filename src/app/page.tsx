"use client"
import Link from "next/link";
import {
  PlusCircle,
  MoreVertical,
  Heart,
  MessageCircle,
  Share2,
  Trash2,
  Plus
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { saveUserToDatabase } from "@/features/saveUserToDatabase";
export default function Home() {

  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const saveUserData = async () => {
      if (isLoaded && isSignedIn && user) {
        console.log("🟢 ユーザー情報ロード完了:", user);
        await saveUserToDatabase(user); //  ここで保存
      }
    };
    saveUserData();
  }, [user, isLoaded, isSignedIn]);



  // Dummy post data
  const posts = [
    {
      id: 1,
      author: "田中 太郎",
      username: "@tanaka_taro",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "今日は素晴らしい天気です！公園でピクニックをしています。",
      image: "/keshiki.jpg",
      likes: 24,
      comments: 3,
      timestamp: "2時間前",
    },
    {
      id: 2,
      author: "佐藤 花子",
      username: "@sato_hanako",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "新しいカフェを見つけました！コーヒーがとても美味しいです。おすすめです！",
      image: "",
      likes: 42,
      comments: 7,
      timestamp: "4時間前",
    },
    {
      id: 3,
      author: "鈴木 一郎",
      username: "@suzuki_ichiro",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "今日から新しいプロジェクトが始まりました。頑張ります！",
      likes: 18,
      comments: 2,
      timestamp: "6時間前",
    },
  ];

  return (
    <main className='min-h-screen bg-gray-100'>
      <header className='bg-white p-4 shadow-sm sticky top-0 z-10'>
        <div className='max-w-2xl mx-auto flex justify-between items-center'>
          <h1 className='text-xl font-bold text-gray-800'>SNSアプリ</h1>
          <div className='flex items-center space-x-4'>
            <UserButton />
          </div>
        </div>
      </header>

      <div className='max-w-2xl mx-auto pt-4 pb-20'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='bg-white rounded-lg shadow mb-4 overflow-hidden'
          >
            <div className='p-4'>
              <div className='flex justify-between items-start'>
                <div className='flex items-center'>
                  <img
                    src={post.avatar || "/placeholder.svg"}
                    alt={post.author}
                    className='w-10 h-10 rounded-full mr-3'
                  />
                  <div>
                    <div className='font-semibold'>{post.author}</div>
                    <div className='text-gray-500 text-sm'>{post.username}</div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button
                    className='text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors'
                    aria-label='投稿を削除'
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className='my-3'>{post.content}</p>
              {post.image && (
                <div className='mt-2 rounded-lg overflow-hidden'>
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt='投稿画像'
                    className='w-full h-auto'
                  />
                </div>
              )}
              <div className='mt-4 flex justify-between text-gray-500'>
                <div className='flex items-center space-x-1'>
                  <button className='flex items-center hover:text-red-500 transition-colors'>
                    <Heart size={18} className='mr-1' />
                    <span>{post.likes}</span>
                  </button>
                </div>
                <div className='flex items-center space-x-1'>
                  <button className='flex items-center hover:text-blue-500 transition-colors'>
                    <MessageCircle size={18} className='mr-1' />
                    <span>{post.comments}</span>
                  </button>
                </div>
            
                <div className='text-sm'>{post.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 投稿作成ボタン */}
      <Link
        href='/create-post'
        className='fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors'
      >
        <Plus size={24} />
        <span className='sr-only'>新規投稿を作成</span>
      </Link>
    </main>
  );
}
