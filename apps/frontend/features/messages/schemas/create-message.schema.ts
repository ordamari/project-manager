import * as zod from 'zod'

const createMessageSchema = zod.object({
    content: zod.string().min(1).max(1000),
})

export type CreateMessage = zod.infer<typeof createMessageSchema>

export default createMessageSchema
