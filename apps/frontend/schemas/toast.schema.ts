import { TOAST_POSITIONS, TOAST_TYPES } from '@/lib/helpers'
import * as z from 'zod'

const MESSAGE_ERROR = 'Message must include between 2 and 256 characters'

const toastSchema = z.object({
  message: z.string().min(2, MESSAGE_ERROR).max(256, MESSAGE_ERROR),
  type: z.enum(['default', 'success', 'info', 'warning', 'error'] as typeof TOAST_TYPES),
  position: z.enum([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ] as typeof TOAST_POSITIONS),
  expand: z.boolean(),
  richColor: z.boolean(),
  description: z.string().min(2, MESSAGE_ERROR).max(256, MESSAGE_ERROR).optional()
})

export default toastSchema

export type ToastSchema = z.infer<typeof toastSchema>
