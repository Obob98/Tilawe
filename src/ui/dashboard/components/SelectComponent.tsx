'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/tremorComponents/Select"
import { useEffect } from "react";

const initialValue = ''

export function SelectComponent(
    {
        data,
        defaultValue = '',
        placeholder = 'Select',
        ...props
    }:
        {
            data: {
                value: string;
                label: string;
            }[],
            defaultValue?: string,
            placeholder?: string,
            props?: any,
        }) {


    return (
        <>
            <Select defaultValue={defaultValue} {...{ ...props }}>
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