/*
Project: Hiring Portal Project
Author: HS
Date: 17/4/2024
Sprint: Sprint 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/ 

const Candidate = require("../collections/candidates");
const Resume = require("../collections/resumes");
const url = require('../connection/constants');
const multer = require('multer');
const Grid = require('gridfs-stream')
const {GridFsStorage} = require('multer-gridfs-storage')
const mongoose = require('mongoose');


// const conn = mongoose.createConnection('mongodb://localhost:27017/FecundHiringPortal');

// let gfs;

// conn.once('open',()=>{
//   gfs = Grid(conn.db, mongoose.mongo)
//   gfs.collection('resume')
// })
// // STORING RESUMES USING MULTER AND GRIDFS
// const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
// const storage = new GridFsStorage({
//   url: 'mongodb://localhost:27017/FecundHiringPortal',
//   file: (req, file) => {
//     console.log(file)
//     return new Promise((resolve, reject) => {
//       const id = file._id;
//       const fileName = '${Date.now()}-${file.originalname}';
//       const metadata = {
//         contentType: file.mimetype,
//         originalname: file.originalname
//       };

//       // CHECK FOR ALLOWED FILE TYPES
//       if (!allowedMimeTypes.includes(file.mimetype)) {
//         return reject(new Error('Error: Resume in unsupported format. Allowed formats are doc, docx, pdf'))
//       }
//       resolve({ fileName, metadata});
//     });
//   }
// });

// const upload = multer({storage});

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

      // Containe info about the uploaded file   
      // const uploadedFile = req.file
  
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
      
      // // CHECK FILE SIZE
      // const maxSize = 250 * 1024;
      // if (uploadedFile && uploadedFile.size > maxSize) {
      //   return res,status(400).json({message:'Error: Resume size is greater than 250 kb'})
      // }

      // ADDING IN A NEW CANDIDATE
      const candidate = new Candidate({
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        skillSet,
        //otherSkillSet,
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
        resume: uploadedFile ? uploadedFile.fileName : null
      });
      await candidate.save();

      // if (Resume) {
      //   const resume = new Resume({
      //     fileName: uploadedFile.fileName,
      //     metadata: uploadedFile.metadata,
      //     candidateId: candidate._id
      //   });
      //   await resume.save();

      // }
      return res.status(201).json({message: " Candidate added Successfully"});
    } catch (error) {
      console.log(error.message);
    }
  };

module.exports = { addCandidate };