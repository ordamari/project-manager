import { FormEvent, KeyboardEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import createMessageSchema, { CreateMessage } from '../../../schemas/create-message.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/@core/components/ui/form'
import useTranslation from '@/@core/hooks/useTranslation'
import { Textarea } from '@/@core/components/ui/textarea'
import { SendHorizontal } from 'lucide-react'

type MessageFormProps = {
    onSubmit: (message: CreateMessage) => void
}

function MessageForm({ onSubmit }: MessageFormProps) {
    const t = useTranslation()
    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm<CreateMessage>({
        defaultValues: {
            content: '',
        },
        resolver: zodResolver(createMessageSchema),
    })

    const handleSubmit = (values: CreateMessage) => {
        onSubmit(values)
        form.reset()
    }

    const handleKeyDown = (ev: KeyboardEvent<HTMLFormElement>) => {
        if (ev.key === 'Enter' && !ev.shiftKey) {
            ev.preventDefault()
            if (formRef.current) formRef.current.requestSubmit()
        }
    }

    return (
        <Form {...form}>
            <form
                ref={formRef}
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex flex-col gap-2 w-full bg-background border rounded-md p-2'
                onKeyDown={handleKeyDown}
            >
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    className='border-none resize-none'
                                    placeholder={t('message.placeholder')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end '>
                    <button type='submit'>
                        <SendHorizontal />
                    </button>
                </div>
            </form>
        </Form>
    )
}

export default MessageForm
