import { render, screen, waitFor } from '@testing-library/react'
import Article from '../../components/Article/Article';

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

jest.mock('../../hooks/useScanService.ts', () => ({
    __esModule: true,
    default: (url: string, query) => {
        return {
            data: {
                title: ['ArticleTitle'],
                author: ['ArticleAuthor']
            },
            isLoading: false,
            isError: false
        }
    }
}))

describe('Article item', () => {

  process.env.NEXT_PUBLIC_ADS_DEFAULT_URL = "ADS_ABSTRACT_URL"
  process.env.NEXT_PUBLIC_BASE_PATH = "scan"

  it('renders the article card', () => {

    const articleInfo = {id: 'id', bibcode: 'bibcode', pages: 15}
    const {container} = render(<Article article={articleInfo} thumbnail={'thumbnail_url'} textQuery={''}/>)
    
    const cardTitle = container.querySelector('.card-title')
    expect(cardTitle).toBeInTheDocument()
    expect(cardTitle.innerHTML).toEqual('ArticleTitle')

    const cardSubtitle = container.querySelector('.card-subtitle')
    expect(cardSubtitle).toBeInTheDocument()
    expect(cardSubtitle.innerHTML).toEqual('bibcode')

    const cardText = container.querySelector('.card-text')
    expect(cardText).toBeInTheDocument()
    expect(cardText.innerHTML).toEqual('15 pages')

    const cardFooter = container.querySelector('.card-footer')
    expect(cardFooter).toBeInTheDocument()
    expect(cardFooter.innerHTML).toEqual('ArticleAuthor')
  })
})