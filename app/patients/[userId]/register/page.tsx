import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import { SearchParamProps } from '@/types'

async function Register({ params: { userId } }: SearchParamProps) {
    const user = await getUser(userId)


    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container'>
                <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
                    <Image
                        src='/assets/icons/logo-full.svg'
                        width={164}
                        height={38}
                        alt='patient'
                        className='mb-12 h-10 w-auto'
                    />
                    <RegisterForm user={user} />
                    <p className='copyright py-12'>
                        © {new Date().getFullYear()} CarePulse
                    </p>
                </div>
            </section>
            <Image src='/assets/images/register-img.png' width={1192}
                   height={1025} alt='patient' className='side-img max-w-[390px]' />
        </div>
    )
}

export default Register