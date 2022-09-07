import { useRouter } from '../../../node_modules/next/router'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

export default function Products() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolorum laborum tempora, temporibus repellat
          voluptate molestias! Rem, libero magnam, vero veniam eligendi voluptas quo suscipit nihil obcaecati sunt
          facilis dignissimos.
        </p>

        <button>Comprar Agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
