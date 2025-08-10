import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const sortings = [
  {label: 'Default Sorting', value: 'default_sorting'},
  {label: 'Ascending Order', value: 'asc'},
  {label: 'Decending Order', value: 'desc'},
  {label: 'Price: Low To High', value: 'price_low_high'},
  {label: 'Price: High To Low', value: 'price_high_low'},
]