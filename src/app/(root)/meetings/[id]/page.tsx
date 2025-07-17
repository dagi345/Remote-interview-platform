"use client";

import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetcallById from "@/hooks/useGetcallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

function MeetingPage() {
  const params = useParams();
  const id = params.id as string;
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetcallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  console.log('Meeting Page Debug:', {
    isLoaded,
    isCallLoading,
    hasCall: !!call,
    userId: user?.id,
    meetingId: id,
  });

  // Show loading state while user or call is loading
  if (!isLoaded || isCallLoading) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <LoaderUI />
        <p className="text-muted-foreground">Loading meeting...</p>
      </div>
    );
  }

  // Show error state if no call is found
  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-2xl font-semibold text-destructive">Meeting not found</p>
        <p className="text-muted-foreground">The meeting may have ended or the link is invalid</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}

export default MeetingPage;