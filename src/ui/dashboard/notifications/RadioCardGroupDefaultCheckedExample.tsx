import {
    RadioCardGroup,
    RadioCardIndicator,
    RadioCardItem,
} from "@/tremorComponents/RadioCardGroup"

export const RadioCardGroupDefaultCheckedExample = () => (
    <form className=" max-w-sm">
        <fieldset className="space-y-3">
            <RadioCardGroup defaultValue="1" className="text-sm flex gap-4 items-center justify-start">
                <RadioCardItem value="1" className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>All</span>
                </RadioCardItem>
                <RadioCardItem value="2" className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Account</span>
                </RadioCardItem>
                <RadioCardItem value="3" className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Security</span>
                </RadioCardItem>
            </RadioCardGroup>
        </fieldset>
    </form>
)