import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ChatPilot - Automate Your Growth',
    description: 'The fastest way to automate your growth with WhatsApp broadcasting, AI chatbots, and CRM automation.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
