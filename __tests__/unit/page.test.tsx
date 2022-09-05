import { render, screen, waitFor } from '@testing-library/react'
import Page from '../../components/Page/Page'

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


describe('Page item', () => {

  process.env.NEXT_PUBLIC_ADS_DEFAULT_URL = "ADS_ABSTRACT_URL"
  process.env.NEXT_PUBLIC_BASE_PATH = "scan"

  it('renders the page card', () => {

    const collectionInfo = {id: 'id', collection_id: 'col_id', volume_page_num: 11, journal: 'journal', volume: 'volume', label: 'label', articles: ['article1']}
    const {container} = render(<Page page={collectionInfo} thumbnail={'thumbnail_url'} textQuery={''}/>)
    
    const cardTitle = container.querySelector('.card-title')
    expect(cardTitle).toBeInTheDocument()
    expect(cardTitle.innerHTML).toEqual('Page label')

    const cardText = container.querySelector('.card-text')
    expect(cardText).toBeInTheDocument()
    expect(cardText.innerHTML).toEqual('Page 11 in journalvolume')
  })
})