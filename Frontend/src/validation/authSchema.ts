import {z} from 'zod'

export const authSchema = z.object({
    email: z.string().email({message:"Invalid Email Format"}),
    password: z.string().min(5,{message:"Password must be at least 5 characters"})
})