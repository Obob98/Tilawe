"use client"

import { Input, InputProps } from "@/tremorComponents/Input"
import { Label } from "@/tremorComponents/Label"

export const TextInput = ({ placeholder = '', ...props }: { placeholder?: string, props?: InputProps }) => (
    <Input className="w-full" {...{ placeholder, ...props }} />
)

export const EmailInput = ({ placeholder = "Enter email" }) => (
    <div className="mx-auto max-w-xs space-y-2">
        <Label htmlFor="email">Insert Email</Label>
        <Input placeholder={placeholder} id="email" name="email" type="email" />
    </div>
)