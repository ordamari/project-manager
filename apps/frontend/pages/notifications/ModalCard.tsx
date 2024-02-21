import Modal from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useToggle from '@/hooks/useToggle'
import useTranslation from '@/hooks/useTranslation'

function ModalCard() {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false)
  const t = useTranslation()

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{t('pages.notifications.modal')}</CardTitle>
        <CardDescription>{t('pages.notifications.modalDescription')}</CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        <Button onClick={toggleIsModalOpen}>{t('general.open')}</Button>
        <Modal
          isOpen={isModalOpen}
          title={t('pages.notifications.title')}
          description={t('pages.notifications.description')}
          toggleIsOpen={toggleIsModalOpen}
          buttons={[
            {
              children: t('general.close'),
              onClick: toggleIsModalOpen
            }
          ]}
        >
          {t('pages.notifications.content')}
        </Modal>
      </CardContent>
    </Card>
  )
}

export default ModalCard
