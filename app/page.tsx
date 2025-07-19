"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Scene3D } from "@/components/3d-scene"
import { Upload, ArrowRight, Sparkles, Brain, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Background Scene - street.glb as background */}
      <Scene3D />
      
      {/* Plain Text Overlays - No styling covers */}
      <div 
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ 
          zIndex: 10, 
          pointerEvents: 'none' 
        }}
      >
        {/* Plain Logo - Top Left */}
        <div 
          className="absolute top-8 left-8 flex items-center space-x-3"
          style={{ pointerEvents: 'auto' }}
        >
          <Image
            src="/logo.jpeg"
            alt="Auto Tune Logo"
            width={48}
            height={48}
            className="rounded-xl"
          />
          <span 
            className="text-2xl font-bold text-pink-300"
            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
          >
            Auto Tune
          </span>
        </div>

        {/* Main Content - Plain Text */}
        <div className="text-center max-w-5xl mx-auto space-y-8">
          {/* Plain Badge */}
          <div className="inline-flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span 
              className="text-pink-200 font-medium"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              AI Fine-Tuning Made Simple
            </span>
          </div>

          {/* Plain Headlines */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
            <span 
              className="block text-pink-100 mb-4"
              style={{ textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black' }}
            >
              Transform Your Data
            </span>
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600 bg-clip-text text-transparent">
              Into AI Magic
            </span>
          </h1>

          {/* Plain Description */}
          <p 
            className="text-xl sm:text-2xl text-pink-200 leading-relaxed max-w-4xl mx-auto"
            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
          >
            Upload your CSV, choose a model, and watch as your data becomes a powerful AI system. 
            <br className="hidden sm:block" />
            <span 
              className="font-semibold text-pink-300"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              No coding. No ML expertise. Just results.
            </span>
          </p>

          {/* Plain Feature List */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-green-400" />
              <span 
                className="text-pink-200 font-medium"
                style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
              >
                Drag & Drop CSV
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-400" />
              <span 
                className="text-pink-200 font-medium"
                style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
              >
                Pre-trained Models
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span 
                className="text-pink-200 font-medium"
                style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
              >
                One-Click Deploy
              </span>
            </div>
          </div>

          {/* Plain CTA Button */}
          <div className="mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl px-10 py-6 text-xl font-bold hover:scale-105 transition-all duration-300"
              style={{ pointerEvents: 'auto' }}
            >
              <Link href="/upload" className="flex items-center space-x-3">
                <Upload className="h-6 w-6" />
                <span>Upload Your CSV</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Plain Trust Text - Bottom */}
        <div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
          style={{ pointerEvents: 'auto' }}
        >
          <p 
            className="text-pink-200 text-sm mb-2"
            style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
          >
            Trusted by developers and researchers worldwide
          </p>
          <div className="flex justify-center items-center space-x-6">
            <span 
              className="text-pink-300 text-xs"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              ✓ GDPR Compliant
            </span>
            <span 
              className="text-pink-300 text-xs"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              ✓ Enterprise Ready
            </span>
            <span 
              className="text-pink-300 text-xs"
              style={{ textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black' }}
            >
              ✓ 99.9% Uptime
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
