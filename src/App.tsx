import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Socratic from './pages/Socratic'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aprender/:id" element={<Lesson />} />
      <Route path="/descubrir/:id" element={<Socratic />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
