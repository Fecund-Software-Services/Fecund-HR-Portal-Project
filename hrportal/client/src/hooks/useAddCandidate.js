/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 25/04/2024
Sprint: Sprint 3
User Story: Hiring Portal Login

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
25/4/2024   |  Snjay and Vishal         |    3       |   Add New Candidate Validations - Code Integration
-------------------------------------------------------------------------------------------------------
*/

// importing useState 
import { useState } from "react"

export const useAddCandidate = () => {
    const [error, setError] = useState(" ")
    const [isLoading, setIsLoading] = useState(null)
    const [showPopup, setShowPopup] = useState(false)

    const addCandidate = async( firstName, lastName, emailAddress, mobileNumber,skillSet,
                                itExperience, totalRelevantExperience, currentCompany, currentCTC, expectedCTC,
                                noticePeriod, servingNoticePeriod, lastWorkingDay, status,certified, comments, resume)  => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/candidate/add-candidate',{
                method: 'POST',
                // headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({firstName, lastName, emailAddress, mobileNumber,skillSet,
                    itExperience, totalRelevantExperience, currentCompany, currentCTC, expectedCTC,
                    noticePeriod, servingNoticePeriod, lastWorkingDay, status,certified, comments, resume}),
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
    return { addCandidate, error, isLoading, showPopup }
}  