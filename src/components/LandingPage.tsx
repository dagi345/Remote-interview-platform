import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Code2, Users, Video, CheckCircle, BookOpen, Clock } from 'lucide-react'

function LandingPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-[calc(100vh-4rem-1px)] flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-background to-secondary/20">
        <h1 className="text-5xl font-bold mb-6">Ace Your Technical Interview</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Your comprehensive platform for technical interviews. Practice coding, meet with experienced interviewers, and showcase your skills in a professional environment.
        </p>
        <div className="flex gap-4">
          <Button size="lg" onClick={() => router.push('/sign-up')}>Get Started</Button>
          <Button size="lg" onClick={() => router.push('/sign-in')} variant="outline">Sign In</Button>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What to Expect</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <Code2 className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Live Coding</h3>
            <p className="text-muted-foreground">
              Solve real-world coding problems in our integrated development environment. Choose from Python, JavaScript, or Java.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <Users className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Expert Interviewers</h3>
            <p className="text-muted-foreground">
              Meet with experienced technical interviewers who will evaluate your problem-solving skills and coding practices.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <Video className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Recorded Sessions</h3>
            <p className="text-muted-foreground">
              All interviews are recorded for review. Get detailed feedback on your performance and areas for improvement.
            </p>
          </div>
        </div>
      </div>

      {/* Interview Guide */}
      <div className="bg-secondary/20 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Interview Guide</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Duration</h3>
                  <p className="text-muted-foreground">Interviews typically last 45-60 minutes, including coding and discussion.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Preparation</h3>
                  <p className="text-muted-foreground">Review data structures, algorithms, and system design concepts. Practice coding problems beforehand.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Evaluation</h3>
                  <p className="text-muted-foreground">You'll be evaluated on problem-solving approach, code quality, communication, and technical knowledge.</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Tips for Success</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Think out loud and explain your approach</li>
                <li>• Ask clarifying questions when needed</li>
                <li>• Consider edge cases in your solutions</li>
                <li>• Write clean, well-documented code</li>
                <li>• Test your solution with examples</li>
                <li>• Be open to feedback and suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>Practice Problems</li>
                <li>Interview Tips</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Interview Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage