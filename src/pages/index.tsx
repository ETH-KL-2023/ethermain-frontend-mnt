import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import HeroLayout from './components/HeroLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroLayout />
    </div>
  )
}
