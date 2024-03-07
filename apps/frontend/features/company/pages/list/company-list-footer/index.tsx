import useTranslation from '@/@core/hooks/useTranslation'
import Link from 'next/link'

function CompanyListFooter() {
    const t = useTranslation()
    return (
        <div className='border-t w-full pt-4'>
            <span>
                {t('company.want-create')} <Link href='/company/create'>{t('company.click-here')}</Link>
            </span>
        </div>
    )
}
export default CompanyListFooter
