import { useFormContext } from 'react-hook-form';
// Types
import { FormValues } from '../lib/form'

export default function useAppFormContext() {
  return useFormContext<FormValues>();
}