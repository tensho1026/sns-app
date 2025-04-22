"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const user = useUser();
  console.log(user);

  return (
    <header className='bg-white p-4 shadow-sm sticky top-0 z-10'>
      <div className='max-w-2xl mx-auto flex justify-between items-center'>
        <h1 className='text-xl font-bold text-gray-800'>SNSアプリ</h1>
        <Link href='/mypage'>
          <div className='flex items-center  rounded-full w-13 h-13'>
            <img
              src={user.user?.imageUrl!}
              alt=''
              className='rounded-full w-full h-full'
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
