import { LifeInsuranceApplication, QualificationDecision } from '../types/insurance'

interface QualificationResult {
  decision: QualificationDecision
  reasons: string[]
}

const MIN_AGE = 18
const MAX_AGE = 70
const MAX_COVER_AMOUNT = 5_000_000
const MAX_TERM_YEARS = 40
const HIGH_COVER_THRESHOLD = 1_000_000
const ALCOHOL_REFER_THRESHOLD = 28 // units per week

function getAgeInYears(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

export function qualifyLifeInsurance(
  application: LifeInsuranceApplication
): QualificationResult {
  const reasons: string[] = []
  let decision: QualificationDecision = 'QUALIFY'

  const escalate = (to: QualificationDecision, reason: string) => {
    reasons.push(reason)
    if (to === 'DECLINE') {
      decision = 'DECLINE'
    } else if (to === 'REFER' && decision !== 'DECLINE') {
      decision = 'REFER'
    }
  }

  // LIF-01: Identity and residency
  if (!application.ukPermanentResident) {
    escalate('DECLINE', 'LIF-01: Applicant is not a UK permanent resident.')
  }

  // LIF-02: Age limits
  const age = getAgeInYears(application.dateOfBirth)
  if (age < MIN_AGE) {
    escalate('DECLINE', `LIF-02: Applicant is under the minimum entry age of ${MIN_AGE}.`)
  } else if (age > MAX_AGE) {
    escalate(
      'REFER',
      `LIF-02: Applicant age ${age} is outside standard product limits. Refer for later-life or specialist product.`
    )
  }

  // LIF-03 / LIF-04: Cover amount and term
  if (application.coverAmount > MAX_COVER_AMOUNT) {
    escalate(
      'REFER',
      `LIF-04: Requested cover amount of £${application.coverAmount.toLocaleString()} exceeds standard limits. Financial justification required.`
    )
  } else if (application.coverAmount > HIGH_COVER_THRESHOLD) {
    escalate(
      'REFER',
      `LIF-04: Requested cover amount of £${application.coverAmount.toLocaleString()} is unusually high. Financial justification required.`
    )
  }

  if (
    application.coverTermYears !== undefined &&
    application.coverTermYears > MAX_TERM_YEARS
  ) {
    escalate(
      'REFER',
      `LIF-04: Requested term of ${application.coverTermYears} years is unusually long. Please review.`
    )
  }

  // LIF-05: Medical history
  if (
    application.hasPreExistingConditions ||
    application.hasMedication ||
    application.hasSurgeries ||
    application.hasFamilyHistory
  ) {
    escalate(
      'REFER',
      'LIF-05: Medical history disclosed. Refer for approved follow-up questions and medical evidence process.'
    )
  }

  // LIF-06: Lifestyle
  if (application.smokingStatus === 'current' || application.usesVapingOrNicotine) {
    escalate(
      'REFER',
      'LIF-06: Current smoker or nicotine/vaping use disclosed. Apply approved smoker criteria.'
    )
  }

  if (application.alcoholUnitsPerWeek > ALCOHOL_REFER_THRESHOLD) {
    escalate(
      'REFER',
      `LIF-06: Alcohol consumption of ${application.alcoholUnitsPerWeek} units per week exceeds standard threshold. Refer for review.`
    )
  }

  if (application.usesRecreationalDrugs) {
    escalate(
      'REFER',
      'LIF-06: Recreational drug use disclosed. Refer for substance-use criteria review.'
    )
  }

  // LIF-07: Hazardous occupation or hobbies
  if (application.hasHazardousHobbies) {
    escalate(
      'REFER',
      'LIF-07: Hazardous hobby disclosed. Confirm frequency, safety controls, and whether exclusion, loading, or specialist product applies.'
    )
  }

  // LIF-08: Existing cover
  if (application.hasExistingCover) {
    const totalCover =
      (application.existingCoverTotalAmount ?? 0) + application.coverAmount
    if (totalCover > HIGH_COVER_THRESHOLD) {
      escalate(
        'REFER',
        `LIF-08: Total cover including existing policies would be £${totalCover.toLocaleString()}. Verify under financial-needs and reinsurance rules.`
      )
    }
  }

  if (decision === 'QUALIFY') {
    reasons.push('All standard underwriting checks passed. Proceed to quote.')
  }

  return { decision, reasons }
}
