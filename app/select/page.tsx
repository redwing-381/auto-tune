"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MessageSquare, FileText, HelpCircle, Zap, Tag, ArrowRight, Info } from "lucide-react"

const tasks = [
  {
    id: "text-classification",
    title: "Text Classification",
    description: "Categorize text into predefined classes or labels",
    icon: Tag,
    examples: "Sentiment analysis, spam detection, topic classification",
    popular: true,
  },
  {
    id: "summarization",
    title: "Summarization",
    description: "Generate concise summaries of longer texts",
    icon: FileText,
    examples: "Article summarization, document condensation",
    popular: false,
  },
  {
    id: "question-answering",
    title: "Question & Answering",
    description: "Answer questions based on provided context",
    icon: HelpCircle,
    examples: "Reading comprehension, FAQ systems",
    popular: true,
  },
  {
    id: "named-entity-recognition",
    title: "Named Entity Recognition",
    description: "Identify and classify named entities in text",
    icon: Zap,
    examples: "Person names, locations, organizations",
    popular: false,
  },
]

const models = [
  {
    id: "bert-base-uncased",
    name: "BERT Base Uncased",
    description: "General-purpose transformer model, great for classification tasks",
    parameters: "110M",
    tasks: ["text-classification", "named-entity-recognition"],
  },
  {
    id: "distilbert-base-uncased",
    name: "DistilBERT Base Uncased",
    description: "Faster, smaller version of BERT with 97% performance",
    parameters: "66M",
    tasks: ["text-classification", "named-entity-recognition"],
  },
  {
    id: "t5-small",
    name: "T5 Small",
    description: "Text-to-text transfer transformer, versatile for many tasks",
    parameters: "60M",
    tasks: ["summarization", "question-answering"],
  },
  {
    id: "bart-large-cnn",
    name: "BART Large CNN",
    description: "Optimized for summarization and text generation",
    parameters: "406M",
    tasks: ["summarization"],
  },
]

export default function SelectPage() {
  const router = useRouter()
  const [selectedTask, setSelectedTask] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [fileInfo, setFileInfo] = useState<any>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("uploadedFile")
    if (stored) {
      setFileInfo(JSON.parse(stored))
    } else {
      router.push("/upload")
    }
  }, [router])

  const availableModels = models.filter((model) => (selectedTask ? model.tasks.includes(selectedTask) : true))

  const handleContinue = () => {
    if (selectedTask && selectedModel) {
      sessionStorage.setItem("selectedTask", selectedTask)
      sessionStorage.setItem("selectedModel", selectedModel)
      router.push("/configure")
    }
  }

  if (!fileInfo) {
    return <div>Loading...</div>
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Choose Model & Task</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Select the type of task you want to perform and choose a pre-trained model to fine-tune.
            </p>
          </div>

          <div className="space-y-8">
            {/* File Info */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Dataset: {fileInfo.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {fileInfo.headers.length} columns • {fileInfo.rowCount}+ rows
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Ready
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Task Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Select Task Type</span>
                </CardTitle>
                <CardDescription>
                  Choose the type of machine learning task you want to perform with your data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedTask} onValueChange={setSelectedTask}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="relative">
                        <Label
                          htmlFor={task.id}
                          className="cursor-pointer block p-4 rounded-xl border-2 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-900/20"
                        >
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value={task.id} id={task.id} className="mt-1" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <task.icon className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-slate-900 dark:text-white">{task.title}</h3>
                                {task.popular && (
                                  <Badge variant="secondary" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-slate-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Examples: {task.examples}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{task.description}</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Model Selection */}
            {selectedTask && (
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Select Base Model</span>
                  </CardTitle>
                  <CardDescription>Choose a pre-trained model that will be fine-tuned on your dataset.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full h-auto p-4">
                      <SelectValue placeholder="Choose a model..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model.id} value={model.id} className="p-4">
                          <div className="flex flex-col items-start space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{model.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {model.parameters}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{model.description}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Continue Button */}
            {selectedTask && selectedModel && (
              <div className="flex justify-center animate-scale-in">
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <span>Configure Training</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
