const mongoose = require("mongoose");

const FounderSchema = new mongoose.Schema({
  name: String,
  dob: String,
  gender: String,
  qualification: String,
  shareholding: Number,
  about: String,
});

const RegistrationSchema = new mongoose.Schema(
  {
    // Basic Info
    firmName: String,
    firmType: String,
    email: String,
    phone: String,

    // Founders (Array)
    founders: [FounderSchema],

    // Additional Details
    industry: String,
    website: String,
    gstn: String,
    dpiit: String,
    startupRegNo: String,

    // Business Details
    businessOpportunity: String,
    businessModel: String,

    // Financial Information
    revenueYear1: Number,
    revenueYear2: Number,
    revenueYear3: Number,

    // Narrative
    challenges: String,
    founderStory: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", RegistrationSchema);
