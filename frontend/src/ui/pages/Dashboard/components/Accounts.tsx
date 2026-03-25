import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EyeIcon } from "../../../../assets/components/icons/EyeIcon";
import { AccountCard } from "./AccountCards";
import { AccountSliderNavigation } from './AccountsSliderNavigation';

export function Accounts() {
  return(
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open/>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={25}
            slidesPerView={2.1}
          >
            <div className="flex items-center justify-between" slot='container-start'>
              <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>

              <AccountSliderNavigation />
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
      </div>
    </div>
  )
}