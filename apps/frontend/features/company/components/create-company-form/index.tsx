import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@core/components/ui/form'
import { Input } from '@core/components/ui/input'
import useTranslation from '@core/hooks/useTranslation'
import createCompanySchema, { CreateCompanySchema } from '@/features/company/schemas/create-company'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/@core/components/ui/button'
import useCompanyStore from '@/features/company/store/company.store'
import { useRouter } from 'next/navigation'

type CreateCompanyFormProps = {}

function CreateCompanyForm({}: CreateCompanyFormProps) {
    const create = useCompanyStore(state => state.create)
    const t = useTranslation()
    const router = useRouter()
    const form = useForm<CreateCompanySchema>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(createCompanySchema),
    })
    async function onSubmit(signInData: CreateCompanySchema) {
        try {
            await create(signInData)
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
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('company.name')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('company.name')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>{t('company.submit')}</Button>
            </form>
        </Form>
    )
}

export default CreateCompanyForm
