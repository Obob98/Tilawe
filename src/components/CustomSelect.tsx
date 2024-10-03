import { Caret } from "@/assets/SVGComponents";
import { ReactNode } from "react";

export default function CustomSelect({ id, name, children }: { id: string, name: string, children: ReactNode }) {
    return (
        <div className="relative">
            <select
                id={id}
                name={name}
                className="peer outline-2 placeholder:text-gray-500 block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                defaultValue=""
                aria-describedby="reports_to-error"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex  flex-col items-center justify-center  ">
                {/* <Caret {...{ styles: '-rotate-90', color: '#888', strokeWidth: 2, width: '0.8em' }} /> */}
                <Caret {...{ styles: 'rotate-90', color: '#888', strokeWidth: 2, width: "0.8em" }} />
            </div>
        </div>
    )
}
