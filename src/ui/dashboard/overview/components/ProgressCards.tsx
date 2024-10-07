import { Card } from '@/tremorComponents/Card';
import { ProgressCircle } from '@/tremorComponents/ProgressCircle';

export const ProgressCards = ({ data }: { data: { cardTitle: string, percentValue: number, numalator: string, denominator: string }[] }) => {

    return (

        <>
            {
                data.map(({ cardTitle, percentValue, numalator, denominator }, index) => (
                    <Card key={cardTitle + index}>
                        <div className="flex items-center justify-center gap-x-5">
                            <ProgressCircle
                                value={percentValue}
                                variant={percentValue <= 25 ? "error" : percentValue <= 50 ? "warning" : percentValue <= 75 ? "default" : "success"}>
                                <span className="text-sm font-medium text-gray-900 ">
                                    {percentValue}%
                                </span>
                            </ProgressCircle>
                            <div>
                                <p className="text-sm font-medium text-gray-900 ">
                                    {numalator}/{denominator}
                                </p>
                                <p className="text-sm text-gray-500 ">
                                    {cardTitle}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))
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