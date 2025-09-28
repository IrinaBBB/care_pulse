import React, { useEffect } from 'react'
import Image from 'next/image'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { SearchParamProps } from '@/types'
import { getPatient } from '@/lib/actions/patient.actions'

async function NewAppointment({ params: { userId } }: SearchParamProps) {
    const patient = await getPatient(userId)

    console.log(patient)

    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container my-auto'>
                <div className='sub-container max-w-[860px] flex-1 justify-between'>
                    <Image
                        src='/assets/icons/logo-full.svg'
                        width={164}
                        height={38}
                        alt='patient'
                        className='mb-12 h-10 w-auto'
                    />
                    <AppointmentForm type='create' userId={userId} patientId={patient.$id} />
                    <p className='justify-items-end text-dark-600 xl:text-left mt-10 py-12'>
                        © {new Date().getFullYear()} CarePulse
                    </p>
                </div>
            </section>
            <Image src='/assets/images/appointment-img.png' width={1192}
                   height={1025} alt='appointment' className='side-img max-w-[390px] bg-bottom' />
        </div>
    )
}

export default NewAppointment