export type StepKey =
  | "coreIdentity"
  | "problem"
  | "audience"
  | "program"
  | "budget"
  | "impact"
  | "visibility"
  | "branding"
  | "partnerships"
  | "legalRisk"
  | "vision";

export type DataModel = {
  coreIdentity: {
    officialName: string;
    legalForm: string;
    founders: string;
    instructors: string;
    instructorCertifications: string;
    yearsOperating: string;
    previousExpeditionsHistory: string;
  };
  problem: {
    womenPercent: string;
    barriers: string;
    safetyGaps: string;
    mediaVisibilityGap: string;
    evidenceLinks: string;
  };
  audience: {
    ageRange: string;
    level: string;
    urbanRural: string;
    studentProfessional: string;
    womenPerYear: string;
  };
  program: {
    duration: string;
    trainingDaysPerMonth: string;
    indoorOutdoor: string;
    highAltitudeComponent: string;
    finalExpeditionGoal: string;
    safetyProtocols: string;
  };
  budget: {
    equipmentListWithQty: string;
    operationalCosts: string;
    mediaProduction: string;
    emergencyReserve: string;
    totalEstimate: string;
    sponsorshipTiers: string;
  };
  impact: {
    metricsList: string;
    targets: string;
    howToMeasure: string;
    reportingCadence: string;
  };
  visibility: {
    instagram: string;
    website: string;
    logoBranding: string;
    photoVideoAssets: string;
    pressContacts: string;
    sponsorBenefitsList: string;
    contentPlan: string;
  };
  branding: {
    brandEssence: string;
    targetFeeling: string;
    brandPersonality: string;
    primaryColors: string;
    secondaryColors: string;
    logoFiles: string;
    typography: string;
    logoUsageRules: string;
    visualStyle: string;
    voiceTone: string;
    mandatoryAssets: string;
  };
  partnerships: {
    localGuides: string;
    rescueServices: string;
    federations: string;
    womenNGOs: string;
    universities: string;
    outdoorShops: string;
    statusNotes: string;
  };
  legalRisk: {
    waivers: string;
    insurance: string;
    emergencyProtocol: string;
    certifiedInstructors: string;
    riskMitigation: string;
  };
  vision: {
    oneSeasonVsAnnual: string;
    expansionPlan: string;
    futureExpeditionTeam: string;
    sustainabilityPlan: string;
  };
};
