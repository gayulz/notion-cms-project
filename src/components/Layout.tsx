/**
 * [NEW] 애플리케이션의 공통 레이아웃 컴포넌트입니다.
 * 모든 페이지에 적용될 Header, Footer 및 메인 콘텐츠 영역을 정의합니다.
 *
 * @author gayul.kim
 * @since 2026-01-18
 */
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
