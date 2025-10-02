import { toast } from 'sonner';

export const defaultMessage = (message) => {
    toast(`${message}`, )
}
export const successMessage = (message) => {
    toast.success(`${message}`,{
        id: 'success-1',
    })
}
export const errorMessage = (message) => {
    toast.error(`${message}`,{
        id: 'error-1',
    })
}
export const infoMessage = (message) => {
    toast.info(`${message}`,{
        id: 'info-1',
    })
}
export const warningMessage = (message) => {
    toast.warning(`${message}`,{
        id: 'warn-1',
    })
}
export const descriptionMessage = (message, description) => {
    toast.message(message, {
        description: description,
        id:'description-1'
    })
}