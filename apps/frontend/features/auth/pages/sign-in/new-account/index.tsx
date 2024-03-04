import useTranslation from '@/@core/hooks/useTranslation'
import Link from 'next/link'

function NewAccount() {
    const t = useTranslation()
    return (
        <div className='border-t w-full pt-2'>
            <span>
                {t('auth.dont-have-account')} <Link href='/auth/sign-up'>{t('auth.sign-up')}</Link>
            </span>
        </div>
    )
}

export default NewAccount
