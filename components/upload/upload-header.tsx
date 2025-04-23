import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UploadHeader() {
    return (
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-700 animate-gradient-x group">
            <Badge
              variant={"secondary"}
              className="relative px-6 py-2 text-base font-medium rounded-full bg-white group-hover:bg-gradient-to-r 
          group-hover:from-rose-100 group-hover:to-rose-300 
          transition-all duration-500 ease-in-out"
            >
              <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
              <span>AI-Powred Content Create</span>
            </Badge>
          </div>
          <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
            <span className="relative inline-block">
              Start Uploading{" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-[2px]">Your PDF's</span>
                <span
                  className="absolute inset-0 bg-rose-200/70 -rotate-5  -z-0 "
                  aria-hidden="true"
                ></span>
              </span>
            </span>
          </div>
          <div className="mt-2 text-md sm:text-lg text-semibold leading-1 text-gray-600 max-w-2xl text-center">
            <p>
              Upload Your PDF and let AI do the magic ✨
            </p> 
          </div>
        </div>
    )
}