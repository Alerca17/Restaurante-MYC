import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function AuthLayout() {

    return (

        <>
            <div className="min-h-screen bg-[#0D0D0D]">
                <div className="max-w-lg mx-auto pt-10 px-5">

                    <img src="/logo.png" alt="Logotipo MyC" />

                    <div className="py-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                theme="dark"
                richColors
                toastOptions={{
                    style: {
                        background: '#1A1A1A',
                        color: '#F5F5F5',
                        border: '1px solid #D4AF37',
                        fontFamily: 'inherit',
                    },
                    className: 'rounded-md shadow-lg',
                }}
            />
        </>
    )
}
