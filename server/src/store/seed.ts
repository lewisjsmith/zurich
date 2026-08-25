import { applicationStore } from './applicationStore'
import { StoredApplication } from '../types/insurance'

const seedApplications: StoredApplication[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    policyType: 'life',
    submittedAt: '2024-01-15T10:30:00.000Z',
    decision: 'QUALIFY',
    reasons: ['All standard underwriting checks passed. Proceed to quote.'],
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      dateOfBirth: '1985-06-15',
      nationalInsuranceNumber: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      ukPermanentResident: true,
      coverType: 'term',
      coverAmount: 250000,
      coverTermYears: 25,
      reasonForCover: 'To protect my family mortgage and living expenses in the event of my death.',
      hasPreExistingConditions: false,
      hasMedication: false,
      hasSurgeries: false,
      hasFamilyHistory: false,
      smokingStatus: 'never',
      usesVapingOrNicotine: false,
      alcoholUnitsPerWeek: 6,
      usesRecreationalDrugs: false,
      jobTitle: 'Software Engineer',
      industry: 'Technology',
      hasHazardousHobbies: false,
      hasExistingCover: false
    }
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    policyType: 'life',
    submittedAt: '2024-01-16T14:00:00.000Z',
    decision: 'REFER',
    reasons: [
      'LIF-05: Medical history disclosed. Refer for approved follow-up questions and medical evidence process.',
      'LIF-06: Current smoker or nicotine/vaping use disclosed. Apply approved smoker criteria.',
      'LIF-07: Hazardous hobby disclosed. Confirm frequency, safety controls, and whether exclusion, loading, or specialist product applies.'
    ],
    data: {
      firstName: 'Robert',
      lastName: 'Jones',
      email: 'robert.jones@example.com',
      dateOfBirth: '1978-03-22',
      nationalInsuranceNumber: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      ukPermanentResident: true,
      coverType: 'whole',
      coverAmount: 500000,
      reasonForCover: 'Whole of life cover for estate planning purposes.',
      hasPreExistingConditions: true,
      preExistingConditionsDetails: 'Type 2 diabetes, diagnosed 2018, managed with diet and exercise.',
      hasMedication: true,
      medicationDetails: 'Metformin 500mg twice daily for diabetes management.',
      hasSurgeries: false,
      hasFamilyHistory: true,
      familyHistoryDetails: 'Father diagnosed with heart disease at age 58.',
      smokingStatus: 'current',
      usesVapingOrNicotine: true,
      alcoholUnitsPerWeek: 10,
      usesRecreationalDrugs: false,
      jobTitle: 'Construction Site Manager',
      industry: 'Construction',
      hasHazardousHobbies: true,
      hazardousHobbiesDetails: 'Recreational motorcycling, approximately twice a month on weekends. Full safety gear worn at all times.',
      hasExistingCover: true,
      existingCoverDetails: 'Existing term life policy with Aviva, £100,000 benefit, expires 2030.',
      existingCoverTotalAmount: 100000
    }
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    policyType: 'life',
    submittedAt: '2024-01-18T11:45:00.000Z',
    decision: 'REFER',
    reasons: [
      'LIF-05: Medical history disclosed. Refer for approved follow-up questions and medical evidence process.',
      'LIF-06: Alcohol consumption of 32 units per week exceeds standard threshold. Refer for review.',
      'LIF-07: Hazardous hobby disclosed. Confirm frequency, safety controls, and whether exclusion, loading, or specialist product applies.'
    ],
    data: {
      firstName: 'Margaret',
      lastName: 'Clarke',
      email: 'margaret.clarke@example.com',
      dateOfBirth: '1972-11-04',
      nationalInsuranceNumber: 'd4e5f6a7-b8c9-0123-defa-234567890123',
      ukPermanentResident: true,
      coverType: 'decreasing',
      coverAmount: 320000,
      coverTermYears: 18,
      linkedLiabilityDescription: 'Repayment mortgage on primary residence, outstanding balance £310,000, with Nationwide Building Society.',
      reasonForCover: 'To ensure my mortgage is covered and my two children are financially protected if I were to pass away before the term ends.',
      hasPreExistingConditions: true,
      preExistingConditionsDetails: 'Hypothyroidism diagnosed in 2015, currently well managed. Also experienced a bout of depression in 2020, received CBT therapy, fully recovered with no ongoing treatment.',
      hasMedication: true,
      medicationDetails: 'Levothyroxine 75mcg daily for hypothyroidism.',
      hasSurgeries: true,
      surgeriesDetails: 'Appendectomy in 2019, routine procedure, full recovery with no complications.',
      hasFamilyHistory: true,
      familyHistoryDetails: 'Mother diagnosed with breast cancer at age 61, currently in remission. Maternal aunt also had breast cancer at age 55.',
      smokingStatus: 'ex',
      usesVapingOrNicotine: false,
      alcoholUnitsPerWeek: 32,
      usesRecreationalDrugs: false,
      jobTitle: 'Secondary School Teacher',
      industry: 'Education',
      hasHazardousHobbies: true,
      hazardousHobbiesDetails: 'Recreational scuba diving, approximately once a month. PADI Open Water certified, dives to a maximum depth of 18 metres, always dives with a registered club.',
      hasExistingCover: false
    }
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    policyType: 'life',
    submittedAt: '2024-01-17T09:15:00.000Z',
    decision: 'DECLINE',
    reasons: [
      'LIF-02: Applicant is under the minimum entry age of 18.'
    ],
    data: {
      firstName: 'Alex',
      lastName: 'Taylor',
      email: 'alex.taylor@example.com',
      dateOfBirth: '2010-09-01',
      nationalInsuranceNumber: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      ukPermanentResident: true,
      coverType: 'term',
      coverAmount: 100000,
      coverTermYears: 20,
      reasonForCover: 'Income protection for dependants.',
      hasPreExistingConditions: false,
      hasMedication: false,
      hasSurgeries: false,
      hasFamilyHistory: false,
      smokingStatus: 'never',
      usesVapingOrNicotine: false,
      alcoholUnitsPerWeek: 0,
      usesRecreationalDrugs: false,
      jobTitle: 'Student',
      industry: 'Education',
      hasHazardousHobbies: false,
      hasExistingCover: false
    }
  }
]

export function seedStore(): void {
  seedApplications.forEach((application) => {
    applicationStore.save(application)
  })
  console.log(`[seed] Seeded ${seedApplications.length} dummy applications into the store.`)
  console.log('[seed] IDs available to GET:')
  seedApplications.forEach((a) => {
    console.log(`  [${a.decision}] /api/applications/${a.id}`)
  })
}
