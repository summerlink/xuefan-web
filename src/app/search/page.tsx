"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { locationLabels, levelLabels, intakeLabels, type University } from "@/lib/translation"

const steps = [
  {
    title: "选择地点",
    options: ["selangor", "johor", "penang", "kuala_lumpur", "kuching", "sarawak", "perak"],
    labels: {
      ...locationLabels,
    },
  },
  {
    title: "选择学历",
    options: ["foundation", "diploma", "degree", "master", "phd", "certificate"],
    labels: {
      ...levelLabels,
    },
  },
  {
    title: "选择入学时间",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    labels: {
      ...intakeLabels,
    },
  },
  {
    title: "选择院校",
    options: [] as string[],
    labels: {} as Record<string, string>,
  },
]

export default function SearchPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<number, string>>({})
  const [universities, setUniversities] = useState<University[]>([])

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(
          "https://homeseek-cms.vercel.app/api/universities?depth=0&select[name]=true&limit=100",
        )
        const data = await response.json()
        setUniversities(data.docs)
        // Update steps with universities data
        steps[3].options = data.docs.map((uni: University) => uni.id.toString())
        steps[3].labels = Object.fromEntries(data.docs.map((uni: University) => [uni.id.toString(), uni.name]))
      } catch (error) {
        console.error("Error fetching universities:", error)
      }
    }

    fetchUniversities()
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to courses page with form data as query params
      const params = new URLSearchParams({
        location: formData[0] || "",
        level: formData[1] || "",
        intake: formData[2] || "",
        university: formData[3] || "",
      })
      window.location.href = `/courses?${params.toString()}`
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSelect = (value: string) => {
    setFormData({ ...formData, [currentStep]: value })
  }

  return (
    <main className="flex min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="mb-8 inline-flex items-center text-slate-600 hover:text-slate-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回首页
        </Link>

        <div className="rounded-xl bg-white/70 backdrop-blur-sm p-6 shadow-lg">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-600">
                步骤 {currentStep + 1} / {steps.length}
              </span>
              <span className="text-sm text-slate-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-600 transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">{steps[currentStep].title}</h2>
            <Select value={formData[currentStep]} onValueChange={handleSelect}>
              <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                {steps[currentStep].options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {steps[currentStep].labels[option as keyof (typeof steps)[typeof currentStep]["labels"]]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              上一步
            </Button>
            <Button onClick={handleNext} disabled={!formData[currentStep]}>
              {currentStep === steps.length - 1 ? "搜索" : "下一步"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
