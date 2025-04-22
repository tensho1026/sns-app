"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { createReply } from "@/features/createReply";
import { useUser } from "@clerk/nextjs";
import { getReply } from "@/features/getReply";
export default function PostReply({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const { user } = useUser();

  const getcomment = async () => {
    const data = await getReply();
    console.log(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReply({
        postId,
        userId: user?.id,
        content,
      });
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=''>
      <CardContent className='p-4 bg-white border-t-2 border-b-2'>
        <form className='flex gap-3' onSubmit={handleSubmit}>
          <img />
          <div className='flex-1'>
            <textarea
              placeholder='返信を入力...'
              className='min-h-[40px] resize-none w-full'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
              <Button type='submit' size='sm'>
                <Send className='mr-2 h-4 w-4' />
                返信する
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardContent>
        <div className='bg-white rounded-lg  mb-4 overflow-hidden'>
          <div className='p-4'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center   rounded-full'>
                <img
                  src={user?.imageUrl || "/placeholder.svg"}
                  alt=''
                  className='w-10 h-10 rounded-full mr-3'
                />
                <div>
                  <div className='text-gray-500 text-sm w-full'>白川天翔</div>
                </div>
              </div>
            </div>
            <p className='my-3'>これは返信用です</p>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
