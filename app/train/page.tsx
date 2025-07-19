"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, Square, TrendingUp, Clock, Zap, CheckCircle, Brain } from "lucide-react"
import { Scene3D } from "@/components/3d-scene"

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
   *  nested updates => "maximum update depth exceeded"). */
  const trainingRef = useRef(isTraining)
  const pausedRef = useRef(isPaused)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  /* keep refs in sync with state */
  useEffect(() => {
    trainingRef.current = isTraining
  }, [isTraining])
  useEffect(() => {
    pausedRef.current = isPaused
  }, [isPaused])

  const [currentEpoch, setCurrentEpoch] = useState(1)
  const [logs, setLogs] = useState<TrainingLog[]>([])
  const [metrics, setMetrics] = useState({
    accuracy: 0,
    loss: 2.5,
    timeElapsed: 0,
  })
  const [config, setConfig] = useState<any>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  // Memoized functions to prevent recreation
  const addLog = useCallback((newLog: TrainingLog) => {
    setLogs(prev => [...prev.slice(-20), newLog]) // Keep only last 20 logs
  }, [])

  const updateMetrics = useCallback((accuracy: number, loss: number) => {
    setMetrics(prev => ({
      accuracy: Math.min(accuracy, 95),
      loss: Math.max(loss, 0.08),
      timeElapsed: prev.timeElapsed + 2, // Increment by 2 for slower time progression
    }))
  }, [])

  useEffect(() => {
    const storedConfig = sessionStorage.getItem("trainingConfig")
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig))
    } else {
      // Create default config for simulation
      setConfig({
        epochs: 5,
        batchSize: 16,
        learningRate: 0.00002,
        modelName: "bert-base-uncased",
        taskType: "text-classification"
      })
    }

    // Initial setup phase
    const initTimeout = setTimeout(() => {
      setIsInitializing(false)
      const initialLogs = [
        {
          timestamp: new Date().toLocaleTimeString(),
          epoch: 0,
          step: 0,
          loss: 2.5,
          message: "🚀 Initializing training environment..."
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          epoch: 0,
          step: 0,
          loss: 2.5,
          message: "📊 Loading dataset and preprocessing..."
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          epoch: 0,
          step: 0,
          loss: 2.5,
          message: "🧠 Loading pre-trained model: bert-base-uncased"
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          epoch: 0,
          step: 0,
          loss: 2.5,
          message: "⚙️ Setting up training configuration..."
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          epoch: 0,
          step: 0,
          loss: 2.5,
          message: "✨ Starting fine-tuning process..."
        }
      ]
      setLogs(initialLogs)
    }, 2000)

    return () => clearTimeout(initTimeout)
  }, [])

  useEffect(() => {
    if (!config || isInitializing) return

    intervalRef.current = setInterval(() => {
      // use refs instead of state variables here
      if (!trainingRef.current || pausedRef.current) return

      setProgress((prev) => {
        const increment = Math.random() * 1 + 0.5 // Smaller increment: 0.5-1.5%
        const next = Math.min(prev + increment, 100)

        // Batch updates to prevent excessive re-renders
        if (Math.random() > 0.7) { // Reduce log frequency
          const step = Math.floor((next / 100) * 500) + 1
          const epoch = Math.ceil((next / 100) * 5)
          const currentLoss = Math.max(2.5 - (next / 100) * 2.4, 0.08)
          const currentAccuracy = Math.min((next / 100) * 95, 95)

          // Update metrics
          updateMetrics(currentAccuracy, currentLoss)

          const messages = [
            `📈 Epoch ${epoch}/5 - Step ${step}: Loss=${currentLoss.toFixed(4)}, Accuracy=${currentAccuracy.toFixed(1)}%`,
            `🔄 Processing batch ${step}... Learning rate: 2e-5`,
            `💪 Model improving! Validation accuracy: ${currentAccuracy.toFixed(1)}%`,
            `🎯 Fine-tuning transformer layers... Progress: ${next.toFixed(1)}%`,
          ]

          addLog({
            timestamp: new Date().toLocaleTimeString(),
            epoch: epoch,
            step: step,
            loss: currentLoss,
            accuracy: currentAccuracy,
            message: messages[Math.floor(Math.random() * messages.length)],
          })
        }

        // epoch change
        if (next >= (currentEpoch / 5) * 100 && currentEpoch < 5) {
          setCurrentEpoch((ep) => {
            const newEpoch = ep + 1
            addLog({
              timestamp: new Date().toLocaleTimeString(),
              epoch: newEpoch,
              step: 0,
              loss: Math.max(2.5 - (next / 100) * 2.4, 0.08),
              accuracy: Math.min((next / 100) * 95, 95),
              message: `🎉 Completed Epoch ${ep}! Starting Epoch ${newEpoch}...`,
            })
            return newEpoch
          })
        }

        // finish
        if (next >= 100) {
          setIsTraining(false)
          addLog({
            timestamp: new Date().toLocaleTimeString(),
            epoch: 5,
            step: 500,
            loss: 0.08,
            accuracy: 94.2,
            message: "🎊 Training completed successfully! Final accuracy: 94.2%",
          })
          setTimeout(() => {
            addLog({
              timestamp: new Date().toLocaleTimeString(),
              epoch: 5,
              step: 500,
              loss: 0.08,
              accuracy: 94.2,
              message: "✅ Model saved! Redirecting to results...",
            })
            setTimeout(() => {
              sessionStorage.setItem("trainingCompleted", "true") // Set flag for auto-deployment
              router.push("/results")
            }, 1000)
          }, 2000)
        }

        return next
      })
    }, 1500) // Fixed interval: 1.5 seconds for stability

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [config, isInitializing, currentEpoch, router, addLog, updateMetrics])

  const handlePause = useCallback(() => {
    setIsPaused((p) => {
      pausedRef.current = !p
      const newPaused = !p
      addLog({
        timestamp: new Date().toLocaleTimeString(),
        epoch: currentEpoch,
        step: Math.floor((progress / 100) * 500),
        loss: metrics.loss,
        accuracy: metrics.accuracy,
        message: newPaused ? "⏸️ Training paused by user" : "▶️ Resuming training...",
      })
      return newPaused
    })
  }, [currentEpoch, progress, metrics, addLog])

  const handleStop = useCallback(() => {
    trainingRef.current = false
    setIsTraining(false)
    addLog({
      timestamp: new Date().toLocaleTimeString(),
      epoch: currentEpoch,
      step: Math.floor((progress / 100) * 500),
      loss: metrics.loss,
      accuracy: metrics.accuracy,
      message: "⏹️ Training stopped by user. Saving current progress...",
    })
    setTimeout(() => router.push("/results"), 2000)
  }, [currentEpoch, progress, metrics, router, addLog])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }, [])

  if (!config) {
    return (
      <div className="relative min-h-screen">
        <Scene3D />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p 
              className="text-pink-200"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              Loading configuration...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 
              className="text-4xl font-bold text-pink-100 mb-4"
              style={{ textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black' }}
            >
              {isInitializing ? "Initializing Training..." : "Training Dashboard"}
            </h1>
            <p 
              className="text-lg text-pink-200 max-w-2xl mx-auto"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              {isInitializing 
                ? "Setting up your fine-tuning environment..." 
                : "Monitor your model training progress in real-time with detailed metrics and logs."
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Training Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Card */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className="flex items-center space-x-2 text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      <TrendingUp className="h-5 w-5" />
                      <span>Training Progress</span>
                    </CardTitle>
                    <Badge 
                      className={`${
                        isInitializing 
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/50" 
                          : isTraining 
                            ? (isPaused ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" : "bg-green-500/20 text-green-400 border-green-500/50")
                            : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                      }`}
                    >
                      {isInitializing ? "Initializing" : isTraining ? (isPaused ? "Paused" : "Training") : "Completed"}
                    </Badge>
                  </div>
                  <CardDescription 
                    className="text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    {isInitializing 
                      ? "Preparing training environment..." 
                      : `Epoch ${currentEpoch} of ${config.epochs} • Step ${Math.floor((progress / 100) * 500)}`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span 
                        className="text-pink-200"
                        style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                      >
                        Overall Progress
                      </span>
                      <span 
                        className="text-pink-100 font-medium"
                        style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                      >
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handlePause}
                      variant="outline"
                      size="sm"
                      disabled={!isTraining || isInitializing}
                      className="flex items-center space-x-2 bg-black/40 border-pink-500/50 text-pink-200 hover:bg-pink-500/20"
                    >
                      {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                      <span>{isPaused ? "Resume" : "Pause"}</span>
                    </Button>
                    <Button
                      onClick={handleStop}
                      variant="outline"
                      size="sm"
                      disabled={!isTraining || isInitializing}
                      className="flex items-center space-x-2 bg-black/40 border-red-500/50 text-red-300 hover:bg-red-500/20"
                    >
                      <Square className="h-4 w-4" />
                      <span>Stop</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Training Logs */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader>
                  <CardTitle 
                    className="text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Training Logs
                  </CardTitle>
                  <CardDescription 
                    className="text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Real-time training output and status updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full rounded-md border border-pink-500/30 p-4 bg-black/60 overflow-y-auto">
                    <div className="space-y-2 font-mono text-sm">
                      {logs.length === 0 ? (
                        <p 
                          className="text-pink-300"
                          style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                        >
                          Training logs will appear here...
                        </p>
                      ) : (
                        logs.map((log, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span 
                              className="text-pink-400 text-xs flex-shrink-0"
                              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                            >
                              {log.timestamp}
                            </span>
                            <span 
                              className="text-pink-200 flex-1"
                              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                            >
                              {log.message}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Metrics Sidebar */}
            <div className="space-y-6">
              {/* Accuracy Metric */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="text-lg flex items-center space-x-2 text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Accuracy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="text-3xl font-bold text-green-400 mb-2"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    {metrics.accuracy.toFixed(1)}%
                  </div>
                  <Progress value={metrics.accuracy} className="h-2" />
                </CardContent>
              </Card>

              {/* Loss Metric */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="text-lg flex items-center space-x-2 text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    <span>Loss</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="text-3xl font-bold text-blue-400 mb-2"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    {metrics.loss.toFixed(3)}
                  </div>
                  <div 
                    className="text-sm text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Lower is better
                  </div>
                </CardContent>
              </Card>

              {/* Time Elapsed */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="text-lg flex items-center space-x-2 text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    <Clock className="h-5 w-5 text-purple-400" />
                    <span>Time Elapsed</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="text-3xl font-bold text-purple-400 mb-2"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    {formatTime(metrics.timeElapsed)}
                  </div>
                  <div 
                    className="text-sm text-pink-200"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    Training duration
                  </div>
                </CardContent>
              </Card>

              {/* Configuration Summary */}
              <Card className="bg-black/40 backdrop-blur-md border-pink-500/30">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="text-lg flex items-center space-x-2 text-pink-100"
                    style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                  >
                    <Brain className="h-5 w-5 text-orange-400" />
                    <span>Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Epochs
                    </span>
                    <span 
                      className="font-medium text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      {config.epochs}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Batch Size
                    </span>
                    <span 
                      className="font-medium text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      {config.batchSize}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Learning Rate
                    </span>
                    <span 
                      className="font-medium text-pink-100"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      {config.learningRate.toExponential(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span 
                      className="text-sm text-pink-200"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      Model
                    </span>
                    <span 
                      className="font-medium text-pink-100 text-xs"
                      style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
                    >
                      {config.modelName}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
