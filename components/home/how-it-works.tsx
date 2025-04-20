import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";
type step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Our advance AI processes and analyzes your document",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get your summary",
    description: "Receive a clear, concise summary of your document",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute insert-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        >
          <div
            style={{
              clipPath:
                "polygon(50% 0%,61% 35%,98% 35%, 68% 57%, 79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="text-center mb-16">
          <h2 className="font-bold uppercase text-xl mb-4 text-rose-500">
            Wow it Works{" "}
          </h2>
          <h3 className="font-bold text-2xl max-w-2xl mx-auto ">
            {" "}
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative ">
          {steps.map((step, idx) => (
            <div className="relative flex items-stretch">
              <StepItem key={idx} {...step} />

              {idx < steps.length-1 &&
              <div className="hidden md:block top-1/2 -right-4 transform -translate-y-1/2 z-10 absolute">
                <MoveRight size={32} strokeWidth={1.5} className="text-rose-400/80" />
              </div>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: step) {
  return (
    <div className=" relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full ">
      <div className="flex flex-col gap-3 h-full ">
        <div className="flex items-center justify-center h-24 w-24  mx-auto rounded-xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>

        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center  font-bold text-xl">{label}</h4>
          <p className="text-center text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
