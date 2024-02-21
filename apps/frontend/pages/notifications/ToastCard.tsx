import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useTranslation from '@/hooks/useTranslation'
import toastSchema, { ToastSchema } from '@/schemas/toast.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import { Input } from '@/components/ui/input'
import ToastTypePicker from './ToastTypePicker'
import ToastPositionPicker from './ToastPositionPicker'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

function ToastCard() {
  const t = useTranslation()

  const form = useForm<ToastSchema>({
    resolver: zodResolver(toastSchema),
    defaultValues: {
      message: '',
      type: 'default',
      description: '',
      expand: false,
      richColor: false,
      position: 'bottom-right'
    }
  })

  function onSubmit(data: ToastSchema) {
    switch (data.type) {
      case 'default':
        toast(data.message, {
          description: data.description
        })
        break
      case 'error':
      case 'info':
      case 'success':
      case 'warning':
        toast[data.type](data.message, {
          description: data.description
        })
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('pages.notifications.toast.title')}</CardTitle>
          <CardDescription>{t('pages.notifications.toast.description')}</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{t('pages.notifications.toast.messagePlaceholder')}</FormLabel>
                    <FormControl>
                      <Input placeholder='pages.notifications.toast.messagePlaceholder' {...field} />
                    </FormControl>
                    <FormDescription>{t('pages.notifications.toast.messageDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{t('pages.notifications.toast.descriptionPlaceholder')}</FormLabel>
                    <FormControl>
                      <Input placeholder='pages.notifications.toast.descriptionPlaceholder' {...field} />
                    </FormControl>
                    <FormDescription>{t('pages.notifications.toast.descriptionDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{t('pages.notifications.toast.type')}</FormLabel>
                    <FormControl>
                      <ToastTypePicker {...field} />
                    </FormControl>
                    <FormDescription>{t('pages.notifications.toast.typeDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='position'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{t('pages.notifications.toast.position')}</FormLabel>
                    <FormControl>
                      <ToastPositionPicker {...field} />
                    </FormControl>
                    <FormDescription>{t('pages.notifications.toast.positionDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='expand'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex items-center space-x-2'>
                        <Switch id='expend' />
                        <Label htmlFor='expend'>{t('pages.notifications.toast.expend')}</Label>
                      </div>
                    </FormControl>
                    <FormDescription>{t('pages.notifications.toast.expendDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='richColor'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex items-center space-x-2'>
                        <Switch id='expend' />
                        <Label htmlFor='expend'>{t('pages.notifications.toast.richColor')}</Label>
                      </div>
                    </FormControl>
                    <FormDescription>{t('pages.notifications.toast.richColorDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster expand={form.watch('expand')} richColors={form.watch('richColor')} position={form.watch('position')} />
    </>
  )
}

export default ToastCard
