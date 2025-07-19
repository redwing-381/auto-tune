"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  History,
  MoreHorizontal,
  Download,
  ExternalLink,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
} from "lucide-react"

interface TrainingJob {
  id: string
  datasetName: string
  task: string
  model: string
  status: "completed" | "failed" | "running"
  accuracy?: number
  createdAt: string
  duration: string
}

const mockJobs: TrainingJob[] = [
  {
    id: "1",
    datasetName: "customer-reviews.csv",
    task: "Text Classification",
    model: "bert-base-uncased",
    status: "completed",
    accuracy: 94.2,
    createdAt: "2024-01-15",
    duration: "12:34",
  },
  {
    id: "2",
    datasetName: "product-descriptions.csv",
    task: "Summarization",
    model: "t5-small",
    status: "completed",
    accuracy: 89.7,
    createdAt: "2024-01-14",
    duration: "8:45",
  },
  {
    id: "3",
    datasetName: "support-tickets.csv",
    task: "Text Classification",
    model: "distilbert-base-uncased",
    status: "failed",
    createdAt: "2024-01-13",
    duration: "2:15",
  },
  {
    id: "4",
    datasetName: "news-articles.csv",
    task: "Named Entity Recognition",
    model: "bert-base-uncased",
    status: "running",
    createdAt: "2024-01-15",
    duration: "5:23",
  },
]

export default function HistoryPage() {
  const [jobs] = useState<TrainingJob[]>(mockJobs)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "running":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Running</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Training History</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              View and manage all your previous training jobs. Re-run, download, or deploy your models.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Link href="/upload" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>New Training</span>
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {jobs.filter((j) => j.status === "completed").length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {jobs.filter((j) => j.status === "running").length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Running</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {jobs.filter((j) => j.status === "failed").length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Failed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{jobs.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>All Training Jobs</span>
            </CardTitle>
            <CardDescription>Manage your training history and access your models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dataset</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell className="font-medium">{job.datasetName}</TableCell>
                      <TableCell>{job.task}</TableCell>
                      <TableCell className="font-mono text-sm">{job.model}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status)}
                          {getStatusBadge(job.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {job.accuracy ? (
                          <span className="font-semibold text-green-600">{job.accuracy}%</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{job.duration}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">{job.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {job.status === "completed" && (
                              <>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Deploy
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Re-run
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
