const universities = [
  {
    row1: ["伍伦贡大学马来西亚校区", "世纪大学", "英迪国际大学", "马来西亚国立大学", "赫瑞瓦特大学马来西亚分校"],
    row2: ["马来西亚理科大学", "拉曼大学", "莫纳什大学马来西亚分校", "马来亚大学", "马来西亚亚太科技大学"],
  },
]

export function InfiniteSlider() {
  return (
    <div className="relative flex flex-col gap-3 overflow-hidden py-4 mask-gradient">
      {/* First row - Slow */}
      <div className="flex gap-4 animate-scroll-slow">
        {[...universities[0].row1, ...universities[0].row1].map((name, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm px-8 h-12 text-slate-800 whitespace-nowrap"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Second row - Medium */}
      <div className="flex gap-4 animate-scroll-medium">
        {[...universities[0].row2, ...universities[0].row2].map((name, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm px-8 h-12 text-slate-800 whitespace-nowrap"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Gradient masks */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-rose-100 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-rose-100 to-transparent z-10" />
    </div>
  )
}
