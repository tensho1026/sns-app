"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
export default function PostReply() {
  return (
    <CardContent className='p-4 bg-white border-t-2'>
      <form className='flex gap-3'>
        <img />
        <div className='flex-1'>
          <textarea
            placeholder='返信を入力...'
            className='min-h-[40px] resize-none w-full'
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
  );
}
