/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint   | Phase | Description 
-------------------------------------------------------------------------------------------------------
29/4/2024   | HS                      | 3        | 1    | Search candidate validation
5/2/2024    | HS                      | 3        | 1    | Edit candidate and view single candidate
03/05/2024  | Harshini C              | 4        | 1    | View Candidates applied in
07/05/2024  | HS                      | 4        | 1    | Resume Handling
08/05/2024  | HS                      | 4        | 2    | Update Resume Handling
02/08/2024  | Harshini C              | 2        | 2    | Added logger library
-------------------------------------------------------------------------------------------------------
*/

const Candidate = require("../collections/candidates");
const Resume = require("../collections/resumes");
const url = require("../connection/constants");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const dbName = require("../connection/constants");
const host = require("../connection/constants");
const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const logger = require('../utility/logger');
const mongoURI = "mongodb:" + url.databaseURL;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// STORING RESUMES USING MULTER AND GRIDFS
const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const maxFileSize = 250 * 1024; // 250 KB in bytes

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

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
      resume,
    } = req.body;

    //Contain info about the uploaded file
    const uploadedFile = req.file;

    // CHECKING IF THE CANDIDATE ALREADY EXISTS
    let existingCandidate;
    try {
      existingCandidate = await Candidate.findOne({ emailAddress });
    } catch (error) {
      logger.error(error);
    }

    if (existingCandidate) {
      return res
        .status(400)
        .json({ message: "Error: Candidate already exists!" });
    }

    // CHECK FILE SIZE
    if (uploadedFile && uploadedFile.size > maxFileSize) {
      return res
        .status(400)
        .json({ message: "Error: Resume size is greater than 250 kb" });
    }

    // CHECK FILE TYPE
    if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
      return res
        .status(400)
        .json({
          message:
            "Error: Resume in unsupported format. Allowed formats are doc, docx, pdf",
        });
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
      resume: uploadedFile ? uploadedFile.originalname : null,
      fileId: uploadedFile.filename,
    });
    await candidate.save();

    if (Resume) {
      const resume = new Resume({
        fileName: uploadedFile.originalname,
        metadata: uploadedFile.metadata,
        candidateId: candidate._id,
        fsFileId: uploadedFile.id,
      });
      await resume.save();
    }
    return res.status(201).json({ message: " Candidate added Successfully" });
  } catch (error) {
    logger.error(error.message);
  }
};

// SEARCH CANDIDATE BY FIELD
const viewCandidateByField = async (req, res) => {
  const { firstName, lastName, email } = req.query;

  // Validate if at least one search field has data
  if (!(firstName || lastName || email)) {
    return res
      .status(400)
      .json({ message: "Error: Enter data for at least one field!" });
  }

  // Build the search query using regular expressions for case-insensitive matching
  let query = {};
  const searchTerms = [];

  if (firstName) {
    searchTerms.push({ firstName: new RegExp("^" + firstName + "$", "i") });
  }
  if (lastName) {
    searchTerms.push({ lastName: new RegExp("^" + lastName + "$", "i") });
  }
  if (email) {
    searchTerms.push({
      emailAddress: new RegExp("^" + email + "$", "i"),
    });
  }

  query = { $or: searchTerms };

  try {
    const candidate = await Candidate.find(
      query,
      "firstName lastName emailAddress mobileNumber status"
    ); // Find users matching the query
    // Check if any matching users were found
    if (!candidate.length) {
      return res.status(404).json({ message: "Error: No match found!" });
    }
    res.json(candidate); // Send the matching users back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching users"); // Handle errors
  }
};

//VIEW CANDIDATE RECORD BY YEAR AND MONTH
const viewCandidateByYearMonth = async (req, res) => {
  const searchTerm = req.query.searchTerm; // Get the search term from query parameter

  const searchTerms = searchTerm.split(" ");

  if (searchTerms.length === 0 || searchTerms.length === 1) {
    return res
      .status(400)
      .json({ message: "Error: Enter data for both the given fields!" });
  }

  const regexYear = searchTerms[0];
  const regexMonth = searchTerms[1];

  // Build the query based on searchTerm
  let query = {};
  if (searchTerm) {
    query = {
      $and: [{ enteredYear: regexYear }, { enteredMonth: regexMonth }],
    };
  }

  try {
    candidateDetails = await Candidate.find(
      query,
      "firstName lastName emailAddress mobileNumber status"
    ); // Find users matching the query

    // Check if any matching users were found
    if (!candidateDetails.length) {
      return res.status(404).json({ message: "Error: No match found!" });
    }
    res.json(candidateDetails); // Send the matching users back to the client
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error searching users"); // Handle errors
  }
};

// VIEW SINGLE CANDIDATE
const viewCandidate = async (req, res) => {
  const candidateId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(candidateId)) {
    return res.status(400).send("Invalid candidate ID");
  }

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).send("Candidate not found");
    }
    res.json(candidate);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Error fetching candidate");
  }
};

// VIEW RESUMEs
async function viewResume(filename, response) {
  try {
    const client = await MongoClient.connect("mongodb:" + host.localhost);
    const db = client.db(dbName.databaseName);
    const bucketName = "uploads";
    const bucket = new mongodb.GridFSBucket(db, { bucketName });

    const downloadStream = bucket.openDownloadStreamByName(filename);

    downloadStream.pipe(response); // Assuming you're in an Express route
    response.setHeader("Content-Type", "application/pdf"); // Set appropriate content type
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
  } catch (error) {
    logger.error("Error to see resume", error);
  }
}

// Edit SELECTED CANDIDATE
const editCandidate = async (req, res) => {
  const candidateId = req.params.id;
  const filter = { _id: candidateId };
  const updatedfile = req.file;

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
      comments: req.body.comments,
      resume: updatedfile ? updatedfile.originalname : req.body.resume, // FIRES ONLY WHEN THE RESUME IS UPDATED
      fileId: updatedfile?.filename,
    },
  };
  // TO UPDATE RESUME COLLECTION THAT REFERS TO CANDIDATE
  if (updatedfile) {
    const updateResume = await Resume.findOne({ candidateId: filter });
    if (updateResume) {
      await Resume.updateOne(
        { _id: updateResume._id },
        {
          $set: {
            fsFileId: updatedfile?.id,
            fileName: updatedfile
              ? updatedfile.originalname
              : req.body.fileName,
          },
        }
      );
    }
  }

  try {
    const result = await Candidate.updateOne(filter, update);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: "Error: Update failed!" });
  }
};

module.exports = {
  addCandidate,
  viewCandidateByField,
  viewCandidateByYearMonth,
  editCandidate,
  viewCandidate,
  viewResume,
  upload,
};
