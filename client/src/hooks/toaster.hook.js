import { useCallback } from "react"


export const useToasterMessage = () => {
    const showMessage = useCallback((text) => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])

    return showMessage
}
