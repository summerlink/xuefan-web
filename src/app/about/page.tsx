import { Card } from "@/components/ui/card"
import { Building2, GraduationCap, Heart, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl mb-4">关于学帆</h1>
            <p className="text-lg text-slate-600">我们致力于为学生提供优质的留学服务，帮助他们实现留学梦想。</p>
          </div>

          <Card className="bg-white/70 backdrop-blur-sm p-8 mb-8">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">我们的故事</h2>
              <p className="text-slate-600 mb-6">
                学帆成立于2020年，是一家专注于留学咨询服务的教育科技公司。我们的创始团队均来自世界知名高校，深知留学过程中的各种挑战与困惑。正是基于这样的理解与共鸣，我们希望通过科技的力量，让留学申请变得更加简单、透明和高效。
              </p>
              <p className="text-slate-600">
                三年来，我们已经帮助超过1500名学生成功申请到理想的学校。我们不仅提供专业的咨询服务，更开发了智能化的课程匹配系统，让学生能够更快找到适合自己的专业和院校。
              </p>
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Target className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">使命</h3>
                  <p className="text-slate-600">
                    通过创新的技术和专业的服务，为每一位学生提供最适合的留学方案，助力他们实现学术和职业发展目标。
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Heart className="h-6 w-6 text-fuchsia-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">价值观</h3>
                  <p className="text-slate-600">
                    诚信为本，学生利益至上。我们始终坚持以学生为中心，提供真实、可靠的信息和建议。
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="bg-white/70 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">我们的优势</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Building2 className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">广泛的院校网络</h3>
                  <p className="text-slate-600">
                    与150多所知名院校建立了直接合作关系，能够提供第一手的院校信息和申请建议。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <GraduationCap className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">专业的服务团队</h3>
                  <p className="text-slate-600">
                    我们的顾问团队均具有海外留学背景和丰富的咨询经验，能够提供专业、准确的指导。
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
