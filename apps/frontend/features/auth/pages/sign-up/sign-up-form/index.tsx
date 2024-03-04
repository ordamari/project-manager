import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@core/components/ui/form'
import useTranslation from '@core/hooks/useTranslation'
import signUpSchema, { SignUpSchema } from '@/features/auth/schemas/sign-up.schema'
import { useForm } from 'react-hook-form'
import useAuthStore from '@/features/auth/store/auth.store'
import { Input } from '@core/components/ui/input'
import { Button } from '@/@core/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

function SignUpForm() {
    const signUp = useAuthStore(state => state.signUp)
    const t = useTranslation()
    const router = useRouter()

    const form = useForm<SignUpSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(signUpSchema),
    })

    async function onSubmit(signUpData: SignUpSchema) {
        try {
            await signUp(signUpData)
            router.push('/auth/sign-in')
        } catch (error) {
            form.reset()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('auth.email')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('auth.email')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('auth.password')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('auth.password')} type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>{t('auth.sign-up')}</Button>
            </form>
        </Form>
    )
}

export default SignUpForm
