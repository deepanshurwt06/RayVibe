"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { toast } from 'sonner';
import { deleteSummaryAction } from "@/actions/summary-action";

interface DeleteButtonProps{
    summaryId: string;
}


export default function DeleteSummary({ summaryId }: DeleteButtonProps) {
    
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    
    const handleDelete = async () =>{
        startTransition(async () => {

       
        // delete summary
        // await delete summary
        const result = await deleteSummaryAction({summaryId});
        if(!result.success) {
            toast.error('Failed to delete Summary 😢');
         }
        setOpen(false);
    });
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="text-gray-400 bg-gray-100 border border-gray-200 hover:text-rose-600 hover:bg-rose-100"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
           Are you sure you want to delete this summary. This action cannot be undone 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button
          variant="ghost"
          className=" bg-gray-100 border border-gray-200 hover:text-gray-700 hover:bg-gray-200"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button> 
        <Button
          variant="destructive"
          className="bg-gray-900   hover:bg-gray-600 "
          onClick={handleDelete}
        >
          { isPending ? "Deleting..." :"Delete"}
        </Button>

       
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
