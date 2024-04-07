import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const formatDate = (date: Date):string => {
  const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "short", day: "2-digit", month: "long"}).format(new Date(date));
  return formattedDate
}

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))