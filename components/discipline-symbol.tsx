import type { DisciplineId } from "@/lib/content/care-guides"

export function DisciplineSymbol({ discipline, size = 30 }: { discipline: DisciplineId; size?: number }) {
  const paths = {
    enfermeria: <><path d="M7 25h23l-5 7H12zM12 32v4h14M28 25l5-4 3 2-6 7M6 25c-7-8-4-13 2-10 3 2 2 6 0 7"/><path d="M21 22c-7-5 1-9 0-15 8 8 6 12 0 15Z" fill="currentColor" stroke="none"/></>,
    medicina: <><path d="M21 6v32M21 9c-12-1-13 10-1 12 12 2 12 10 1 12M21 14c9 1 10-5 6-7"/><circle cx="21" cy="5" r="2" fill="currentColor"/><path d="m27 7 5 2-5 2Z" fill="currentColor"/></>,
    farmacia: <><path d="M7 17h27c0 8-5 11-13 11S7 25 7 17ZM21 28v8M13 37h16M23 35c15-2 15-13 7-17-9-4-9-12-1-12 9 0 7 8 4 10"/><path d="m28 5-4 2 4 3"/></>,
    nutricion: <><path d="M21 15c-12-8-20 4-11 17 4 7 7 2 11 2s7 5 11-2c9-13 1-25-11-17Z"/><path d="M21 16V9M21 11c0-7 7-8 11-7-1 6-5 9-11 7Z"/><path d="M12 21c-2 3-1 6 0 7"/></>,
    fisioterapia: <><circle cx="25" cy="7" r="4"/><path d="m8 18 10-6 9 7 8-5M18 12l-4 14-7 9M14 26l12 2 4 10M4 10l5-4M3 23l5 1M32 28l5 3"/></>,
    psicologia: <><path d="M21 5v32M9 6v10c0 8 5 10 12 10s12-2 12-10V6M5 5h8M29 5h8M16 37h10"/></>,
  }
  return <svg viewBox="0 0 42 42" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[discipline]}</svg>
}
