'use client'

import PageHeader from '@/components/page-header'
import useTranslation from '@/hooks/useTranslation'
import ModalCard from '@/pages/notifications/ModalCard'
import ToastCard from '@/pages/notifications/ToastCard'

function NotificationPage() {
  const t = useTranslation()
  return (
    <>
      <PageHeader title={t('pages.notifications.title')} description={t('pages.notifications.description')} />
      <ModalCard />
      <ToastCard />
    </>
  )
}

export default NotificationPage
