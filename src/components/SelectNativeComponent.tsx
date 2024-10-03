import { Label } from "@/components/Label"
import { SelectNative } from "@/components/SelectNative";
import { ReactNode } from "react";

export const SelectNativeComponent = ({ children }: { children?: ReactNode }) => (
    <>
        <div className="w-full">
            <Label htmlFor="age1">Select age</Label>
            <SelectNative id="age1" className="mt-2">
                <option value="0-18">18 and under</option>
                <option value="19-39">19 to 39</option>
                <option value="40-64">40 to 64</option>
                <option value="65-infinity">65 and over</option>
            </SelectNative>
        </div>
    </>
);