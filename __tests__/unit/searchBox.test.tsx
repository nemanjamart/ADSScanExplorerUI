import { render, screen } from '@testing-library/react'
import SearchBox from '../../components/SearchBox/SearchBox'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));


describe('SearchBox', () => {

  process.env.NEXT_PUBLIC_ADS_DEFAULT_URL = "any_url" // whatever
  process.env.NEXT_PUBLIC_BASE_PATH = "scan"
  useRouter.mockImplementation(() => ({
    query: { q: 'exampleQuery' },
  }))

  it('contains the query from url params', () => {
    const {container} = render(<SearchBox />)

    const input = container.querySelector('#search-box-input') as HTMLInputElement
    expect(input).toBeInTheDocument() 
    expect(input.value).toEqual('exampleQuery')

  }),
  it('renders the quick fields', () => {
    const {container} = render(<SearchBox />)
    console.log(container.innerHTML)

    const quickField = container.querySelector('.quickFieldContainer')
    expect(quickField).toBeInTheDocument() 
  })

})