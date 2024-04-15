/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 11/04/2024
Sprint: Sprint 2
User Story: Sign up validations

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

// importing useState
import { useState } from "react"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [showPopup, setShowPopup] = useState(false)

    const signup = async(firstName, lastName, employeeID, email, password, answer1, answer2, answer3) => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/user/signup',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({firstName, lastName, employeeID, email, password, answer1, answer2, answer3}),
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
    return { signup, error, isLoading, showPopup }
}  