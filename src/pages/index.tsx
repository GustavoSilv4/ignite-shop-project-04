import Image from 'next/image'
import { styled } from '../styles'
import { HomeContainer, Product } from '../styles/pages/home'

import camisa from '../assets/camisas/Shirt.png'
import camisa2 from '../assets/camisas/Shirt2.png'
import camisa3 from '../assets/camisas/Shirt3.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camisa} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camisa2} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
