import useTranslation from '@/@core/hooks/useTranslation'
import Link from 'next/link'

function HaveAccount() {
    const t = useTranslation()
    return (
        <div className='border-t w-full pt-2'>
            <span>
                {t('auth.have-account')} <Link href='/auth/sign-in'>{t('auth.sign-in')}</Link>
            </span>
        </div>
    )
}

export default HaveAccount
