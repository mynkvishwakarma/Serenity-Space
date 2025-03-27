
import Link from '../../node_modules/next/link'
import { Spotlight } from './ui/Spotlight'
import { Button } from "./ui/moving-border";



function HeadingSection() {
  
  return (
    <div className='h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 '>
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
        <div className='p-4 relative z-10 w-full text-center mt-28'>
            <h1 className=' mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text  bg-gradient-to-b from-natual-50 to-natual-400'
            >Welcome Serenity Space </h1>
            <p className='mt-5'>Hello,This is site for mental health </p>
            <div className="mt-5">
               
                  <Button borderRadius="1.75rem" 
                        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800" 
                        >
                       <Link href={"/HealthBlog"}>Explore Blogs</Link>
                  </Button>
             
            </div>
            
        </div>
        
    </div>
  )
}

export default HeadingSection