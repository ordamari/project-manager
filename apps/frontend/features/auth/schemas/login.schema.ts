import * as z from 'zod'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export default loginSchema

export type LoginSchema = z.infer<typeof loginSchema>
