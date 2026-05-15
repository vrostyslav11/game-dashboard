import { z } from "zod"

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Email must be a valid email address"),
	password: z.string().min(1, "Password is required"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
	email: z.string().min(1, "Email is required").email("Email must be a valid email address"),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at most 20 characters")
		.regex(/^[a-zA-Z0-9_]+$/, "Username may contain only letters, digits and underscores"),
	password: z.string().min(8, "Password must be at least 8 characters").max(72, "Password must be at most 72 characters"),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
