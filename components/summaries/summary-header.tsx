import Link from "next/link";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";



function renderTitle(title: string): React.ReactNode[] {
    // A basic regex for emojis (adjust as needed)
    const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
    const emojiMatch = title.match(emojiRegex) || [];
  
    return title.split(emojiRegex).reduce<React.ReactNode[]>((acc, text, index, arr) => {
      // Add the text part
      acc.push(<span key={`text-${index}`}>{text}</span>);
  
      // Add the emoji part, if it's not the last element
      if (index < arr.length - 1) {
        acc.push(
          <span key={`emoji-${index}`} style={{ color: 'initial' }}>
            {emojiMatch[index]}
          </span>
        );
      }
  
      return acc;
    }, []);
  }
  
  

export default function SummaryHeader({ title , createdAt ,readingTime}: { title: string ; createdAt: string ; readingTime: string} ) {
    
    
    return (
        <div className="flex gap-4 mb-4 justify-between">
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 ">
                    <Badge variant="secondary" className="relative px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 transition-all duration-200 shadow-xs hover:shadow-md ">
                      <Sparkles className="h-4 w-4 mr-1.5 text-rose-500 "/>
                      AI Summary
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-rose-400 " />
                        {new Date(createdAt).toLocaleDateString('en-us',{
                            year:'numeric',
                            month:'long',
                            day:'numeric'
                        })}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-rose-400 " />
                        {readingTime} min read
                    </div>
                    
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
                    <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                    {renderTitle(title)} </span></h1>
            </div>

            <div className="self-start">
                <Link href="/dashboard">
                <Button variant={'link'} size="sm"
                className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3 hover:no-underline"
               >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:translate-x-0.5" />
                Back<span className="hidden sm:inline">to Dashboard</span></Button>
               </Link>
            </div>
        </div>
    );
}