import * as z from 'zod'

const createCompanySchema = z.object({
    name: z.string().min(2),
})

export default createCompanySchema

export type CreateCompanySchema = z.infer<typeof createCompanySchema>
