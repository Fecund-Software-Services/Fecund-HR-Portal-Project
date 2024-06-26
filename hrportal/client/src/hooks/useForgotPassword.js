/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 11/04/2024
Sprint: Sprint 2
User Story: Reset Password Validations

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

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
            // console.log(json)

            if (!response.ok) {
                throw new Error(json.message);
              } else {
                const isAnswerCorrect = response.ok;
                return isAnswerCorrect;
              }
        } catch (error) {
            setError(error.message)
        }finally {
            setIsVerifying(false)
        }
    }
    return { forgotPassword, error, isVerifying }
}  