import Table from '@/components/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useTranslation from '@/hooks/useTranslation'
import User from '@/types/user.type'

type BasicTableProps = {
  users: User[]
}

function BasicTable({ users }: BasicTableProps) {
  const t = useTranslation()
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{t('pages.tables.basicTable')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table
          data={users}
          keyMap={{
            firstName: t('general.firstName'),
            lastName: t('general.lastName'),
            email: t('general.email')
          }}
          caption={t('pages.tables.userTableCaption')}
        />
      </CardContent>
    </Card>
  )
}

export default BasicTable
