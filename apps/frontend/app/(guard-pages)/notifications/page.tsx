'use client'

import PageHeader from '@core/components/page-header'
import useTranslation from '@core/hooks/useTranslation'

function NotificationPage() {
    const t = useTranslation()
    return (
        <>
            <PageHeader title={t('pages.notifications.title')} description={t('pages.notifications.description')} />
        </>
    )
}

export default NotificationPage
