// importing useState and useNavigate
import { useState } from "react"

export const useForgotPassword = () => {
    const [error, setError] = useState(" ")
    const [isVerifying, setIsVerifying] = useState(null)

    const forgotPassword = async ( email, employeeID, securityQuestion, answer )  => {
        setIsVerifying(true)
        setError(null)

        try{
            const response = await fetch('/api/user/forgotPassword',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, employeeID, securityQuestion, answer}),
            })

            const json = await response.json()            

            if (!response.ok){
                throw new Error(json.message)
            }
            if (response.ok){
                const isAnswerCorrect = response.ok
                return isAnswerCorrect
            }
        } catch (error) {
            setError(error.message)
        }finally {
            setIsVerifying(false)
        }
    }
    return { forgotPassword, error, isVerifying }
}  