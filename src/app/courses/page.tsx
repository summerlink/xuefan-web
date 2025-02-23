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
import { locationLabels, levelLabels, intakeLabels, type University } from "@/lib/translation"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { formatNumber } from "@/lib/utils"

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

type FilterKey = "location" | "level" | "intake" | "university"

const ITEMS_PER_PAGE = 10

export default function CoursesPage() {
  return (
    <Suspense>
      <CoursesPageContent />
    </Suspense>
  )
}

function CoursesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<CourseResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [universities, setUniversities] = useState<University[]>([])
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    level: searchParams.get("level") || "",
    intake: searchParams.get("intake") || "",
    university: searchParams.get("university") || "",
  })

  const currentPage = Number(searchParams.get("page")) || 1

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(
          "https://homeseek-cms.vercel.app/api/universities?depth=0&select[name]=true&limit=100",
        )
        const data = await response.json()
        setUniversities(data.docs)
      } catch (error) {
        console.error("Error fetching universities:", error)
      }
    }

    fetchUniversities()
  }, [])

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
        if (filters.university) {
          queryParams.set("where[relatedSchools.relatedUniversities.id][equals]", filters.university)
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

  const handleApply = (university: string, courseId: number) => {
    const params = new URLSearchParams({
      university,
      courseId: courseId.toString(),
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
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">地点</label>
              <Select value={filters.location || "全部"} onValueChange={(value) => updateFilters("location", value)}>
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
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
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
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
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">院校</label>
              <Select
                value={filters.university || "全部"}
                onValueChange={(value) => updateFilters("university", value)}
              >
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部">全部</SelectItem>
                  {universities.map((uni) => (
                    <SelectItem key={uni.id} value={uni.id.toString()}>
                      {uni.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm text-slate-600">共找到 {formatNumber(courses?.totalDocs || 0)} 个结果</div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {isLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : (
            courses?.docs.map((course) => (
              <Card key={course.id} className="bg-white/70 backdrop-blur-sm">
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
                        {course.intakes.length === 12 ? "全年" : course.intakes.map((intake) => intakeLabels[intake]).join(", ")}
                      </span>
                    </div>
                    <Button className="mt-4 w-full" onClick={() => handleApply(course.relatedSchools.name, course.id)}>
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
