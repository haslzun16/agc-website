import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  service?: string
  formType: 'quote' | 'estimate' | 'contact'
}

interface UseContactFormResult {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  submitForm: (data: FormData) => Promise<void>
  reset: () => void
}

export function useContactForm(): UseContactFormResult {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)
    setIsSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setIsSubmitting(false)
    setIsSuccess(false)
    setError(null)
  }

  return {
    isSubmitting,
    isSuccess,
    error,
    submitForm,
    reset,
  }
} 