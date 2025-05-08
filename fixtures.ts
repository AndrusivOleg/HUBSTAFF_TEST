import { test as baseTest, Page, expect } from '@playwright/test'
import * as PageModules from './pages'

type PageFactory<T> = new (page: Page) => T

// Utility: Convert PascalCase to camelCase
const toCamelCase = (name: string) => name.charAt(0).toLowerCase() + name.slice(1)

// Build fixture types with camelCase keys
type PageRegistry = {
  [K in keyof typeof PageModules as `${Uncapitalize<string & K>}`]: InstanceType<(typeof PageModules)[K]>
}

const pageFixtures = Object.entries(PageModules).reduce((acc, [originalKey, PageClass]) => {
  const camelKey = toCamelCase(originalKey)
  acc[camelKey as keyof PageRegistry] = async ({ page }, use) => {
    await use(new (PageClass as PageFactory<any>)(page))
  }
  return acc
}, {} as Record<keyof PageRegistry, (context: { page: Page }, use: (pageInstance: any) => Promise<void>) => Promise<void>>)

const test = baseTest.extend<PageRegistry>(pageFixtures)

export { test, expect }
