'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"

export function SelectComponent(
    {
        data,
        defaultValue = '',
        placeholder = 'Select'
    }:
        {
            data: {
                value: string;
                label: string;
            }[],
            defaultValue?: string,
            placeholder?: string
        }) {


    return (
        <>
            <Select defaultValue={defaultValue}>
                <SelectTrigger className="mx-auto">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {data.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}