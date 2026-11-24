import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Navigate, useLocation, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Matrimoni from './pages/Matrimoni'
import Crediti from './pages/Crediti'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/matrimoni" element={<Matrimoni />} />
            <Route path="/crediti" element={<Crediti />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  )
}
