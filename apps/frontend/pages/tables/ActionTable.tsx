import Table from '@/components/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useTranslation from '@/hooks/useTranslation'
import User from '@/types/user.type'

type ActionTableProps = {
  users: User[]
}

function ActionTable({ users }: ActionTableProps) {
  const t = useTranslation()

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{t('pages.tables.actionTable')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table
          data={users}
          keyMap={{
            firstName: t('general.firstName'),
            lastName: t('general.lastName'),
            email: t('general.email')
          }}
          actions={[
            {
              onClick: (user: User) => {},
              icon: 'edit'
            },
            {
              onClick: (user: User) => {},
              icon: 'close'
            }
          ]}
          caption={t('pages.tables.userTableCaption')}
        />
      </CardContent>
    </Card>
  )
}

export default ActionTable
