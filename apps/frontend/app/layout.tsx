import type { Metadata } from 'next'
import './globals.css'
import DirectionProvider from '@core/providers/direction.provider'
import ThemeProvider from '@core/providers/theme.provider'

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html>
            <body>
                <DirectionProvider>
                    <ThemeProvider className='flex flex-row w-full h-screen flex-shrink-0 text-muted-foreground overflow-auto bg-primary-foreground'>
                        {children}
                    </ThemeProvider>
                </DirectionProvider>
            </body>
        </html>
    )
}
