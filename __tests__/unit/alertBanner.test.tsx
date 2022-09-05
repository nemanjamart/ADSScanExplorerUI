import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AlertBanner from '../../components/Layout/AlertBanner/AlertBanner';
import AlertProvider from '../../providers/AlertProvider'



const removeAlert = jest.fn()

jest.mock('../../hooks/useAlert.ts', () => ({
    __esModule: true,
    default: () => {
        return {
            alert: {
                message: 'test alert',
                isError: false
            },
            removeAlert: removeAlert
        }
    }
}))




describe('Alert banner', () => {

  it('renders the alert banner', () => {

    const {container} = render(<AlertProvider><AlertBanner/></AlertProvider>)
    
    const alert = container.querySelector('.alert')
    expect(alert).toBeInTheDocument()
    expect(alert.innerHTML).toEqual('test alert')


  }),
  it('closes the alert banner', async () => {

    const {container} = render(<AlertProvider><AlertBanner/></AlertProvider>)
    
    const alert = container.querySelector('.alert')
    const closeBtn = screen.getByRole('button')
    expect(alert).toBeInTheDocument()
    expect(closeBtn).toBeInTheDocument()

    fireEvent.click(closeBtn)
    expect(removeAlert).toBeCalled()


  })
})