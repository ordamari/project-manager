import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ControllerRenderProps } from 'react-hook-form'
import useTranslation from '@core/hooks/useTranslation'
import { ToastSchema } from '@/schemas/toast.schema'
import { forwardRef } from 'react'
import { TOAST_POSITIONS } from '@/lib/helpers'

type ToastPositionPickerProps = ControllerRenderProps<ToastSchema, 'position'>

function ToastPositionPicker(field: ToastPositionPickerProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const t = useTranslation()

    return (
        <RadioGroup {...field} ref={ref}>
            {TOAST_POSITIONS.map(position => {
                return (
                    <div key={position} className='flex items-center space-x-2'>
                        <RadioGroupItem value={position} id={position} />
                        <Label htmlFor={position}>{t(`toast-position.${position}`)}</Label>
                    </div>
                )
            })}
        </RadioGroup>
    )
}

export default forwardRef(ToastPositionPicker)
