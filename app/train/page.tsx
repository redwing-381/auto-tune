"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, Square, TrendingUp, Clock, Zap, CheckCircle } from "lucide-react"

interface TrainingLog {
  timestamp: string
  epoch: number
  step: number
  loss: number
  accuracy?: number
  message: string
}

export default function TrainPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [isTraining, setIsTraining] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  /** refs to read the latest value inside the interval without
   *  adding them to the effect dependency list (otherwise the
   *  effect recreates the interval on every tick and causes
   *  nested updates => “maximum update depth exceeded”). */
  const trainingRef = useRef(isTraining)
  const pausedRef = useRef(isPaused)

  /* keep refs in sync with state */
  useEffect(() => {
    trainingRef.current = isTraining
  }, [isTraining])
  useEffect(() => {
    pausedRef.current = isPaused
  }, [isPaused])

  const [currentEpoch, setCurrentEpoch] = useState(1)
  const [currentStep, setCurrentStep] = useState(0)
  const [logs, setLogs] = useState<TrainingLog[]>([])
  const [metrics, setMetrics] = useState({
    accuracy: 0,
    loss: 2.5,
    timeElapsed: 0,
  })
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    const storedConfig = sessionStorage.getItem("trainingConfig")
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig))
    } else {
      router.push("/configure")
      return
    }

    const interval = setInterval(() => {
      // use refs instead of state variables here
      if (!trainingRef.current || pausedRef.current) return

      setProgress((prev) => {
        const next = Math.min(prev + 2, 100)

        // update metrics
        setMetrics((prevMetrics) => ({
          accuracy: Math.min(prevMetrics.accuracy + 0.5, 95),
          loss: Math.max(prevMetrics.loss - 0.02, 0.1),
          timeElapsed: prevMetrics.timeElapsed + 1,
        }))

        // random log entry
        if (Math.random() > 0.7) {
          setLogs((prev) => [
            ...prev.slice(-20),
            {
              timestamp: new Date().toLocaleTimeString(),
              epoch: currentEpoch,
              step: currentStep + 1,
              loss: Math.max(2.5 - (next / 100) * 2.4, 0.1),
              accuracy: Math.min((next / 100) * 95, 95),
              message: `Step ${currentStep + 1}: Training loss decreased`,
            },
          ])
          setCurrentStep((step) => step + 1)
        }

        // epoch change
        if (next >= (currentEpoch / config.epochs) * 100 && currentEpoch < config.epochs) {
          setCurrentEpoch((ep) => ep + 1)
        }

        // finish
        if (next >= 100) {
          setIsTraining(false)
          setTimeout(() => router.push("/results"), 2000)
        }

        return next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [config, currentEpoch, currentStep, router])

  const handlePause = () => {
    setIsPaused((p) => {
      pausedRef.current = !p
      return !p
    })
  }

  const handleStop = () => {
    trainingRef.current = false
    setIsTraining(false)
    router.push("/results")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!config) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Training Dashboard</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Monitor your model training progress in real-time with detailed metrics and logs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Training Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Training Progress</span>
                  </CardTitle>
                  <Badge variant={isTraining ? "default" : "secondary"}>
                    {isTraining ? (isPaused ? "Paused" : "Training") : "Completed"}
                  </Badge>
                </div>
                <CardDescription>
                  Epoch {currentEpoch} of {config.epochs} • Step {currentStep}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handlePause}
                    variant="outline"
                    size="sm"
                    disabled={!isTraining}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    <span>{isPaused ? "Resume" : "Pause"}</span>
                  </Button>
                  <Button
                    onClick={handleStop}
                    variant="destructive"
                    size="sm"
                    disabled={!isTraining}
                    className="flex items-center space-x-2"
                  >
                    <Square className="h-4 w-4" />
                    <span>Stop</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Training Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Training Logs</CardTitle>
                <CardDescription>Real-time training output and status updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 w-full rounded-md border p-4 bg-slate-50 dark:bg-slate-900">
                  <div className="space-y-2 font-mono text-sm">
                    {logs.length === 0 ? (
                      <p className="text-slate-500 dark:text-slate-400">Training logs will appear here...</p>
                    ) : (
                      logs.map((log, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-slate-400 dark:text-slate-500 text-xs">{log.timestamp}</span>
                          <span className="text-slate-700 dark:text-slate-300">{log.message}</span>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Metrics Sidebar */}
          <div className="space-y-6">
            {/* Accuracy Metric */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Accuracy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{metrics.accuracy.toFixed(1)}%</div>
                <Progress value={metrics.accuracy} className="h-2" />
              </CardContent>
            </Card>

            {/* Loss Metric */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Loss</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.loss.toFixed(3)}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Lower is better</div>
              </CardContent>
            </Card>

            {/* Time Elapsed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Time Elapsed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">{formatTime(metrics.timeElapsed)}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Training duration</div>
              </CardContent>
            </Card>

            {/* Configuration Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <span>Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Epochs</span>
                  <span className="font-medium">{config.epochs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Batch Size</span>
                  <span className="font-medium">{config.batchSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Learning Rate</span>
                  <span className="font-medium">{config.learningRate.toExponential(1)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
