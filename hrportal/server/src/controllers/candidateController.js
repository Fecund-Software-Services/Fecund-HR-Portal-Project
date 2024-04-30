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
29/4/2024   | Harshini C              | 3        | View Candidates applied in
-------------------------------------------------------------------------------------------------------
*/ 

const Candidate = require("../collections/candidates");
const Resume = require("../collections/resumes");
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

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
        originalname: file.originalname
      };
      resolve({ fileName, metadata});
    });
  }
});

const upload = multer({storage});

// ADD NEW CANDIDATE
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
  
const searchCandidate = async (req,res) => {

const searchTerm = req.query.searchTerm; // Get the search term from query parameter

  // Validate if at least one search field has data
  if (!searchTerm || searchTerm.trim() === '') {
    return res.status(400).json({ error: 'Enter data for at least one of the given fields!' });
  }

  const regex = new RegExp('^' + searchTerm + '$', 'i');
  // Build the query based on searchTerm
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        { firstName: regex },
        { lastName: regex},
        { emailAddress:  regex}
      ]
    };
  }

  try {
  candidate = await Candidate.find(query,'firstName lastName emailAddress mobileNumber status'); // Find users matching the query
    // Check if any matching users were found
    if (!candidate.length) {
      return res.status(404).json({ error: 'No match found!' });
    }
    res.json(candidate); // Send the matching users back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching users'); // Handle errors
  }
}

//Fetch records using View method of returning candidate details
const viewCandidate = async (req, res) => {

const viewFilterData = req.query.viewFilterData; // Get the search term from query parameter

  // Validate if at least one search field has data
  if (!viewFilterData || viewFilterData.trim() === '') {
    return res.status(400).json({ error: 'Choose option for both the fields!' });
  }

  const regex = new RegExp('viewFilterData.year-viewFilterData.month-', '');
  // Build the query based on searchTerm
  let query = {};
  if (viewFilterData) {
    query = {
      $and: [
        { createdAt: regex }
      ]
    };
  }

 try {
    candidate = await Candidate.find(query,'firstName lastName emailAddress mobileNumber status'); // Find users matching the query

    // Check if any matching users were found
    if (!candidate.length) {
      return res.status(404).json({ error: 'No match found!' });
    }
    res.json(candidate); // Send the matching users back to the client
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Error searching users'); // Handle errors
  }
}

module.exports = { addCandidate, searchCandidate, viewCandidate, upload };
