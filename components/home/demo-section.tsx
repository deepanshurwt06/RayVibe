import { Pizza } from "lucide-react";

export function DemoSection() {
  return (
    <section className="relative">
      <div className="py-8  max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute insert-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        >
        <div
            style={{
              clipPath:
                "polygon(74% 44%, 100% 61%, 97% 25%, 85% 0,80% 2% , 72% 32%, 60% 62%,52% 68%, 47% 74%, 30% 84%, 0 100%, 0 0, 20% 40%, 75% 44%,58% 20%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center text-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/40 mb-2">
            <Pizza className="w-6 h-6 text-rose-500" />
            </div>
           <div className="text-center ">
            <h3 className="font-bold text-xl max-w-2xl mx-auto px:4 sm:px-6 "> Watch how Ray Vibe transform {" "}
                <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">this Next.js course PDF</span> into an easy to
            read Summary</h3>
            </div>

            <div className="flex items-center justify-center px-2 sm:px-4 lg:px-6">
                {/* summery section */}
            </div>

        </div>
      </div>
    </section>
  );
}
