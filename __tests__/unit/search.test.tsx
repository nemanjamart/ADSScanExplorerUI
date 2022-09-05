import { fireEvent, render, screen, act, waitFor} from '@testing-library/react'
import Search from '../../pages/search'
import Router from 'next/router'


const useRouter = jest.spyOn(require('next/router'), 'useRouter')

jest.mock('next/image', () => ({
    __esModule: true,
    default: () => {
        return 'Next image stub'; // whatever
    },
}));

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        metadataServiceUrl: 'test_url',
        serviceUrl: 'test_url' // whatever

    }
}))

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn()
  }))
  
  

jest.mock('../../hooks/useScanService.ts', () => ({
    __esModule: true,
    default: (url: string, query) => {
        return {
            data: {
                "items": [
                    {
                        "bibcode": "1895ApJ.....1....1M",
                        "id": "1895ApJ.....1....1M",
                        "pages": 10
                    },
                    {
                        "bibcode": "1895ApJ.....1...29R",
                        "id": "1895ApJ.....1...29R",
                        "pages": 16
                    },
                    {
                        "bibcode": "1895ApJ.....1...52W",
                        "id": "1895ApJ.....1...52W",
                        "pages": 29
                    },
                ],
                "limit": 3,
                "page": 1,
                "pageCount": 4344,
                "query": "",
                "total": 43436
            },
            isLoading: false,
            isError: false
        }
    }
}))

jest.mock('next/link', () => ({ children }) => children);



describe('SearchPage', () => {
    process.env.NEXT_PUBLIC_ADS_DEFAULT_URL = "test_url" // whatever
    process.env.NEXT_PUBLIC_BASE_PATH = "scan"

    useRouter.mockImplementation(() => ({
        query: { q: 'bibstem:ApJ', limit: 30, page: 1 },
    }))


    it('renders the search result text', () => {
        render(<Search />)
        const title = screen.getByText(/Your search returned/i)
        expect(title).toBeInTheDocument()

        // Test that result renders correct amount of results
        expect(title.innerHTML).toContain('43436')
    }),
    it('renders the nav tabs', () => {
        const { container } = render(<Search />)
        
        const nt = container.querySelector('.nav-tabs')
        expect(nt).toBeInTheDocument()
    }),
    it('renders pagination', () => {
        const { container } = render(<Search />)

        const etext = screen.getByText(/of 4344/i)
        expect(etext).toBeInTheDocument()

        const option30 = (screen.getByRole('option', { name: '30' }) as HTMLOptionElement)
        const option10 = (screen.getByRole('option', { name: '10' }) as HTMLOptionElement)

        expect(option30.selected).toBe(true)
        expect(option10.selected).toBe(false)
    }),
    it('renders search result cards', () => {
        const { container } = render(<Search />)

        const nt = container.querySelector("[class^='resultsContainer']")
        expect(nt.children.length == 4).toBeTruthy()
    }),
    it('updates sort order', () => {
        const mockRouter = {
            push: jest.fn(),
            query: { q: 'bibstem:ApJ', limit: 30, page: 1, order: 'asc' },
        };

        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        render(<Search />)
        const sortOrderBtn = screen.getByRole('button', {
            name: /sort order/i
        })
        
        fireEvent.click(sortOrderBtn)

        expect(mockRouter.push).toHaveBeenCalledWith(expect.objectContaining({
            query: expect.objectContaining({
                order: "desc"
            })
        }),
        undefined,
        {"shallow": true})
    }),
    it('updates sort option', async () => {
        const mockRouter = {
            push: jest.fn(),
            query: { q: 'bibstem:ApJ', limit: 30, page: 1, sort: 'bibcode' },
        };

        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        render(<Search />)

        const sortOptionBtn = screen.getByText('bibcode')
        expect(sortOptionBtn).toBeInTheDocument()

        fireEvent.click(sortOptionBtn)
        
        const relOption =  screen.getByText('relevance')
        fireEvent.click(relOption)
        
        expect(mockRouter.push).toHaveBeenCalledWith(expect.objectContaining({
            query: expect.objectContaining({
                sort: "relevance"
            })
        }),
        undefined,
        {"shallow": true})
    })
})