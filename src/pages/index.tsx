import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor: '$green300',
  border: 0,
  borderRadius: 4,
  padding: '8px 8px',
  fontSize: 30,
  cursor: 'pointer',

  span: {
    fontWeight: 'bold',
    marginRight: 5,
  },

  '&:hover': {
    filter: 'brightness(0.8)',
  },
})

export default function Home() {
  return (
    <Button>
      <span>Teste</span>
      Enviar
    </Button>
  )
}
