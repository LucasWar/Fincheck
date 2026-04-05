import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../../assets/components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../../assets/components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOptions } from "./sliderOptions";
import { SliderNavigation } from "./sliderNavigation";
import { CategoryIcon } from "../../../../../assets/components/icons/categories/CategoryIcon";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { useTrasanctionsController } from "./useTrasanctionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../../assets/components/Spinner";
import emptyStateImage from "../../../../../assets/empty-state.svg"
import { TransactionTypeDropdown } from "./TransactionsTypeDropdown";

export function Transactions() {

  const { arevaluesVisible, isInitialLoading, isLoading, transactions } = useTrasanctionsController()

  const hasTrasactions = transactions.length > 0

  return(
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className='w-fill h-full flex items-center justify-center'>
          <Spinner/>
        </div>
      )}


      {!isInitialLoading && (
        <>
          <header className="">
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
              >
                <SliderNavigation />
                {MONTHS.map((moth, index) => {
                  return(
                    <SwiperSlide>
                      {({isActive}) => (
                        <SliderOptions 
                          isActive={isActive}
                          moth={moth}
                          index={index}
                        />
                      )}
                    </SwiperSlide>
                  )
                })}
                
              </Swiper>
            </div>
          </header>
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <Spinner className="w-10 h-10"/>
              </div>
            )}
            {(!hasTrasactions && !isLoading) && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <img 
                  src={emptyStateImage}
                />
                <p className="text-gray-700">Não econtramos nenhums transação</p>
              </div>
            )}
            {(hasTrasactions && !isLoading) && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-center">
                  <div className="flex-1 flex gap-3">
                    <CategoryIcon type="income"/>
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div> 

                  <span 
                    className={
                      cn(
                        "text-green-800 tracking[-0.8px] font-medium",
                        !arevaluesVisible && "blur-sm")
                    }>
                    {formatCurrency(123)}
                  </span> 
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-center">
                  <div className="flex-1 flex gap-3">
                    <CategoryIcon type="expense"/>
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div> 

                  <span className="text-red-800 tracking[-0.8px] font-medium">
                    - {formatCurrency(123)}
                  </span> 
                </div>
              </>
            )}
          </div>      
        </>
      )}
    </div>
  )
}