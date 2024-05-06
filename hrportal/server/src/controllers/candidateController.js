/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint   | Description 
-------------------------------------------------------------------------------------------------------
29/4/2024   | HS                      | 3        | Search candidate validation
5/2/2024    | HS                      | 3        | Edit candidate and view single candidate
03/05/2024  | Harshini C              | 4        | View Candidates applied in
-------------------------------------------------------------------------------------------------------
*/ 

const Candidate = require("../collections/candidates");
const Resume = require("../collections/resumes");
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoose = require('mongoose');

// STORING RESUMES USING MULTER AND GRIDFS
const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const maxFileSize = 250 * 1024; // 250 KB in bytes

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/FecundHiringPortal',
  file: (req, file) => {
    return new Promise((resolve,cb) => {
      const fileName = '${Date.now()}-${file.originalname}';
      const metadata = {
        contentType: file.mimetype,
        originalname: file.originalname,
      };
      resolve({ fileName, metadata});
    });
  }
});

const upload = multer({storage});

// ADD NEW CANDIDATEs
const addCandidate = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        skillSet,
        itExperience,
        totalRelevantExperience,
        currentCompany,
        currentCTC,
        expectedCTC,
        noticePeriod,
        servingNoticePeriod,
        lastWorkingDay,
        status,
        certified,
        comments,
        resume
      } = req.body;

      //Contain info about the uploaded file   
      const uploadedFile = req.file

      // CHECKING IF THE CANDIDATE ALREADY EXISTS
      let existingCandidate;
      try {
        existingCandidate = await Candidate.findOne({ emailAddress });
        res.send({ status :"ok" , data : existingCandidate})
      } catch (error) {
        console.log(error);
      }
  
      if (existingCandidate) {
        return res.status(400).json({ message: "Error: Candidate already exists!" });
      }
      
      // CHECK FILE SIZE
      if (uploadedFile && uploadedFile.size > maxFileSize) {
        return res.status(400).json({message:'Error: Resume size is greater than 250 kb'})
      }

      // CHECK FILE TYPE
      if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
        return res.status(400).json({message:'Error: Resume in unsupported format. Allowed formats are doc, docx, pdf'})
      }

      // ADDING IN A NEW CANDIDATE
      const candidate = new Candidate({
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        skillSet,
        itExperience,
        totalRelevantExperience,
        currentCompany,
        currentCTC,
        expectedCTC,
        noticePeriod,
        servingNoticePeriod,
        lastWorkingDay,
        certified,
        comments,
        resume: uploadedFile ? uploadedFile.originalname : null
      });
      await candidate.save();

      if (Resume) {
        const resume = new Resume({
          fileName: uploadedFile.originalname,
          metadata: uploadedFile.metadata,
          candidateId: candidate._id,
          fsFileId: uploadedFile.id
        });
        await resume.save();

      }
      return res.status(201).json({message: " Candidate added Successfully"});
    } catch (error) {
      //console.log(error.message);
    }
  };
  
// SEARCH CANDIDATE BY FIELD
const searchCandidate = async (req,res) => {

const searchTerm = req.query.searchTerm; // Get the search term from query parameter

  // Validate if at least one search field has data
  if (!searchTerm || searchTerm.trim() === '') {
    return res.status(400).json({message: "Error: Enter data for at least one of the given fields!"});
  }

  const searchTerms = searchTerm.split('/\s+|\+|,/');
  const regexFirstName = new RegExp('^' + searchTerms[0] + '$', 'i');
  const regexLastName = new RegExp('^' + searchTerms[1] + '$', 'i');
  const regexemailAddress = new RegExp('^' + searchTerms[2] + '$', 'i');
  // Build the query based on searchTerm
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        { firstName: regexFirstName },
        { lastName: regexLastName},
        { emailAddress: regexemailAddress}
      ]
    };
  }

  try {
  const candidate = await Candidate.find(query,'firstName lastName emailAddress mobileNumber status'); // Find users matching the query
    // Check if any matching users were found
    if (!candidate.length) {
      return res.status(404).json({message: "Error: No match found!"} );
    }
    res.json(candidate); // Send the matching users back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching users'); // Handle errors
  }
}

//VIEW CANDIDATE RECORD BY YEAR AND MONTH
const viewCandidateByYearMonth = async (req,res) => {

  const searchTerm = req.query.searchTerm; // Get the search term from query parameter
  
    // Validate if at least one search field has data
    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(400).json({message: "Error: Enter data for both the given fields!"});
    }

    const searchTerms = searchTerm.split(' ')

    const regexYear = searchTerms[0];
    const regexMonth = searchTerms[1];
    
    // Build the query based on searchTerm
    let query = {};
    if(searchTerm){
      query = {
        $and: [
          { enteredYear: regexYear},
          { enteredMonth: regexMonth}
        ]
      };
    }

  try {
   candidateDetails = await Candidate.find(query,'firstName lastName emailAddress mobileNumber status'); // Find users matching the query
     
    // Check if any matching users were found
      if (!candidateDetails.length) {
        return res.status(404).json({message: "Error: No match found!"} );
      }
      res.json(candidateDetails); // Send the matching users back to the client
    } catch (error) {
      console.error(error);
      res.status(500).send('Error searching users'); // Handle errors
    }
  }


// VIEW SINGLE CANDIDATE
const viewCandidate = async (req,res) => {
  const candidateId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(candidateId)) {
    return res.status(400).send('Invalid candidate ID');
  }

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).send('Candidate not found');
    }
    res.json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching candidate');
  }

}

// Edit SELECTED CANDIDATE
const editCandidate = async (req, res) => {
  const candidateId = req.params.id;
  const filter = { _id: candidateId }; // Use ObjectId for MongoDB document ID
  
  const update = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      mobileNumber: req.body.mobileNumber,
      skillSet: req.body.skillSet,
      itExperience: req.body.itExperience,
      totalRelevantExperience: req.body.totalRelevantExperience,
      currentCompany: req.body.currentCompany,
      currentCTC: req.body.currentCTC,
      expectedCTC: req.body.expectedCTC,
      noticePeriod: req.body.noticePeriod,
      servingNoticePeriod: req.body.servingNoticePeriod,
      lastWorkingDay: req.body.lastWorkingDay,
      status: req.body.status,
      certified: req.body.certified,
      comments: req.body.comments
      //resume: req.file
    },
  };

  try {
    const result = await Candidate.updateOne(filter, update);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({message: "Error: Update failed"});
  }
}

module.exports = { addCandidate,searchCandidate, viewCandidateByYearMonth, editCandidate, viewCandidate,upload };


