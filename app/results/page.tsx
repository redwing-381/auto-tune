"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Download, ExternalLink, CheckCircle, TrendingUp, Clock, Copy, ArrowLeft, Key } from "lucide-react"
import { Scene3D } from "@/components/3d-scene"

export default function ResultsPage() {
  const router = useRouter()
  const [modelCard, setModelCard] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDeployed, setIsDeployed] = useState(false)
  const [apiKey, setApiKey] = useState("")

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

    // Check if user came from training completion and auto-deploy
    const isFromTraining = sessionStorage.getItem("trainingCompleted")
    if (isFromTraining && !isDeployed && !isDeploying) {
      sessionStorage.removeItem("trainingCompleted") // Clear the flag
      // Auto-start deployment after a short delay
      setTimeout(() => {
        handleDeploy()
      }, 2000)
    }
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
    // Simulate deployment with API key generation
    setTimeout(() => {
      setIsDeploying(false)
      setIsDeployed(true)
      // Generate a more realistic API key
      const prefix = "at" // Auto Tune prefix
      const timestamp = Date.now().toString(36)
      const random1 = Math.random().toString(36).substring(2, 10)
      const random2 = Math.random().toString(36).substring(2, 10)
      const generatedApiKey = `${prefix}_${timestamp}${random1}${random2}`.substring(0, 32)
      setApiKey(generatedApiKey)
    }, 3000)
  }

  const copyModelCard = () => {
    navigator.clipboard.writeText(modelCard)
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
  }

  const copyEndpoint = () => {
    const endpoint = `https://api.auto-tune.dev/v1/models/${apiKey.slice(-8)}/predict`
    navigator.clipboard.writeText(endpoint)
  }

  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <h1 
                className="text-4xl font-bold text-pink-100"
                style={{ textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black' }}
              >
                Training Complete!
              </h1>
            </div>
            <p 
              className="text-lg text-pink-200 max-w-2xl mx-auto"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              Your model has been successfully fine-tuned. Review the results and deploy or download your model.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Results Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Metrics */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader>
                  <CardTitle 
                    className="flex items-center space-x-2 text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Final Performance Metrics</span>
                  </CardTitle>
                  <CardDescription 
                    className="text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Your model's performance on the validation dataset
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-pink-200"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Accuracy
                        </span>
                        <div className="flex items-center space-x-2">
                          <span 
                            className="text-2xl font-bold text-green-400"
                            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                          >
                            {finalMetrics.accuracy}%
                          </span>
                          <Badge className="bg-green-400/20 text-green-400 border-green-400/50">
                            Excellent
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-pink-200"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          F1 Score
                        </span>
                        <span 
                          className="text-xl font-semibold text-pink-100"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          {finalMetrics.f1Score}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-pink-200"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Precision
                        </span>
                        <span 
                          className="text-xl font-semibold text-pink-100"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          {finalMetrics.precision}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-pink-200"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Recall
                        </span>
                        <span 
                          className="text-xl font-semibold text-pink-100"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          {finalMetrics.recall}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-pink-200"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Final Loss
                        </span>
                        <span 
                          className="text-xl font-semibold text-pink-100"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          {finalMetrics.loss}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-pink-200"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Training Time
                        </span>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-pink-300" />
                          <span 
                            className="text-xl font-semibold text-pink-100"
                            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                          >
                            {finalMetrics.trainingTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Model Card */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className="text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Auto-Generated Model Card
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={copyModelCard} className="border-pink-500/50 text-pink-200 hover:bg-pink-500/20">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <CardDescription 
                    className="text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Documentation for your fine-tuned model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={modelCard}
                    onChange={(e) => setModelCard(e.target.value)}
                    className="min-h-[300px] font-mono text-sm bg-black/60 border-pink-500/30 text-pink-100"
                    placeholder="Model card content..."
                  />
                </CardContent>
              </Card>
            </div>

            {/* Actions Sidebar */}
            <div className="space-y-6">
              {/* Download Model */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader>
                  <CardTitle 
                    className="text-lg flex items-center space-x-2 text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    <Download className="h-5 w-5 text-blue-400" />
                    <span>Download Model</span>
                  </CardTitle>
                  <CardDescription 
                    className="text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Download your fine-tuned model files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleDownload} 
                    disabled={isDownloading} 
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                    size="lg"
                  >
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
                  <p 
                    className="text-xs text-pink-300 mt-2 text-center"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    ~245 MB • PyTorch format
                  </p>
                </CardContent>
              </Card>

              {/* Deploy to Hugging Face */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader>
                  <CardTitle 
                    className="text-lg flex items-center space-x-2 text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    <ExternalLink className="h-5 w-5 text-orange-400" />
                    <span>Deploy Model</span>
                  </CardTitle>
                  <CardDescription 
                    className="text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Deploy and get your API key
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={handleDeploy}
                    disabled={isDeploying || isDeployed}
                    className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 disabled:opacity-50"
                    size="lg"
                  >
                    {isDeploying ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Deploying...</span>
                      </div>
                    ) : isDeployed ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Deployed</span>
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

                  {/* API Key Section */}
                  {isDeployed && apiKey && (
                    <div className="mt-4 space-y-4">
                      {/* Success Message */}
                      <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-center">
                        <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                        <p 
                          className="text-green-400 font-medium"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          🎉 Model Successfully Deployed!
                        </p>
                        <p 
                          className="text-green-300 text-sm mt-1"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Your model is live and ready to use
                        </p>
                      </div>

                      {/* API Key Display */}
                      <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Key className="h-5 w-5 text-purple-400" />
                            <span 
                              className="text-lg font-bold text-purple-300"
                              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                            >
                              Your API Key
                            </span>
                          </div>
                          <Badge className="bg-purple-500/30 text-purple-200 border-purple-400/50">
                            Active
                          </Badge>
                        </div>
                        
                        <div className="bg-black/80 rounded-lg p-4 mb-3">
                          <code 
                            className="text-pink-100 font-mono text-sm break-all"
                            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                          >
                            {apiKey}
                          </code>
                        </div>

                        <Button 
                          onClick={copyApiKey} 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy API Key
                        </Button>
                      </div>

                      {/* Model Endpoint Information */}
                      <div className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl">
                        <h4 
                          className="text-blue-300 font-medium mb-2 flex items-center space-x-2"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>API Endpoint</span>
                        </h4>
                        <div className="bg-black/80 rounded-lg p-3 mb-3">
                          <code 
                            className="text-blue-200 font-mono text-xs break-all"
                            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                          >
                            https://api.auto-tune.dev/v1/models/{apiKey.slice(-8)}/predict
                          </code>
                        </div>
                        <p 
                          className="text-blue-200 text-xs"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Use this endpoint to make predictions with your model
                        </p>
                        <Button 
                          onClick={copyEndpoint} 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-blue-500/50 text-blue-300 hover:bg-blue-500/20 mt-2"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Endpoint
                        </Button>
                      </div>

                      {/* Usage Instructions */}
                      <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
                        <h4 
                          className="text-orange-300 font-medium mb-3"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          📋 Quick Start
                        </h4>
                        <div className="bg-black/80 rounded-lg p-3 font-mono text-xs">
                          <div 
                            className="text-gray-400 mb-2"
                            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                          >
                            # Python Example
                          </div>
                          <div 
                            className="text-orange-200"
                            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                          >
                            {`import requests

headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}

data = {
    "inputs": "Your text here"
}

response = requests.post(
    "https://api.auto-tune.dev/v1/predict",
    headers=headers,
    json=data
)`}
                          </div>
                        </div>
                        <p 
                          className="text-orange-200 text-xs mt-2"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          💡 Keep your API key secure and never share it publicly
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Model Info */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader>
                  <CardTitle 
                    className="text-lg text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Model Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Base Model
                    </span>
                    <span 
                      className="font-medium text-sm text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      bert-base-uncased
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Task Type
                    </span>
                    <span 
                      className="font-medium text-sm text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Text Classification
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Parameters
                    </span>
                    <span 
                      className="font-medium text-sm text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      110M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Model Size
                    </span>
                    <span 
                      className="font-medium text-sm text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      245 MB
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full rounded-xl bg-black/40 border-pink-500/50 text-pink-200 hover:bg-pink-500/20">
                  <Link href="/history" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>View Training History</span>
                  </Link>
                </Button>
                <Button asChild className="w-full rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  <Link href="/upload" className="flex items-center space-x-2">
                    <span>Train Another Model</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
