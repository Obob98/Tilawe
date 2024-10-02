import { ReactNode } from "react";

export function CreateUserCard({ children, title, subTitle }: { children: ReactNode, title: string, subTitle: string }) {
    return (
        <div className="flex gap-0 flex-col bg-white p-4 rounded-lg border border-[#e0e0e0] shadow-sm max-w-[800px]">
            <div className="flex-1 p-8 flex gap-2 items-center justify-between">
                <h2 className="text-xl font-bold text-gray-600">{title}</h2>
                <p className="text-gray-500 text-sm">{subTitle}</p>
            </div>
            {children}
        </div>
    );
}
