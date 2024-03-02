import Table from '@/components/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useTranslation from '@core/hooks/useTranslation'
import User from '@/types/user.type'

type ReorderTableProps = {
    users: User[]
}

function ReorderTable({ users }: ReorderTableProps) {
    const t = useTranslation()
    return (
        <Card className=''>
            <CardHeader>
                <CardTitle>{t('pages.tables.reorderTable')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table
                    data={users}
                    keyMap={{
                        firstName: t('general.firstName'),
                        lastName: t('general.lastName'),
                        number: t('general.number'),
                        email: t('general.email'),
                    }}
                    caption={t('pages.tables.userTableCaption')}
                    sortMap={{
                        firstName: (a, b) => a.localeCompare(b),
                        lastName: (a, b) => a.localeCompare(b),
                        number: (a, b) => a - b,
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default ReorderTable
