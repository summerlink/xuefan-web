import Link from "next/link"
import { InfiniteSlider } from "@/components/infinite-slider"
import { formatNumber } from "@/lib/utils"

export default function Page() {
  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="relative z-10 text-center px-4">
        <h1 className="mb-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent sm:text-6xl lg:text-7xl">
          学帆
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-lg text-slate-800 sm:text-xl">
          这是一个完全免费的平台，为您提供全面的大学和课程搜索，以及便捷的申请服务。助您轻松实现留学梦想！
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/70 backdrop-blur-sm">
            <span className="text-4xl font-bold text-violet-600 mb-2">{formatNumber(1000)}+</span>
            <span className="text-slate-700">精选课程</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/70 backdrop-blur-sm">
            <span className="text-4xl font-bold text-fuchsia-500 mb-2">{formatNumber(10)}+</span>
            <span className="text-slate-700">合作院校</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/70 backdrop-blur-sm">
            <span className="text-4xl font-bold text-rose-500 mb-2">{formatNumber(1500)}+</span>
            <span className="text-slate-700">成功案例</span>
          </div>
        </div>
        <Link
          href="/search"
          className="inline-flex h-12 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm px-8 text-lg font-medium text-slate-900 shadow-lg transition-all hover:scale-105 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus-visible:ring-2 focus-visible:ring-slate-300 hover:text-violet-700"
        >
          立即搜索
        </Link>
      </div>
      <div className="w-full mt-12">
        <InfiniteSlider />
      </div>
    </main>
  )
}
