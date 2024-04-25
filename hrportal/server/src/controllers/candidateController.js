/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

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
      // valid file size
      // if (file.size > maxFileSize) {
      //   return cb(new Error('File size exceeds limit (250 KB).'));
      // }
  
      // // Validate file type
      // if (!allowedMimeTypes.includes(file.mimetype)) {
      //   return cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
      // }
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
      } catch (error) {
        console.log(error.message);
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
      console.log(error.message);
    }
  };

module.exports = { addCandidate,upload };