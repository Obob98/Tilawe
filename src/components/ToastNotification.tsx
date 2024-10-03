import { Button } from "@/components/Button"
import { Toast, ToastProvider } from "@/components/Toast"
import { Toaster } from "@/components/Toaster"
import { useToast } from "@/lib/useToast"

const ToastPreview = () => (
    <ToastProvider>
        <Toast
            open
            title="Success"
            description="Your payment has been processed. Thank you for your purchase!"
            variant="success"
            className="mt-0"
        />
    </ToastProvider>
)

export function ToastSuccessExample() {
    const { toast } = useToast()

    return (
        <>
            <Toaster />
            <Button
                onClick={() =>
                    toast({
                        title: "Success",
                        description:
                            "Your payment has been processed. Thank you for your purchase!",
                        variant: "success",
                        duration: 3000,
                    })
                }
            >
                Create toast
            </Button>
        </>
    )
}