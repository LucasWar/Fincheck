import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;

}

export function Button ({className, isLoading, disabled, children, ...props}: ButtonProps) {
  return (
    <button 
      {...props} 
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex justify-center items-center',
        className
      )}
    >

      {!isLoading && children}
      {isLoading && <Spinner />}
    </button>
  )
}