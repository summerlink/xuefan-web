"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

interface UploadedFile {
  name: string
  type: string
  size: number
}

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const university = searchParams.get("university")
  const course = searchParams.get("course")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Application submitted", { uploadedFiles })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <main className="flex min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回课程列表
        </button>

        <Card className="bg-white/80 backdrop-blur-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">申请表</h1>
            <p className="text-slate-600">
              申请 {university} - {course}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">姓氏（拼音）</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">名字（拼音）</Label>
                <Input id="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chineseName">中文姓名</Label>
              <Input id="chineseName" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">电子邮箱</Label>
              <Input id="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">手机号码</Label>
              <Input id="phone" type="tel" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">最高学历</Label>
              <Input id="education" required />
            </div>

            {/* File upload section */}
            <div className="space-y-4">
              <Label>文件上传</Label>
              <div className="grid gap-4">
                <div className="relative border-2 border-dashed border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-600">点击或拖拽文件至此处上传</p>
                    <p className="text-xs text-slate-500">支持 PDF, Word, JPG, PNG 格式</p>
                  </div>
                </div>

                {/* Uploaded files list */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                            <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.name)}
                          className="text-slate-400 hover:text-slate-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">附加信息</Label>
              <Textarea id="message" placeholder="请填写其他需要说明的信息..." className="min-h-[100px]" />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                提交申请
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  )
}

