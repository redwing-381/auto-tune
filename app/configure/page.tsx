"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Clock, Zap, ArrowRight } from "lucide-react"

export default function ConfigurePage() {
  const router = useRouter()
  const [epochs, setEpochs] = useState([3])
  const [batchSize, setBatchSize] = useState([16])
  const [learningRate, setLearningRate] = useState([0.00002])
  const [advancedSettings, setAdvancedSettings] = useState(false)
  const [fileInfo, setFileInfo] = useState<any>(null)
  const [taskInfo, setTaskInfo] = useState<any>(null)

  useEffect(() => {
    const storedFile = sessionStorage.getItem("uploadedFile")
    const storedTask = sessionStorage.getItem("selectedTask")
    const storedModel = sessionStorage.getItem("selectedModel")

    if (storedFile && storedTask && storedModel) {
      setFileInfo(JSON.parse(storedFile))
      setTaskInfo({ task: storedTask, model: storedModel })
    } else {
      router.push("/upload")
    }
  }, [router])

  const estimatedTime = Math.ceil((epochs[0] * fileInfo?.rowCount || 1000) / (batchSize[0] * 60)) // Rough estimation

  const handleStartTraining = () => {
    const config = {
      epochs: epochs[0],
      batchSize: batchSize[0],
      learningRate: learningRate[0],
      advancedSettings,
    }

    sessionStorage.setItem("trainingConfig", JSON.stringify(config))
    router.push("/train")
  }

  if (!fileInfo || !taskInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Training Configuration</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Fine-tune your training parameters to optimize model performance for your specific use case.
          </p>
        </div>

        <div className="space-y-8">
          {/* Training Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Dataset</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{fileInfo.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">{fileInfo.rowCount}+ samples</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Task</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {taskInfo.task.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Model</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{taskInfo.model}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Training Parameters</span>
              </CardTitle>
              <CardDescription>Adjust these parameters to control how your model learns from the data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Epochs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Training Epochs</Label>
                  <Badge variant="outline">{epochs[0]}</Badge>
                </div>
                <Slider value={epochs} onValueChange={setEpochs} max={10} min={1} step={1} className="w-full" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Number of complete passes through the training dataset. More epochs = longer training but potentially
                  better performance.
                </p>
              </div>

              <Separator />

              {/* Batch Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Batch Size</Label>
                  <Badge variant="outline">{batchSize[0]}</Badge>
                </div>
                <Slider value={batchSize} onValueChange={setBatchSize} max={64} min={8} step={8} className="w-full" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Number of samples processed before updating model weights. Larger batches = more stable training but
                  higher memory usage.
                </p>
              </div>

              <Separator />

              {/* Learning Rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Learning Rate</Label>
                  <Badge variant="outline">{learningRate[0].toExponential(1)}</Badge>
                </div>
                <Slider
                  value={learningRate}
                  onValueChange={setLearningRate}
                  max={0.0001}
                  min={0.00001}
                  step={0.00001}
                  className="w-full"
                />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Controls how quickly the model adapts to the problem. Lower rates = more stable but slower learning.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings Toggle */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Advanced Settings</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Enable additional configuration options for expert users
                  </p>
                </div>
                <Switch checked={advancedSettings} onCheckedChange={setAdvancedSettings} />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings Panel */}
          {advancedSettings && (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Advanced Configuration</span>
                </CardTitle>
                <CardDescription>Fine-tune additional parameters for optimal performance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Warmup Steps</Label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Auto (10% of total steps)</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weight Decay</Label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-600 dark:text-slate-400">0.01</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gradient Clipping</Label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-600 dark:text-slate-400">1.0</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Evaluation Strategy</Label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Every epoch</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Estimated Time */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-xl">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Estimated Training Time</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Approximately {estimatedTime} minutes based on your configuration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Training Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleStartTraining}
              size="lg"
              className="rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <span>Start Training</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
