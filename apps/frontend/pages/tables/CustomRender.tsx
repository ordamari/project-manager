import Table from '@/components/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useTranslation from '@core/hooks/useTranslation'
import User from '@/types/user.type'

type CustomRenderProps = {
    users: User[]
}

function CustomRender({ users }: CustomRenderProps) {
    const t = useTranslation()
    return (
        <Card className=''>
            <CardHeader>
                <CardTitle>{t('pages.tables.customRender')}</CardTitle>
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
                    renderMap={{
                        email: email => (
                            <a className='text-blue-500 underline' href={`mailto:${email}`}>
                                {email}
                            </a>
                        ),
                        number: number => (
                            <span className={number > 0 ? 'text-green-500' : 'text-red-500'}>{number}$</span>
                        ),
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default CustomRender
