// importing useState and useNavigate
import { useState } from "react"
import { useNavigate} from "react-router-dom"

export const useLogin = () => {
    const [error, setError] = useState(" ")
    const [isLoading, setIsLoading] = useState(null)
    const navigateHome = useNavigate()

    const login = async( email, password)  => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/user/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password}),
            })

            const json = await response.json()
            console.log(json)

            if (!response.ok){
                throw new Error(json.message)
            }
            if (response.ok){
                navigateHome("/home")
            }
        } catch (error) {
            setError(error.message)
        }finally {
            setIsLoading(false)
        }
    }
    return { login, error, isLoading }
}  