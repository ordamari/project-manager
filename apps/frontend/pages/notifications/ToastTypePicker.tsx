import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ControllerRenderProps } from 'react-hook-form'
import useTranslation from '@core/hooks/useTranslation'
import { TOAST_TYPES } from '@/lib/helpers'
import { ToastSchema } from '@/schemas/toast.schema'
import { forwardRef } from 'react'

type ToastTypePickerProps = ControllerRenderProps<ToastSchema, 'type'>

function ToastTypePicker(field: ToastTypePickerProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const t = useTranslation()

    return (
        <RadioGroup
            // {...field}
            onChange={e => {
                console.log((e.target as HTMLInputElement).value)
            }}
            ref={ref}
        >
            {TOAST_TYPES.map(type => {
                return (
                    <div key={type} className='flex items-center space-x-2'>
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type}>{t(`toast-type.${type}`)}</Label>
                    </div>
                )
            })}
        </RadioGroup>
    )
}

export default forwardRef(ToastTypePicker)
