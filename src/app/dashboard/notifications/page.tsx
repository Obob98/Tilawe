

import useServerSession from "@/customHooks/useServerSession"
import { fetchNotifications } from "@/lib/dbdirect"
import { Badge } from "@/tremorComponents/Barge"
import { Card } from "@/tremorComponents/Card"
import { User } from "@/types"
import { Button } from "@/tremorComponents/Button"
import { RadioCardGroupDefaultCheckedExample } from "@/ui/dashboard/notifications/RadioCardGroupDefaultCheckedExample"

export default async function NotificationsCenter() {
    const { session } = await useServerSession()

    const { _id } = session?.user as User


    const notifications = await fetchNotifications(_id)

    return (
        <main className="w-full p-4">
            <div className="flex items-center gap-4 text-sm mb-8">
                <RadioCardGroupDefaultCheckedExample />
            </div>
            {
                notifications.map(notification => (
                    <Card className="max-w-[800px] flex items-center justify-between gap-8  text-sm p-2" key={notification._id}>
                        <div className="flex items-center gap-2 truncate">
                            <Badge className="ring-none  rounded-full bg-[#323232] text-white ">
                                {notification.type}
                            </Badge>
                            <span className="truncate text-[#323232]">
                                {notification.message}
                            </span>
                        </div>
                        <Button className="font-semibold text-[#fff] ">
                            change
                        </Button>
                    </Card>
                ))
            }
            {
                !notifications.length &&
                <p>you have no new notifications at the moment</p>
            }
        </main>
    )
}



