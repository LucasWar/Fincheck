import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EyeIcon } from "../../../../../assets/components/icons/EyeIcon";
import { AccountSliderNavigation } from './AccountsSliderNavigation';
import { AccountCard } from './AccountCards';
import { useAccountController } from './useAccountController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../../assets/components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {

  const {sliderState ,setSliderState, windowWidth, arevaluesVisible,toggleValueVIsiblility, isLoading, accounts } = useAccountController();


  return(
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className='w-fill h-full flex items-center justify-center'>
          <Spinner className='text-teal-950 fill-white'/>
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">Saldo total</span>
            <div className="flex items-center gap-2">
              <strong 
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !arevaluesVisible && "blur-md"
                )}>
                {formatCurrency(1000)}
              </strong>
              <button 
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValueVIsiblility}
              >
                <EyeIcon open={arevaluesVisible}/>
              </button>
            </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
              {accounts.length === 0 && (
                <>
                  <div className="mb-4" slot='container-start'>
                    <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
                  </div>
                  <button className='mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white'>
                    <div className='h-11 w-11 rounded-full border-2 border-dashed border-white flex items-center justify-center'>
                      <PlusIcon className='w-6 h-6'/>
                    </div>
                    <span className='tracking-[-0.5px] font-medium block w-32 text-center'>Cadastre uma nova conta</span>
                  </button>
                  
                </>
              )}

              {accounts.length > 0 && (
                <>
                  <div>
                    <Swiper
                      spaceBetween={25}
                      slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
                      onSlideChange={(swiper) => {
                        setSliderState({
                          isBeginning: swiper.isBeginning,
                          isEnd: swiper.isEnd
                        })
                      }}
                    >
                      <div className="flex items-center justify-between" slot='container-start'>
                        <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>

                        <AccountSliderNavigation 
                          isBeginning={sliderState.isBeginning}
                          isEnd={sliderState.isEnd}
                        />
                      </div>
                      <div className="mt-4">
                        <SwiperSlide>
                          <AccountCard 
                            balance={1000.23}
                            color="#7950F2"
                            name="Nubank"
                            type="CASH"
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <AccountCard 
                            balance={1000.23}
                            color="#333"
                            name="XP"
                            type="INVESTMENT"
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <AccountCard 
                            balance={1000.23}
                            color="#0f0"
                            name="Carteira"
                            type="CASH"
                          />
                        </SwiperSlide>
                      </div>
                    </Swiper>
                  </div>
                </>
            )}
            
          </div>
        </>
      )}
    </div>
  )
}