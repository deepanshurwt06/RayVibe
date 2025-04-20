import { cn } from '@/lib/utils';
import { ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';

type PriceType = {
    name:string,
    price:number,
    description:string,
    items:string[],
    id:string,
    paymentLink:string,
    priceId:string,
}

const plans = [
    {
        name: 'Free',
        price:0,
        description :'For Testing and limited use',
        items:[
           '5 pdf summaries per month', 
           'Markdown Export',
           'Email support'
        ],
        id:'free',
        paymentLink :'',
        priceId :'',
    },
    {
        name: 'Basic',
        price:15,
        description :'For Individuals and small teams',
        items:[
           'Unlimited PDF summaries',
           'Priority processing',
           '24/7 priority support',
           'Markdown Export'
        ],
        id:'basic',
        paymentLink :'',
        priceId :'',
    },
    {
     name: 'Pro',
     price:25,
     description :'For Professionals and teams',
     items:[
        'Unlimited PDF summaries',
        'Custom summaries',
        'Priority processing',
        '24/7 priority support',
        'Markdown Export'
     ],
     id:'pro',
     paymentLink :'',
     priceId :'',
    }
];

const PricingCard = ({name,price ,description,items,id,paymentLink}:PriceType) => {
    return <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-400">
        <div className={cn( 'relative flex flex-col h-full gap-4 lg:gap-6 z-10 p-8  border-[1px] border-gray-500/20 rounded-2xl', id === 'pro' && 'border-rose-500 gap-5 border-2')}>
        <div className="flex justify-between items-center flex-col">
            <p className='text-lg lg:text-xl font-bold capitalize'>{name}</p>
            <p className='text-base-content/80 mt-2'>{description}</p>
        </div>
        <div className='flex gap-2 '>
            <p className='text-4xl tracking-tight font-extrabold'>$ {price}</p>
            <div className='flex flex-col justify-end mb-[4px]'>
                <p className='text-xs uppercase font-semibold '>USD</p>
                <p className='text-xs'>/ month</p>
            </div>
        </div>
        <div className='space-y-2.5 leading-relaxed text-base flex-1 '>
            {items.map((item, idx) => (
                <li key={idx} className='flex items-center gap-2 '>
                    <CheckIcon size={18} />
                   <span>{item}</span>  </li>
             ) )}
        </div>

        <div className=" space-y-2 flex justify-center w-full">
            <Link href={paymentLink}
             className={cn( 'w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2',
                id === 'pro' ? 'border-rose-900': 'border-rose-100 from-rose-400 to-rose-500' 
            
             )}
            >

            Buy Now 
            <ArrowRight size={17} />
            </Link>
        </div>
        </div>
    </div>
}

export default function PricingSection() {
  return (
    <section className='relative overflow-hidden' id='pricing'>
      <div className="py:12 lg:py-24 max-w-5xl mx-auto px-4 lg:px-8 lg:pt-12">
       
      <div
          aria-hidden="true"
          className="pointer-events-none absolute insert-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        >
        <div
            style={{
              clipPath:
                "polygon(74% 44%, 100% 61%, 97% 25%, 0% 84%, 0 100%, 0 0, 20% 40%, 75% 44%, 58% 20%, 0 0, 20% 40%, 75% 44%,58% 20%, 75% 44%, 58% 20%, 0 0, 20% 40%, 75% 44%,58% 20%)",
                
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="flex items-center justify-center w-full pb-12">
          <h2 className='uppercase font-bold text-xl mb-8 text-rose-500'>Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
