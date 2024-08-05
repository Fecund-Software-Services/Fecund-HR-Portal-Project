/*
Project: Hiring Portal Project
Author: HS
Date: 15/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
5/8/24            HS                      ph2 sp3        minor changes in skillsets
-------------------------------------------------------------------------------------------------------
// */
// skillset
const skillsets = {
    Guidewire: {
      Development: {
        PC: "GW PC DEV",
        CC: "GW CC DEV",
        BC: "GW BC DEV",
      },
      BusinessAnalyst: {
        PC: "GW PC BA",
        CC: "GW CC BA",
        BC: "GW BC BA",
      },
      QualityAssurance: {
        PC: "GW PC QA",
        CC: "GW CC QA",
        BC: "GW BC QA"
      },
      Lead: {
        PC: "GuidewirePCLead",
        CC: "GuidewireCCLead",
        BC: "GuidewireBCLead",
      },
      Other: {
        IntegrationDeveloper: "Guidewire Integration",
        Architect: "Guidewire Architect",
        Portal: "Guidewire Portal",
        Datahub: "Guidewire Datahub",
        Infocentre: "Guidewire Infocentre",
        BackendDeveloper: "Guidewire Backend Developer",
      },
    },
    Oneshield: {
      BusinessAnalyst: "Oneshield BA",
      QualityAssurance: "Oneshield QA",
      Developer: "Oneshield DEV",
      Architect: "Oneshiel dArchitect",
      Lead: "Oneshield Lead",
      Designer: "Oneshield Designer",
    },
    Salesforce: {
      QualityAssurance: "Salesforce QA",
      BusinessAnalyst: "Salesforce BA",
      Developer: "Salesforce DEV",
    },
    Other: {
        BA: "Business Analyst",
        TechnicalSpecialist:  "Technical Specialist",
        Recruitment:  "Recruitment Executive",
        BDE: "Business Development Executive",
        Duckcreek : "Duckcreeek Developer",
        Coldfusion : "Coldfusion Developer", 
        DME : "Digital Marketing Executive",
        Mulesoft : "Mulesoft Developer",
        Scrum : "Scrum Master",
        PL : "Project Lead",
        PowerBI : "PowerBI Developer",
        Devops : "Devops Engineer",
    },
  };

module.exports.skillsets = skillsets;