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

  const statuses = [
    'Submitted',
    'Scheduled R1',
    'Scheduled R2',
    'Cleared 1st Round',
    'Cleared 2nd Round',
    'Offer Issued',
    'On Hold R1',
    'On Hold R2',
    'Rejected R1',
    'Rejected R2',
    'Offer Withdrawn',
    'Candidate not Interested',
    'Negotiation Stage',
    'Another Offer/Backed out',
    'Other',
  ];

module.exports.skillsets = skillsets;
module.exports.statuses = statuses;