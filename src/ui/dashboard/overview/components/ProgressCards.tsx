import { Card } from '@/tremorComponents/Card';
import { ProgressCircle } from '@/tremorComponents/ProgressCircle';

type variantType = "success" | "default" | "warning" | "error" | "neutral" | undefined

export const ProgressCards = ({ data }: { data: { cardTitle: string, percentValue?: number, numalator?: string | number, denominator?: string | number, invert?: boolean, fair?: boolean }[], }) => {


    return (
        <>
            {
                data.map(({ cardTitle, percentValue, numalator, denominator, invert, fair }, index) => {
                    let variant: variantType
                    if (percentValue) {
                        if (invert) {
                            variant = percentValue <= 25 ? "success" : percentValue <= 50 ? "default" : percentValue <= 75 ? "warning" : "error"
                        }
                        else if (fair) {
                            variant = percentValue <= 10 ? "error" : percentValue <= 30 ? "warning" : percentValue <= 50 ? "default" : "success"
                        }
                        else {
                            variant = percentValue <= 25 ? "error" : percentValue <= 50 ? "warning" : percentValue <= 75 ? "default" : "success"
                        }
                    }

                    return <Card key={cardTitle + index}>
                        <div className="flex items-center justify-center gap-x-5">
                            {
                                (percentValue && variant) &&
                                <ProgressCircle
                                    value={percentValue}
                                    variant={variant}>
                                    <span className="text-sm font-medium text-gray-900 ">
                                        {percentValue}%
                                    </span>
                                </ProgressCircle>
                            }
                            <div>
                                {
                                    (numalator && denominator) &&
                                    <p className="text-sm font-medium text-gray-900 ">
                                        {numalator}/{denominator}
                                    </p>
                                }
                                <p className="text-sm text-gray-500 ">
                                    {cardTitle}
                                </p>
                                {
                                    (!numalator || !denominator) &&
                                    <p className="text-sm font-medium text-gray-900 ">
                                        {numalator ?? denominator}
                                    </p>
                                }
                            </div>
                        </div>
                    </Card>
                })
            }
            {/* <Card>
                <div className="flex items-center justify-center gap-x-5">
                    <ProgressCircle value={33} variant='warning'>
                        <span className="text-sm font-medium text-gray-900 ">
                            33%
                        </span>
                    </ProgressCircle>
                    <div>
                        <p className="text-sm font-medium text-gray-900 ">
                            $340/$450
                        </p>
                        <p className="text-sm text-gray-500 ">
                            Spend management control
                        </p>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex items-center justify-center gap-x-5">
                    <ProgressCircle value={57}>
                        <span className="text-sm font-medium text-gray-900 ">
                            57
                        </span>
                    </ProgressCircle>
                    <div>
                        <p className="text-sm font-medium text-gray-900 ">
                            $340/$450
                        </p>
                        <p className="text-sm text-gray-500 ">
                            Spend management control
                        </p>
                    </div>
                </div>
            </Card> */}
        </>
    )
}