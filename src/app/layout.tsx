import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NextJS Starter - 모던 웹 스타터킷',
  description:
    'Next.js 15, TypeScript, TailwindCSS, ShadcnUI로 구축된 프로덕션 준비가 완료된 웹 애플리케이션 스타터킷',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
