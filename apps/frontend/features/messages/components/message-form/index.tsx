import { useState } from 'react'
import { useForm } from 'react-hook-form'
import createMessageSchema, { CreateMessage } from '../../schemas/create-message.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/@core/components/ui/form'
import useTranslation from '@/@core/hooks/useTranslation'
import { Input } from '@/@core/components/ui/input'
import { Textarea } from '@/@core/components/ui/textarea'
import { Button } from '@/@core/components/ui/button'

type MessageFormProps = {
    onSubmit: (message: CreateMessage) => void
}

function MessageForm({ onSubmit }: MessageFormProps) {
    const t = useTranslation()
    const form = useForm<CreateMessage>({
        defaultValues: {
            content: '',
        },
        resolver: zodResolver(createMessageSchema),
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder={t('message.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>{t('message.submit')}</Button>
            </form>
        </Form>
    )
}

export default MessageForm
