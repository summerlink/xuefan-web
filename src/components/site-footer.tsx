export function SiteFooter() {
  return (
    <footer className="w-full h-12 flex items-center bg-transparent">
      <div className="container flex justify-center items-center px-4 mx-auto">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} 学帆. All rights reserved.</p>
      </div>
    </footer>
  )
}
