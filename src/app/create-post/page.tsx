import Link from "next/link"
import { ArrowLeft, ImageIcon, MapPin, Smile, X } from "lucide-react"

export default function CreatePost() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b p-4 sticky top-0 bg-white z-10">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft size={20} />
            <span className="sr-only">戻る</span>
          </Link>
          <h1 className="text-lg font-bold">新規投稿</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors">
            投稿する
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <div className="flex">
          <div className="mr-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex-1">
            <textarea
              placeholder="今何してる？"
              className="w-full border-0 text-lg focus:outline-none resize-none h-32"
            ></textarea>

            <div className="border rounded-lg p-3 relative mb-4">
              <img src="/placeholder.svg?height=200&width=400" alt="プレビュー画像" className="w-full h-auto rounded" />
              <button className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <div className="flex space-x-4 text-blue-500">
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <ImageIcon size={20} />
                </button>
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <Smile size={20} />
                </button>
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                  <MapPin size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
