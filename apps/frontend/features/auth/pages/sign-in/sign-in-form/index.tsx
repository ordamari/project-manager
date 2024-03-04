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
import signInSchema, { SignInSchema } from '@/features/auth/schemas/sign-in.schema'
import { useForm } from 'react-hook-form'
import useAuthStore from '@/features/auth/store/auth.store'
import { Input } from '@core/components/ui/input'
import { Button } from '@/@core/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

function SignInForm() {
    const signIn = useAuthStore(state => state.signIn)
    const t = useTranslation()
    const router = useRouter()

    const form = useForm<SignInSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(signInSchema),
    })

    async function onSubmit(signInData: SignInSchema) {
        try {
            await signIn(signInData)
            router.push('/')
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
                <Button type='submit'>{t('auth.sign-in')}</Button>
            </form>
        </Form>
    )
}

export default SignInForm
