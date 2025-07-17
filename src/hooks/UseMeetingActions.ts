import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();

  const createInstantMeeting = async() => {
    if (!client) {
      toast.error("Video service not initialized. Please try again in a moment.");
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      // Create the call first
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Instant Meeting",
          },
        },
      });

      // Only navigate after successful creation
      router.push(`/meetings/${call.id}`);
      toast.success("Meeting Created");
    } catch (error) {
      console.error("Failed to create meeting:", error);
      if (error instanceof Error && error.message.includes("token")) {
        toast.error("Connection not ready. Please try again in a moment.");
      } else {
        toast.error("Failed to create meeting. Please try again.");
      }
    }
  };

  const joinMeeting = (callId: string) => {
    if (!client) {
      toast.error("Video service not initialized. Please try again in a moment.");
      return;
    }

    router.push(`/meetings/${callId}`);
  };

  return { createInstantMeeting, joinMeeting };
};

export default useMeetingActions;