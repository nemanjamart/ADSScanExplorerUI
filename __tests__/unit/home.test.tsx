import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'
import * as nextRouter from 'next/router';

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));


describe('HomePage', () => {

  process.env.NEXT_PUBLIC_ADS_DEFAULT_URL = "any_url" // whatever
  process.env.NEXT_PUBLIC_BASE_PATH = "scan"
  useRouter.mockImplementation(() => ({
    query: { q: '' },
  }))

  it('renders the title', () => {
    render(<Home />)

    const title = screen.getByText(/ADS Scan Explorer/i)
    expect(title).toBeInTheDocument()

  }),

  it('renders the search examples', () => {
    const { container } = render(<Home />)

    const heading = screen.getByText(/Search examples/i)
    expect(heading).toBeInTheDocument()

    const lg = container.querySelector('#search-example-lg')
    expect(lg.children.length > 0)
  }),

  it('renders the search field', () => {

    const { container } = render(<Home />)

    const sb = container.querySelector('#search-box-input')
    expect(sb).not.toBeNull()
    expect(sb).toBeInTheDocument()
  })

})