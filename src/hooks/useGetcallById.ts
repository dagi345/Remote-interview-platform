import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useGetcallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    let mounted = true;

    const getCall = async () => {
      if (!client) {
        console.log('useGetcallById: No client available, waiting...');
        return;
      }

      try {
        console.log('useGetcallById: Fetching call with id:', id);
        const call = client.call('default', id as string);
        
        const result = await call.get();
        console.log('useGetcallById: Call fetched successfully:', result);
        
        if (mounted) {
          setCall(call);
          setIsCallLoading(false);
        }
      } catch (error) {
        console.error('useGetcallById Error:', error);
        if (mounted) {
          setIsCallLoading(false);
          if (error instanceof Error && error.message.includes('not found')) {
            toast.error('Meeting not found or has ended');
          } else {
            toast.error('Failed to load meeting');
          }
        }
      }
    };

    getCall();

    // Retry if client is not available
    const retryInterval = setInterval(() => {
      if (!client) {
        console.log('useGetcallById: Retrying to get client...');
        getCall();
      }
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(retryInterval);
    };
  }, [client, id]);

  return { call, isCallLoading };
};

export default useGetcallById;