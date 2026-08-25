import { z } from 'zod'

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const lifeInsuranceSchema = z
  .object({
    // Personal Details
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('A valid email address is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    nationalInsuranceNumber: z
      .string()
      .regex(UUID_REGEX, 'National Insurance Number must be a valid UUID format'),
    ukPermanentResident: z.boolean().refine((v) => v === true, {
      message: 'You must be a UK permanent resident to apply'
    }),

    // Cover Details
    coverType: z.enum(['term', 'whole', 'decreasing'], {
      required_error: 'Please select a cover type'
    }),
    coverAmount: z
      .number({ invalid_type_error: 'Cover amount is required' })
      .positive('Cover amount must be greater than 0'),
    coverTermYears: z.number().positive().optional(),
    linkedLiabilityDescription: z.string().optional(),
    reasonForCover: z.string().min(1, 'Please provide a reason for cover'),

    // Medical History
    hasPreExistingConditions: z.boolean(),
    preExistingConditionsDetails: z.string().optional(),
    hasMedication: z.boolean(),
    medicationDetails: z.string().optional(),
    hasSurgeries: z.boolean(),
    surgeriesDetails: z.string().optional(),
    hasFamilyHistory: z.boolean(),
    familyHistoryDetails: z.string().optional(),

    // Lifestyle
    smokingStatus: z.enum(['never', 'current', 'ex'], {
      required_error: 'Please select a smoking status'
    }),
    usesVapingOrNicotine: z.boolean(),
    alcoholUnitsPerWeek: z
      .number({ invalid_type_error: 'Please enter alcohol units per week' })
      .min(0, 'Cannot be negative'),
    usesRecreationalDrugs: z.boolean(),
    recreationalDrugsDetails: z.string().optional(),

    // Occupation & Hobbies
    jobTitle: z.string().min(1, 'Job title is required'),
    industry: z.string().min(1, 'Industry is required'),
    hasHazardousHobbies: z.boolean(),
    hazardousHobbiesDetails: z.string().optional(),

    // Existing Cover
    hasExistingCover: z.boolean(),
    existingCoverDetails: z.string().optional(),
    existingCoverTotalAmount: z.number().positive().optional()
  })
  .superRefine((data, ctx) => {
    if (data.coverType === 'term' && !data.coverTermYears) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Term length is required for term life cover',
        path: ['coverTermYears']
      })
    }
    if (data.coverType === 'decreasing' && !data.linkedLiabilityDescription) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please describe the linked liability for decreasing cover',
        path: ['linkedLiabilityDescription']
      })
    }
    if (data.hasPreExistingConditions && !data.preExistingConditionsDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide details of your pre-existing conditions',
        path: ['preExistingConditionsDetails']
      })
    }
    if (data.hasMedication && !data.medicationDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide details of your medication',
        path: ['medicationDetails']
      })
    }
    if (data.hasSurgeries && !data.surgeriesDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide details of your surgeries',
        path: ['surgeriesDetails']
      })
    }
    if (data.hasFamilyHistory && !data.familyHistoryDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide details of your family medical history',
        path: ['familyHistoryDetails']
      })
    }
    if (data.usesRecreationalDrugs && !data.recreationalDrugsDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide details of recreational drug use',
        path: ['recreationalDrugsDetails']
      })
    }
    if (data.hasHazardousHobbies && !data.hazardousHobbiesDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide details of your hazardous hobbies',
        path: ['hazardousHobbiesDetails']
      })
    }
    if (data.hasExistingCover && !data.existingCoverDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide details of your existing cover',
        path: ['existingCoverDetails']
      })
    }
    if (data.hasExistingCover && !data.existingCoverTotalAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide the total amount of your existing cover',
        path: ['existingCoverTotalAmount']
      })
    }
  })

export type LifeInsuranceSchema = z.infer<typeof lifeInsuranceSchema>
