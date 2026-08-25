export type PolicyType = 'life'

export type LifeCoverType = 'term' | 'whole' | 'decreasing'

export type QualificationDecision = 'QUALIFY' | 'REFER' | 'DECLINE'

export interface ApplicationResult {
  decision: QualificationDecision
  reasons: string[]
  applicationId: string
}

export interface LifeInsuranceFormData {
  // Personal Details
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  nationalInsuranceNumber: string
  ukPermanentResident: boolean

  // Cover Details
  coverType: LifeCoverType
  coverAmount: number
  coverTermYears?: number
  linkedLiabilityDescription?: string
  reasonForCover: string

  // Medical History
  hasPreExistingConditions: boolean
  preExistingConditionsDetails?: string
  hasMedication: boolean
  medicationDetails?: string
  hasSurgeries: boolean
  surgeriesDetails?: string
  hasFamilyHistory: boolean
  familyHistoryDetails?: string

  // Lifestyle
  smokingStatus: 'never' | 'current' | 'ex'
  usesVapingOrNicotine: boolean
  alcoholUnitsPerWeek: number
  usesRecreationalDrugs: boolean
  recreationalDrugsDetails?: string

  // Occupation & Hobbies
  jobTitle: string
  industry: string
  hasHazardousHobbies: boolean
  hazardousHobbiesDetails?: string

  // Existing Cover
  hasExistingCover: boolean
  existingCoverDetails?: string
  existingCoverTotalAmount?: number
}
