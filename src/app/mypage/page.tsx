"use client";

import Link from "next/link";
import { Plus, Trash2, Heart, MessageCircle, Home } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { saveUserToDatabase } from "@/features/saveUserToDatabase";
import { getLikeData } from "@/features/getLikesForPosts";
import { toggleLike } from "@/features/likeAction";
import { getMyPosts } from "@/features/getMyPosts";
import { deletePost } from "@/features/deletePost";
import { Button } from "@/components/ui/button";

export default function Mypage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [likes, setLikes] = useState<
    Record<string, { count: number; liked: boolean }>
  >({});

  useEffect(() => {
    const saveUserData = async () => {
      if (isLoaded && isSignedIn && user) {
        await saveUserToDatabase(user);
      }
    };
    saveUserData();
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    if (!user?.id) return;

    getMyPosts(user.id).then(async (posts) => {
      setPosts(posts);

      const likeData: Record<string, { count: number; liked: boolean }> = {};
      for (const post of posts) {
        const { count, liked } = await getLikeData(post.id, user.id);
        likeData[post.id] = { count, liked };
      }
      setLikes(likeData);
    });
  }, [user?.id]);

  const handleToggleLike = async (postId: string) => {
    if (!user) return;
    const result = await toggleLike(postId, user.id);
    setLikes((prev) => {
      const prevCount = prev[postId]?.count || 0;
      const newCount = result.liked ? prevCount + 1 : prevCount - 1;
      return {
        ...prev,
        [postId]: {
          count: newCount,
          liked: result.liked,
        },
      };
    });
  };

  return (
    <main className='relative min-h-screen bg-gray-100'>
      <div className='absolute'>
        <Link href='/'>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full hover:bg-gray-100'
          >
            <Home className='h-6 w-6' />
            <span className='sr-only'>Home</span>
          </Button>
        </Link>
      </div>
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
                    src={post.User.icon || "/placeholder.svg"}
                    alt={post.username || "user"}
                    className='w-10 h-10 rounded-full mr-3'
                  />
                  <div>
                    <div className='font-semibold'>{post.username}</div>
                    <div className='text-gray-500 text-sm'>
                      {post.User.username}
                    </div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button
                    className='text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors'
                    aria-label='投稿を削除'
                    onClick={async () => {
                      await deletePost(post.id);
                      setPosts((prev) => prev.filter((p) => p.id !== post.id));
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className='my-3'>{post.content}</p>
              {post.image_url && (
                <div className='mt-2 rounded-lg overflow-hidden'>
                  <img
                    src={post.image_url}
                    alt='投稿画像'
                    className='w-full h-auto'
                  />
                </div>
              )}
              <div className='mt-4 flex justify-between text-gray-500'>
                <div className='flex items-center space-x-1'>
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center transition-colors ${
                      likes[post.id]?.liked
                        ? "text-red-500"
                        : "hover:text-red-500"
                    }`}
                  >
                    <Heart size={18} className='mr-1' />
                    <span>{likes[post.id]?.count ?? 0}</span>
                  </button>
                </div>
                <div className='flex items-center space-x-1'>
                  <button className='flex items-center hover:text-blue-500 transition-colors'>
                    <MessageCircle size={18} className='mr-1' />
                    <span>0</span>
                  </button>
                </div>
                <div className='text-sm'>
                  {new Date(post.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
