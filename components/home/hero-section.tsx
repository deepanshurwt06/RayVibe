// import { Button } from "@/components/ui/button";
// import { ArrowRight, Sparkles } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-12 lg:py-16 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      
//         <div
//           className="relative p-[1px] overflow-hidden rounded-full 
//             bg-linear-to-r from-rose-200 via-rose-500 to-rose-700 
//             animate-gradient-x group"
//         >
//           <Badge
//             variant={"secondary"}
//             className="relative px-6 py-2 text-base font-medium rounded-full 
//           bg-white group-hover:bg-gradient-to-r 
//           group-hover:from-rose-100 group-hover:to-rose-300 
//           transition-all duration-500 ease-in-out"
//           >
//             <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
//             <p className="text-base text-rose-600">Powered by AI</p>
//           </Badge>
//         </div>
      

     

//       <h1 className="font-bold text-center py-6">
//         <span className="relative inline-block">
//           Transform PDFs into{" "}
//           <span className="relative inline-block">
//             <span className="relative z-10 px-[2px]">concise</span>
//             <span className="absolute inset-0 bg-rose-200/70 -rotate-5  -z-0 "
//             aria-hidden="true" ></span>
//           </span>{" "}
//           summaries
//         </span>
//       </h1>

//       <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600 ">
//         Get a beautiful summary reel of the document in seconds
//       </h2>

//       <Link href="/#pricing">
//         <div className="flex gap-3 mt-6 lg:mt-9  rounded-full px-10 sm:px-10 lg:px-14 py-3 lg:py-4 bg-linear-to-r from-slate-900 to-rose-600 hover:bg-linear-to-r hover:from-rose-600 hover:to-slate-900">
//           <span className="text-white text-base sm:text-lg lg:text-xl font-semibold lg:bold">
//             Try Ray Vibe
//           </span>
//           <ArrowRight className="font-semibold text-white lg:text-bold animate-pulse" />
//         </div>
//       </Link>
//     </section>
//   );
// }





'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HeroSection() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/upload");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-12 lg:py-16 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-700 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium rounded-full 
            bg-white group-hover:bg-gradient-to-r 
            group-hover:from-rose-100 group-hover:to-rose-300 
            transition-all duration-500 ease-in-out"
        >
          <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </div>

      <h1 className="font-bold text-center py-6">
        <span className="relative inline-block">
          Transform PDFs into{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-[2px]">concise</span>
            <span
              className="absolute inset-0 bg-rose-200/70 -rotate-5  -z-0"
              aria-hidden="true"
            ></span>
          </span>{" "}
          summaries
        </span>
      </h1>

      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600 ">
        Get a beautiful summary reel of the document in seconds
      </h2>

      <button
        onClick={handleClick}
        className="flex gap-3 mt-6 lg:mt-9 rounded-full px-10 sm:px-10 lg:px-14 py-3 lg:py-4 bg-gradient-to-r from-slate-900 to-rose-600 hover:from-rose-600 hover:to-slate-900"
      >
        <span className="text-white text-base sm:text-lg lg:text-xl font-semibold">
          Try Ray Vibe
        </span>
        <ArrowRight className="font-semibold text-white animate-pulse" />
      </button>
    </section>
  );
}
