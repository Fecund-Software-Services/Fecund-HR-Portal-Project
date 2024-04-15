/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 11/04/2024
Sprint: Sprint 2
User Story: Enter New Password

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

// importing useState
import { useState } from "react"

export const useResetPassword = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [showPopup, setShowPopup] = useState(false)

    const resetPassword = async(employeeID, newPassword) => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/user/resetPassword',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({employeeID, newPassword}),
            })

            const json = await response.json()
            console.log(json)

            if (!response.ok){
                throw new Error(json.message)
            }
            if (response.ok){
                setShowPopup(!showPopup)
            }
        } catch (error) {
            setError(error.message)
        }finally {
            setIsLoading(false)
        }
    }
    return { resetPassword, error, isLoading, showPopup }
}  