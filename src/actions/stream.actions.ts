"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export const streamTokenProvider = async () => {
  try {
    const user = await currentUser();
    console.log('Stream Token Provider: Current user:', user?.id);

    if (!user) {
      console.log('Stream Token Provider: No user found');
      throw new Error("User not authenticated");
    }

    const streamClient = new StreamClient(
      process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      process.env.STREAM_SECRET_KEY!
    );

    const token = streamClient.generateUserToken({ user_id: user.id });
    console.log('Stream Token Provider: Token generated successfully');

    return token;
  } catch (error) {
    console.error('Stream Token Provider Error:', error);
    throw error;
  }
};