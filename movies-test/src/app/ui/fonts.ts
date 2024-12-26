import { IBM_Plex_Sans, Inter } from 'next/font/google'

export const ibmFont = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const InterFont = Inter({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-inter',
})