"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Course {
  id: number
  name: string
  relatedSchools: {
    name: string
  }
  level: string
  currency: string
  fee: number
  durationInMonth: string[]
  intakes: string[]
  locations: string[]
}

interface CourseResponse {
  docs: Course[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: number | null
  page: number
  totalDocs: number
  totalPages: number
}

const filterOptions = {
  location: ["全部", "selangor", "johor", "penang", "kuala_lumpur", "kuching", "sarawak", "perak"],
  level: ["全部", "foundation", "diploma", "degree", "master", "phd", "certificate"],
  intake: ["全部", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
}

const locationLabels: Record<string, string> = {
  selangor: "雪兰莪",
  johor: "柔佛",
  penang: "槟城",
  kuala_lumpur: "吉隆坡",
  kuching: "古晋",
  sarawak: "砂拉越",
  perak: "霹雳",
}

const levelLabels: Record<string, string> = {
  foundation: "预科",
  diploma: "专科",
  degree: "本科",
  master: "硕士",
  phd: "博士",
  certificate: "证书",
}

const intakeLabels: Record<string, string> = {
  "1": "1月",
  "2": "2月",
  "3": "3月",
  "4": "4月",
  "5": "5月",
  "6": "6月",
  "7": "7月",
  "8": "8月",
  "9": "9月",
  "10": "10月",
  "11": "11月",
  "12": "12月",
}

type FilterKey = "location" | "level" | "intake"

const ITEMS_PER_PAGE = 10

export default function CoursesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<CourseResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    level: searchParams.get("level") || "",
    intake: searchParams.get("intake") || "",
  })

  const currentPage = Number(searchParams.get("page")) || 1

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const queryParams = new URLSearchParams()

        if (filters.location) {
          queryParams.set("where[locations][contains]", filters.location)
        }
        if (filters.level) {
          queryParams.set("where[level][equals]", filters.level)
        }
        if (filters.intake) {
          queryParams.set("where[intakes][contains]", filters.intake)
        }

        queryParams.set("depth", String(2))
        queryParams.set("limit", String(ITEMS_PER_PAGE))
        queryParams.set("page", String(currentPage))

        const response = await fetch(`https://homeseek-cms.vercel.app/api/courses?${queryParams.toString()}`)
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
      }
      setIsLoading(false)
    }

    fetchCourses()
  }, [filters, currentPage])

  const updateFilters = (key: FilterKey, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "全部" ? "" : value,
    }
    setFilters(newFilters)

    // Update URL params and reset to first page
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    params.set("page", "1")
    router.push(`/courses?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/courses?${params.toString()}`)
  }

  const handleApply = (university: string, course: string) => {
    const params = new URLSearchParams({
      university,
      course,
    })
    router.push(`/apply?${params.toString()}`)
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <main className="flex min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">搜索结果</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">地点</label>
              <Select value={filters.location || "全部"} onValueChange={(value) => updateFilters("location", value)}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.location.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === "全部" ? option : locationLabels[option] || option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">学历</label>
              <Select value={filters.level || "全部"} onValueChange={(value) => updateFilters("level", value)}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.level.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === "全部" ? option : levelLabels[option] || option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">入学时间</label>
              <Select value={filters.intake || "全部"} onValueChange={(value) => updateFilters("intake", value)}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.intake.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === "全部" ? option : intakeLabels[option] || option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm text-slate-600">共找到 {courses?.totalDocs || 0} 个结果</div>

        <div className="grid gap-4">
          {isLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : (
            courses?.docs.map((course) => (
              <Card key={course.id} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">学历</span>
                      <span className="font-medium text-slate-800">{levelLabels[course.level]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">大学</span>
                      <span className="font-medium text-slate-800">{course.relatedSchools.name.split("@")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">学院</span>
                      <span className="font-medium text-slate-800">{course.relatedSchools.name.split("@")[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">地点</span>
                      <span className="font-medium text-slate-800">
                        {course.locations.map((location) => locationLabels[location]).join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">学制</span>
                      <span className="font-medium text-slate-800">{course.durationInMonth[0]} 个月</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">学费</span>
                      <span className="font-medium text-slate-800">{formatCurrency(course.fee, course.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">入学月份</span>
                      <span className="font-medium text-slate-800">
                        {course.intakes.map((intake) => intakeLabels[intake]).join(", ")}
                      </span>
                    </div>
                    <Button
                      className="mt-4 w-full"
                      onClick={() => handleApply(course.relatedSchools.name, course.name)}
                    >
                      提交申请
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {courses && courses.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (courses.hasPrevPage) handlePageChange(currentPage - 1)
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: courses.totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === courses.totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(page)
                          }}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }

                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (courses.hasNextPage) handlePageChange(currentPage + 1)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  )
}
