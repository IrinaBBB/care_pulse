import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import { SearchParamProps } from '@/types'

async function Register({ params: { userId } }: SearchParamProps) {
    const user = await getUser(userId)


    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container my-auto'>
                <div className='sub-container max-w-[496px]'>
                    <Image
                        src='/assets/icons/logo-full.svg'
                        width={164}
                        height={38}
                        alt='patient'
                        className='mb-12 h-10 w-auto'
                    />
                    <RegisterForm user={user} />

                    <div className='text-14-regular mt-20 flex justify-between'>

                        <p className='justify-items-end text-dark-600 xl:text-left'>
                            © {new Date().getFullYear()} CarePulse
                        </p>
                        <Link href='/?admin=true' className='text-green-500'>
                            Admin
                        </Link>
                    </div>
                </div>
            </section>
            <Image src='/assets/images/register-img.png' width={1192}
                   height={1025} alt='patient' className='side-img max-w-[390px]' />
        </div>
    )
}

export default Register