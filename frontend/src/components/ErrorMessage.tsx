

export default function ErrorMessage({ children }: { children: React.ReactNode }) {

    return (
        <p className="text-red-500 bg-red-600/10 p-3 border-red-400/30 rounded-md text-sm uppercase font-bold text-center">
            {children}
        </p>
    )
}

