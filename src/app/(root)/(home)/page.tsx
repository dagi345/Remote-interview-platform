"use client"

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUSerRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";
import MeetingCard from "@/components/MeetingCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CalendarIcon, 
  Users, 
  CheckCircle2, 
  Clock, 
  CalendarDays, 
  UserCheck,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const router = useRouter()
  const { isLoading } = useUSerRole()
  const { user } = useUser()
  const interviews = useQuery(api.interviews.getAllInterviews) ?? []
  const users = useQuery(api.users.getUsers) ?? []

  const [showModal, setshowModal] = useState(false)
  const [modalType, setmodalType] = useState<"start" | "join">()

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setmodalType("start")
        setshowModal(true)
        break;
      case "Join Interview":
        setmodalType("join")
        setshowModal(true)
        break;
      default:
        router.push(`/${title.toLowerCase()}`)
    }
  }

  if (isLoading) return <LoaderUI />

  // Filter upcoming interviews and sort by date
  const upcomingInterviews = interviews
    ?.filter(interview => new Date(interview.startTime) > new Date())
    ?.sort((a, b) => a.startTime - b.startTime)
    ?.slice(0, 3);

  // Calculate statistics
  const totalInterviews = interviews?.length ?? 0;
  const completedInterviews = interviews?.filter(i => i.endTime)?.length ?? 0;
  const totalCandidates = users?.filter(u => u.role === "candidate")?.length ?? 0;
  const upcomingCount = upcomingInterviews?.length ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="px-[100px] pb-12 flex-1">
        <SignedOut>
          <LandingPage />
        </SignedOut>

        <SignedIn>
            {/* Welcome Section with Time-based Greeting */}
            <div className="h-[150px] border border-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] mt-[30px] p-6 rounded-lg bg-gradient-to-r from-background to-secondary/20">
              <h2 className="font-bold text-4xl mb-2">
                {new Date().getHours() < 12
                  ? "Good Morning"
                  : new Date().getHours() < 18
                  ? "Good Afternoon"
                  : "Good Evening"}, {user?.firstName}!
              </h2>
              <p className="text-xl text-muted-foreground">
                Manage your interviews and review candidates effectively
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalInterviews}</div>
                  <p className="text-xs text-muted-foreground">
                    {completedInterviews} completed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Next {upcomingCount} days
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCandidates}</div>
                  <p className="text-xs text-muted-foreground">
                    In the platform
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalInterviews === 0
                      ? "0%"
                      : `${Math.round((completedInterviews / totalInterviews) * 100)}%`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Completion rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {QUICK_ACTIONS.map((action) => (
                  <ActionCard
                    key={action.title}
                    action = {action}
                    onClick={() => handleQuickAction(action.title)}
                  />
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            {upcomingInterviews && upcomingInterviews.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Upcoming Interviews</h3>
                  </div>
                  <button 
                    onClick={() => router.push('/schedule')}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {upcomingInterviews.map((interview) => (
                    <MeetingCard key={interview._id} interview={interview} />
                  ))}
                </div>
              </div>
            )}

            <MeetingModal 
              isOpen={showModal}
              onClose={() => setshowModal(false)} 
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />
        </SignedIn>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-[100px] py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">About Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Overview</li>
                <li>Features</li>
                <li>Security</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>Interview Questions</li>
                <li>Best Practices</li>
                <li>API Reference</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Blog</li>
                <li>Showcase</li>
                <li>Roadmap</li>
                <li>Help Center</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <Github className="w-5 h-5" />
                <Linkedin className="w-5 h-5" />
                <Twitter className="w-5 h-5" />
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 pt-8 border-t text-sm text-muted-foreground">
            <p>
              Made by Dagim abate
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}



