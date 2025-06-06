import { useForm, DefaultValues } from 'react-hook-form';
// Types
import { FormValues } from '@/lib/form'

export default function useAppForm(defaultValues?: DefaultValues<FormValues>) {
  return useForm<FormValues>({ defaultValues });
}