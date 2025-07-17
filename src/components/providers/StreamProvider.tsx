"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI"
import { streamTokenProvider } from "@/actions/stream.actions"; 
import toast from "react-hot-toast";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    let mounted = true;
    let client: StreamVideoClient | undefined;

    const initClient = async () => {
      if (!isLoaded || !user) {
        console.log('StreamProvider: Waiting for user to load...', { isLoaded, hasUser: !!user });
        return;
      }

      try {
        console.log('StreamProvider: Getting token for user:', user.id);
        // Get token first
        const token = await streamTokenProvider();
        console.log('StreamProvider: Token received successfully');
        
        // Only proceed if still mounted
        if (!mounted) {
          console.log('StreamProvider: Component unmounted, aborting initialization');
          return;
        }

        // Initialize client with token
        console.log('StreamProvider: Initializing client with token');
        client = new StreamVideoClient({
          apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          user: {
            id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.id,
            image: user.imageUrl,
          },
          token,
        });

        // Set the client only after successful initialization
        if (mounted) {
          console.log('StreamProvider: Client initialized successfully');
          setStreamVideoClient(client);
        }
      } catch (error) {
        console.error('StreamProvider Error:', error);
        if (mounted) {
          toast.error('Failed to connect to video service');
        }
      }
    };

    initClient();

    return () => {
      mounted = false;
      // Only disconnect if we're actually unmounting the provider
      if (client && !document.hidden) {
        console.log('StreamProvider: Cleaning up client');
        client.disconnectUser().catch(console.error);
      }
    };
  }, [user, isLoaded]);

  // If user is not loaded yet, render children without Stream context
  if (!isLoaded) {
    return <>{children}</>;
  }

  // If no user is signed in, render children without Stream context
  if (!user) {
    return <>{children}</>;
  }

  // Only show loading when we're initializing the client for a signed-in user
  if (!streamVideoClient) {
    return <LoaderUI />;
  }

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;