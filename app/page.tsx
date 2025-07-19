import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Settings, Zap, ArrowRight, Github, FileText, ExternalLink } from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Upload & Validate CSV",
    description: "Simply drag and drop your dataset. We'll automatically validate the format and show you a preview.",
  },
  {
    icon: Settings,
    title: "Choose a Model & Task",
    description:
      "Select from popular Hugging Face models and configure your training task with guided recommendations.",
  },
  {
    icon: Zap,
    title: "Train, Download, or Deploy",
    description: "Start training with one click. Download your fine-tuned model or deploy directly to Hugging Face.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-slate-900 dark:text-white">Fine-tune</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hugging Face models.
              </span>
              <span className="block text-slate-900 dark:text-white">No code. Just upload and deploy.</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Transform your data into powerful AI models without any coding or ML expertise. Upload your dataset,
              choose a model, and deploy in minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <Link href="/upload" className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Dataset</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-2xl px-8 py-4 text-lg font-semibold border-2 hover:scale-105 transition-all duration-200 bg-transparent"
              >
                <Link href="/docs" className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>View Docs</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Three simple steps to AI mastery
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our streamlined process makes fine-tuning accessible to everyone, from beginners to experts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to build your first AI model?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and researchers who are already using Auto Tune to create powerful AI
            applications.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-2xl px-8 py-4 text-lg font-semibold bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Link href="/upload" className="flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Auto Tune</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/about"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/docs"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Docs
              </Link>
              <Link
                href="https://github.com"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://huggingface.co"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Hugging Face</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400">
            <p>&copy; 2024 Auto Tune. Built with ❤️ for the AI community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
