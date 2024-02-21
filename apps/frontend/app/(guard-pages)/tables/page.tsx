'use client'
import PageHeader from '@/components/page-header'
import useTranslation from '@/hooks/useTranslation'
import { demoUsers } from '@/lib/utils'
import ActionTable from '@/pages/tables/ActionTable'
import BasicTable from '@/pages/tables/BasicTable'
import CustomRender from '@/pages/tables/CustomRender'
import ReorderTable from '@/pages/tables/ReorderTable'

const users = demoUsers(10)

function TablesPage() {
  const t = useTranslation()
  return (
    <>
      <PageHeader title={t('pages.tables.title')} description={t('pages.tables.description')} />
      <BasicTable users={users} />
      <ActionTable users={users} />
      <ReorderTable users={users} />
      <CustomRender users={users} />
    </>
  )
}
export default TablesPage
