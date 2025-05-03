'use client';

import Image from 'next/image'
import { useTheme } from 'next-themes'
import bomber from '@/public/bomber.png'

export default function ThemedBomber({ width = 50, height = 50 }) {
  const { theme } = useTheme()

  return (
    <Image
      src={bomber}
      alt="Bomber"
      width={width}
      height={height}
      // `filter` enables Tailwind’s filter utilities;
      // `dark:invert` flips black→white when dark mode is active
      className="filter dark:invert"
    />
  )
}
