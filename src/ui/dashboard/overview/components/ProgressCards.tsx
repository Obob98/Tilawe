import { Card } from '@/tremorComponents/Card';
import { ProgressCircle } from '@/tremorComponents/ProgressCircle';

export const ProgressCards = () => (
    <>
        <Card>
            <div className="flex items-center justify-center gap-x-5">
                <ProgressCircle value={75} variant='success'>
                    <span className="text-sm font-medium text-gray-900 ">
                        75%
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
        </Card>
    </>
)