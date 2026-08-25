import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'
import { lifeInsuranceSchema, LifeInsuranceSchema } from './schema'
import PersonalDetails from './sections/PersonalDetails'
import CoverDetails from './sections/CoverDetails'
import MedicalHistory from './sections/MedicalHistory'
import LifestyleDetails from './sections/LifestyleDetails'
import OccupationAndHobbies from './sections/OccupationAndHobbies'
import ExistingCover from './sections/ExistingCover'
import { ApplicationResult } from '../../../types/insurance'

const CONTACT_NUMBER = '0800 123 4567'

export default function LifeInsuranceForm() {
  const [result, setResult] = useState<ApplicationResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LifeInsuranceSchema>({
    resolver: zodResolver(lifeInsuranceSchema),
    defaultValues: {
      hasPreExistingConditions: false,
      hasMedication: false,
      hasSurgeries: false,
      hasFamilyHistory: false,
      usesVapingOrNicotine: false,
      usesRecreationalDrugs: false,
      hasHazardousHobbies: false,
      hasExistingCover: false,
      ukPermanentResident: false,
      alcoholUnitsPerWeek: 0
    }
  })

  const onSubmit = async (data: LifeInsuranceSchema) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const response = await axios.post<ApplicationResult>('/api/applications', {
        policyType: 'life',
        ...data
      })
      setResult(response.data)
    } catch {
      setSubmitError('Something went wrong submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-lg shadow text-center">
        {result.decision === 'QUALIFY' && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Successful</h2>
            <p className="text-gray-600">
              Your application has been approved. We will be in touch shortly with your personalised
              quote.
            </p>
          </>
        )}
        {result.decision === 'REFER' && (
          <>
            <div className="text-yellow-500 text-5xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Under Review</h2>
            <p className="text-gray-600">
              Your application has been forwarded for further review, you will be contacted using
              the email provided in due course.
            </p>
          </>
        )}
        {result.decision === 'DECLINE' && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Unsuccessful</h2>
            <p className="text-gray-600">
              Based on the answers you provided you do not qualify for this policy. Please contact{' '}
              <span className="font-semibold text-gray-800">{CONTACT_NUMBER}</span> for further
              consultation.
            </p>
          </>
        )}
        <p className="text-xs text-gray-400 mt-6">Application ID: {result.applicationId}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <PersonalDetails register={register} errors={errors} />
      <CoverDetails register={register} errors={errors} watch={watch} />
      <MedicalHistory register={register} errors={errors} watch={watch} />
      <LifestyleDetails register={register} errors={errors} watch={watch} />
      <OccupationAndHobbies register={register} errors={errors} watch={watch} />
      <ExistingCover register={register} errors={errors} watch={watch} />

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}

      <div className="flex justify-end pb-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  )
}
