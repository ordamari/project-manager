import { cn } from '@core/lib/utils'
import { ComponentProps } from 'react'

type LogoProps = ComponentProps<'div'>
function Logo({ className, ...props }: LogoProps) {
    return (
        <div {...props} className={cn('text-center', className)}>
            LOGO
        </div>
    )
}

export default Logo
