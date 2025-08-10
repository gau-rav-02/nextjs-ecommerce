import Footer from '@/components/Application/Website/Footer'
import Header from '@/components/Application/Website/Header'
import React from 'react'
import { Kumbh_Sans } from 'next/font/google'

const kumbh_sans = Kumbh_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

const layout = ({children}) => {
  return (
    <div className={kumbh_sans.className}>
      <Header/>
      <main>{children}</main>
      <Footer/>
    
    </div>
  )
}

export default layout