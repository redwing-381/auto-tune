"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Download, ExternalLink, CheckCircle, TrendingUp, Clock, Copy, ArrowLeft } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const [modelCard, setModelCard] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const finalMetrics = {
    accuracy: 94.2,
    loss: 0.12,
    f1Score: 0.93,
    precision: 0.95,
    recall: 0.91,
    trainingTime: "12:34",
  }

  useEffect(() => {
    // Generate model card
    const card = `# Fine-tuned Model

## Model Description
This model was fine-tuned using Auto Tune on a custom dataset for text classification.

## Training Details
- **Base Model**: bert-base-uncased
- **Task**: Text Classification
- **Training Time**: ${finalMetrics.trainingTime}
- **Final Accuracy**: ${finalMetrics.accuracy}%

## Performance Metrics
- **Accuracy**: ${finalMetrics.accuracy}%
- **F1 Score**: ${finalMetrics.f1Score}
- **Precision**: ${finalMetrics.precision}
- **Recall**: ${finalMetrics.recall}

## Usage
\`\`\`python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("your-username/your-model")
model = AutoModelForSequenceClassification.from_pretrained("your-username/your-model")
\`\`\`

Generated with Auto Tune - https://auto-tune.dev`

    setModelCard(card)
  }, [])

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false)
      // In a real app, this would trigger a file download
      const blob = new Blob(["Model file content"], { type: "application/octet-stream" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "fine-tuned-model.bin"
      a.click()
      URL.revokeObjectURL(url)
    }, 2000)
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false)
      // In a real app, this would deploy to Hugging Face
      window.open("https://huggingface.co/models", "_blank")
    }, 3000)
  }

  const copyModelCard = () => {
    navigator.clipboard.writeText(modelCard)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Training Complete!</h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Your model has been successfully fine-tuned. Review the results and deploy or download your model.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Results Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Final Performance Metrics</span>
                </CardTitle>
                <CardDescription>Your model's performance on the validation dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Accuracy</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">{finalMetrics.accuracy}%</span>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          Excellent
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">F1 Score</span>
                      <span className="text-xl font-semibold">{finalMetrics.f1Score}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Precision</span>
                      <span className="text-xl font-semibold">{finalMetrics.precision}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Recall</span>
                      <span className="text-xl font-semibold">{finalMetrics.recall}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Final Loss</span>
                      <span className="text-xl font-semibold">{finalMetrics.loss}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Training Time</span>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-xl font-semibold">{finalMetrics.trainingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Auto-Generated Model Card</CardTitle>
                  <Button variant="outline" size="sm" onClick={copyModelCard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <CardDescription>Documentation for your fine-tuned model</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={modelCard}
                  onChange={(e) => setModelCard(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Model card content..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Download Model */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Download className="h-5 w-5 text-blue-600" />
                  <span>Download Model</span>
                </CardTitle>
                <CardDescription>Download your fine-tuned model files</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleDownload} disabled={isDownloading} className="w-full rounded-xl" size="lg">
                  {isDownloading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Preparing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download (.bin)</span>
                    </div>
                  )}
                </Button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">~245 MB • PyTorch format</p>
              </CardContent>
            </Card>

            {/* Deploy to Hugging Face */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-orange-600" />
                  <span>Deploy to Hugging Face</span>
                </CardTitle>
                <CardDescription>Publish your model to Hugging Face Hub</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  variant="outline"
                  className="w-full rounded-xl border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20 bg-transparent"
                  size="lg"
                >
                  {isDeploying ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                      <span>Deploying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🤗</span>
                      </div>
                      <span>Deploy Model</span>
                    </div>
                  )}
                </Button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Requires Hugging Face account
                </p>
              </CardContent>
            </Card>

            {/* Model Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Base Model</span>
                  <span className="font-medium text-sm">bert-base-uncased</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Task Type</span>
                  <span className="font-medium text-sm">Text Classification</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Parameters</span>
                  <span className="font-medium text-sm">110M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Model Size</span>
                  <span className="font-medium text-sm">245 MB</span>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full rounded-xl bg-transparent">
                <Link href="/history" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>View Training History</span>
                </Link>
              </Button>
              <Button asChild className="w-full rounded-xl">
                <Link href="/upload" className="flex items-center space-x-2">
                  <span>Train Another Model</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
