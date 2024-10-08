'use client';

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/tremorComponents/Button'
import { useFormState, useFormStatus } from 'react-dom';
import { cx } from '@/lib/utils';
// import { authenticate } from '@/actions/invoiceActions';

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Call NextAuth signIn method with credentials
    const res = await signIn('credentials', {
      redirect: false, // Prevent auto-redirect
      email,
      password
    })

    if (res?.error) {
      setError('Invalid email or password')
      setIsSubmitting(false)
    } else {
      // Redirect on successful login
      // router.push('/dashboard')
      setIsSubmitting(false)
      window.location.href = '/dashboard'
    }
  }

  return (
    <main className='w-fit h-screen flex flex-col items-center' >
      <h1 className='mt-32 mb-8 text-3xl font-bold'>Login</h1>

      {error && <p style={{ color: 'red' }} className='mb-4'> {error} </p>
      }
      <form onSubmit={handleSubmit} className='w-[400px] flex flex-col gap-8' >
        <div className='w-full' >
          <input
            type="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='p-4 border border-[#e0e0e0] w-full rounded-md'
          />
        </div>
        < div className='w-full' >
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='p-4 border border-[#e0e0e0] w-full rounded-md'
          />
        </div>
        <LoginButton {...{ isSubmitting }} />
      </form>
    </main>
  )
}

function LoginButton({ isSubmitting }: { isSubmitting: boolean }) {

  return (
    <Button
      className={cx("p-4 bg-primary text-white rounded-md")}
      aria-disabled={isSubmitting}
      disabled={isSubmitting}
      isLoading={isSubmitting}
      loadingText='Verifying...'
    >
      Log in
    </Button>
  );
}
