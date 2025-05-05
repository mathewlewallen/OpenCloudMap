'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'        // wherever your store is defined
import type { ReactNode } from 'react'

interface Props { children: ReactNode }

export function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>
}
