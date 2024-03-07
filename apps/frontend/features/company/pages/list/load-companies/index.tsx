import { Skeleton } from '@/@core/components/ui/skeleton'
const LOAD_COMPANIES_SKELETON_ACCOUNT = 3
function LoadCompanies() {
    return (
        <div className='w-full flex flex-col gap-4'>
            {Array.from({ length: LOAD_COMPANIES_SKELETON_ACCOUNT }).map((_, index) => (
                <div key={index} className='flex items-center space-x-4 w-full'>
                    <Skeleton className='h-12 w-12 rounded-full ' />
                    <div className='space-y-2 grow'>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-full' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LoadCompanies
