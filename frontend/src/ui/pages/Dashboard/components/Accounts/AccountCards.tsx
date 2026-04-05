import { cn } from "../../../../../app/utils/cn"
import { formatCurrency } from "../../../../../app/utils/formatCurrency"
import { BankAccountTypeIcon } from "../../../../../assets/components/icons/BankAccountTypeIcon"
import { useDashboardContext } from "../DashboardContext/useDashboardContext"

interface AccountCardProps {
  color: string
  name: string
  balance: number
  type: "CASH" | "CHECKING" | "INVESTMENT"
}

export function AccountCard({ color, name, balance, type}: AccountCardProps) {
  const { arevaluesVisible } = useDashboardContext()
  return(
    <div 
      className="p-4 bg-white rounded-2xl h-50 flex flex-col justify-between border-b-4 border-teal-900"
      style={{borderColor: color}}
    >
      <div>
        <BankAccountTypeIcon type={type}/>
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span 
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] mt-4 block",
            !arevaluesVisible && "blur-sm"
          )}>{formatCurrency(balance)}</span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  )
}