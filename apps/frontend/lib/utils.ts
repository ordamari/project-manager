import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import languages from '@/languages'
import { faker } from '@faker-js/faker'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function translate(language: keyof typeof languages, key: string) {
  const keys = key.split('.')
  const value: string | any = keys.reduce((acc: any, key) => {
    if (acc && acc[key]) return acc[key]
    return null
  }, languages[language].translation)
  if (typeof value === 'string') return value
  return key
}

export function demoUsers(length: number) {
  const users = []
  for (let i = 1; i <= length; i++) {
    const user = {
      id: i,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      number: faker.number.int({ min: -1000, max: 1000 })
    }
    users.push(user)
  }
  return users
}
