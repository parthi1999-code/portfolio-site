import { Routes, Route, useLocation } from 'react-router-dom'
import HomeChrome from './components/HomeChrome.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import PageTransition from './components/PageTransition.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Project from './pages/Project.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const isHome = useLocation().pathname === '/'

  return (
    <>
      <IntroAnimation />
      <PageTransition />
      <ScrollToTop />
      <div className="grain" aria-hidden="true" />
      <HomeChrome />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="site">
            <main className={isHome ? 'main--home' : undefined}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work/:slug" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <SiteFooter />
          </div>
          <SmoothScroll />
        </div>
      </div>
    </>
  )
}
