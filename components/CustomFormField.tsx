// noinspection TypeScriptValidateTypes

import Image from 'next/image'
import { useId } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control } from 'react-hook-form'
import { FormFieldType } from '@/components/forms/PatientForm'
import { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js'
import DatePicker from 'react-datepicker'

import 'react-phone-number-input/style.css'
import 'react-datepicker/dist/react-datepicker.css'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { uuid4 } from 'zod/v4/core/regexes'


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: ReactNode,
    renderSkeleton?: (field: any) => ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, label, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image src={iconSrc} alt={iconAlt || 'icon'} height={24} width={24} className='ml-2' />
                    )}
                    <FormControl>
                        <Input placeholder={placeholder} {...field} className='shad-input border-0' />
                    </FormControl>
                </div>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea placeholder={placeholder} {...field} className='shad-textArea'
                              disabled={props.disabled} />
                </FormControl>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='US'
                        placeholder={props.placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <Image src='/assets/icons/calendar.svg' alt='calendar' height={24} width={24} className='ml-2' />
                    <FormControl>
                        <DatePicker selected={field.value} showTimeSelect={showTimeSelect ?? false}
                                    dateFormat={dateFormat ?? 'MM/dd/yyyy'} onChange={(date) => field.onChange(date)}
                                    timeInputLabel='Time:' wrapperClassName='date-picker' />
                    </FormControl>
                </div>
            )
        case FormFieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field) : null
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='shad-select-trigger'>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.SWITCH:
            const switchId = useId()
            return (
                <div className='flex items-center'>
                    <FormControl>
                        <Switch
                            id={switchId}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormLabel className='cursor-pointer ms-2' htmlFor={switchId}>{label}</FormLabel>
                </div>

            )

    }
}

function CustomFormField(props: CustomProps) {
    const { control, fieldType, name, label } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX &&
                        fieldType !== FormFieldType.SWITCH &&
                        label && (
                            <FormLabel>{label}</FormLabel>
                        )}
                    <RenderField field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField