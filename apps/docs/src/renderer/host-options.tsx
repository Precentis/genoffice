import type { ReactNode } from 'react'
import { GensparkMark } from './components/icons'

/**
 * Options an embedding host can set on `window.genofficeHost` before the renderer starts (for example a web
 * deployment that runs the Docs editor inside its own product). Unset, everything behaves as in the desktop app.
 */
export interface HostOptions {
  /** product name shown on the AI entry points instead of the default brand */
  brandName?: string
  /** mark shown with that name */
  brandMark?: (props: { size: number }) => ReactNode
  /** start with Track Changes on when the opened document does not say (w:trackRevisions) */
  trackChangesByDefault?: boolean
}

declare global {
  interface Window {
    genofficeHost?: HostOptions
  }
}

export function hostOptions(): HostOptions {
  return (typeof window !== 'undefined' && window.genofficeHost) || {}
}

export function brandName(fallback: string): string {
  return hostOptions().brandName ?? fallback
}

/** a model prompt with the host's product name in place of the editor's own, so the AI never names another product */
export function withProductName(prompt: string): string {
  const name = hostOptions().brandName
  return name ? prompt.replaceAll('GenOffice Docs', name) : prompt
}

export function BrandMark({ size }: { size: number }) {
  const mark = hostOptions().brandMark
  return mark ? <>{mark({ size })}</> : <GensparkMark size={size} />
}
