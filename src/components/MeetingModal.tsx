import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import useMeetingActions from "../hooks/UseMeetingActions"
import { DialogTitle } from '@radix-ui/react-dialog';

interface MeetingModalProps {
    isOpen : boolean
    onClose : ()=> void;
    title : string
    isJoinMeeting: boolean
}

function MeetingModal({isOpen , onClose , title , isJoinMeeting}:MeetingModalProps) {
    const [meetingURL, setmeetingURL] = useState("");

    const { createInstantMeeting , joinMeeting}= useMeetingActions()
   

    const handleStart = () => {
        if(isJoinMeeting){
            const meetingId= meetingURL.split("/").pop();
            if(meetingId) joinMeeting(meetingId)
        }else{
            createInstantMeeting();

        }
        setmeetingURL("");
        onClose();
    }


  return (
    <Dialog open={isOpen} onOpenChange = {onClose}>
        <DialogContent className='sm:mx-w-[425px]'>
            <DialogTitle />
            <DialogHeader>
                <h2 className='text-2xl font-bold'>{title}</h2>
            </DialogHeader>

            <div className="space-y-4 pt-4">
                {isJoinMeeting && (
                    <Input placeholder="paste meeting link here"
                    value={meetingURL}
                    onChange={(e)=>setmeetingURL(e.target.value)}
                    />
                )}
            </div>

            <div className="flex justify-end gap-3">
                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button onClick={handleStart} disabled= {isJoinMeeting && !meetingURL.trim()}>
                    {isJoinMeeting ? "Join Meeting":"Start Meeting"} 
                </Button>
            </div>


        </DialogContent>
            
    </Dialog>
  )
}

export default MeetingModal