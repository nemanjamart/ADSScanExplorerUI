import { render, screen, waitFor } from '@testing-library/react'
import Collection from '../../components/Collection/Collection';


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


describe('Collection item', () => {

  process.env.NEXT_PUBLIC_ADS_DEFAULT_URL = "ADS_ABSTRACT_URL"
  process.env.NEXT_PUBLIC_BASE_PATH = "scan"

  it('renders the collection card', () => {

    const collectionInfo = {id: 'id', journal: 'journal', volume: 'volume', pages: 32}
    const {container} = render(<Collection collection={collectionInfo} thumbnail={'thumbnail_url'} textQuery={''}/>)

    const cardTitle = screen.getByText('journalvolume')
    expect(cardTitle).toBeInTheDocument()

    const cardText = screen.getByText('32 pages')
    expect(cardText).toBeInTheDocument()
  })
})