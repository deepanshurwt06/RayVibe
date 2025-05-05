import Link from "next/link";
import { Card } from "../ui/card";
import DeleteSummary from "./delete-summary";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";


const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string;
  createdAt: string;
}) => {

  return <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1"/>
      <div>
      <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">{title}</h3>
      <p className="text-sm text-gray-500">
        {formatDistanceToNow(new Date(createdAt),{
          addSuffix: true
        })}
        </p>
      </div>
      
  </div>;
};

const StatusBadge = ({status} :{status:string}) => {
    return <span className={cn('px-3 py-1 text-xs font-medium rounded-full capitalize', status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')} >{status}</span>
}

export default function SummaryCard({ summary }: { summary: any }) {

    const { title, summary_text, status, created_at, original_file_url, id } = summary;

    
    const parsedSummary = { title, summary: summary_text };


  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteSummary summaryId={summary.id}/>
        </div>
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={original_file_url}
              title={parsedSummary.title || title  || formatFileName(original_file_url)}
              createdAt={created_at}
            />
         
          <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
            {parsedSummary.summary || summary_text}
          </p>
          
          <div className="flex justify-between items-center mt-2 sm:mt-4 ">
            <StatusBadge status={status} />
            <span></span>
          </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
