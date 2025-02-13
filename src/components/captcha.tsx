'use client'

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import { FormMessage } from './ui/form';
import { useConfigStore } from '@/state/config';

const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then(mod => mod.Turnstile), {
  ssr: false,
})

type Props = Omit<ComponentProps<typeof Turnstile>, 'siteKey'> & {
  validationError?: string
}

export const Captcha = (props: Props) => {
  const { isTurnstileEnabled } = useConfigStore()

  return (
    isTurnstileEnabled ? (
      <>
        <Turnstile
          options={{
            size: 'flexible',
            language: 'auto',
          }}
          {...props}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
        />

        {props?.validationError && (
          <FormMessage className="text-red-500 mt-2">
            {props.validationError}
          </FormMessage>
        )}
      </>
    ) : null
  )
}
