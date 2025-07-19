"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CSVData {
  headers: string[]
  rows: string[][]
}

export default function UploadPage() {
  const router = useRouter()
  const [isDragOver, setIsDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<CSVData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const csvFile = files.find((file) => file.type === "text/csv" || file.name.endsWith(".csv"))

    if (csvFile) {
      processFile(csvFile)
    } else {
      setError("Please upload a valid CSV file.")
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const processFile = async (file: File) => {
    setIsProcessing(true)
    setError(null)
    setFile(file)

    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length < 2) {
        throw new Error("CSV file must have at least a header row and one data row.")
      }

      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
      const rows = lines.slice(1, 6).map((line) => line.split(",").map((cell) => cell.trim().replace(/"/g, "")))

      setCsvData({ headers, rows })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process CSV file.")
      setFile(null)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleContinue = () => {
    if (file && csvData) {
      // Store file data in sessionStorage for the next step
      sessionStorage.setItem(
        "uploadedFile",
        JSON.stringify({
          name: file.name,
          size: file.size,
          headers: csvData.headers,
          rowCount: csvData.rows.length,
        }),
      )
      router.push("/select")
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Upload Your Dataset</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Upload a CSV file containing your training data. We'll validate the format and show you a preview.
          </p>
        </div>

        <div className="space-y-8">
          {/* Upload Area */}
          <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="p-8">
              <div
                className={cn(
                  "relative rounded-2xl border-2 border-dashed transition-all duration-200 p-12 text-center",
                  isDragOver
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Drop your CSV file here
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">or click to browse your files</p>
                    <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                      <p>• Supported format: CSV (.csv)</p>
                      <p>• Maximum file size: 100MB</p>
                      <p>• Must include header row</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing State */}
          {isProcessing && (
            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-slate-600 dark:text-slate-400">Processing your file...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="animate-scale-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success State with Preview */}
          {file && csvData && !error && (
            <div className="space-y-6 animate-scale-in">
              <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  File uploaded successfully! Found {csvData.headers.length} columns and {csvData.rows.length}+ rows.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Data Preview</span>
                  </CardTitle>
                  <CardDescription>
                    Showing first 5 rows of {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {csvData.headers.map((header, index) => (
                            <TableHead key={index} className="font-semibold">
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {csvData.rows.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <TableCell key={cellIndex} className="max-w-xs truncate">
                                {cell}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <span>Continue to Model Selection</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
