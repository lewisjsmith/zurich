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

function SubmittedSummary({ data }: { data: LifeInsuranceSchema }) {
  const coverTypeLabels: Record<string, string> = {
    term: 'Term Life',
    whole: 'Whole of Life',
    decreasing: 'Decreasing Term'
  }

  const smokingLabels: Record<string, string> = {
    never: 'Never smoked',
    current: 'Current smoker',
    ex: 'Ex-smoker'
  }

  return (
    <div className="mt-8 text-left border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Submitted Information</h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Personal Details</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div><dt className="text-gray-500">First Name</dt><dd className="text-gray-800 font-medium">{data.firstName}</dd></div>
            <div><dt className="text-gray-500">Last Name</dt><dd className="text-gray-800 font-medium">{data.lastName}</dd></div>
            <div><dt className="text-gray-500">Email</dt><dd className="text-gray-800 font-medium">{data.email}</dd></div>
            <div><dt className="text-gray-500">Date of Birth</dt><dd className="text-gray-800 font-medium">{data.dateOfBirth}</dd></div>
            <div className="md:col-span-2"><dt className="text-gray-500">National Insurance Number</dt><dd className="text-gray-800 font-medium font-mono">{data.nationalInsuranceNumber}</dd></div>
            <div><dt className="text-gray-500">UK Permanent Resident</dt><dd className="text-gray-800 font-medium">{data.ukPermanentResident ? 'Yes' : 'No'}</dd></div>
          </dl>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Cover Details</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div><dt className="text-gray-500">Cover Type</dt><dd className="text-gray-800 font-medium">{coverTypeLabels[data.coverType]}</dd></div>
            <div><dt className="text-gray-500">Cover Amount</dt><dd className="text-gray-800 font-medium">£{data.coverAmount.toLocaleString()}</dd></div>
            {data.coverTermYears && <div><dt className="text-gray-500">Cover Term</dt><dd className="text-gray-800 font-medium">{data.coverTermYears} years</dd></div>}
            {data.linkedLiabilityDescription && <div className="md:col-span-2"><dt className="text-gray-500">Linked Liability</dt><dd className="text-gray-800 font-medium">{data.linkedLiabilityDescription}</dd></div>}
            <div className="md:col-span-2"><dt className="text-gray-500">Reason for Cover</dt><dd className="text-gray-800 font-medium">{data.reasonForCover}</dd></div>
          </dl>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Medical History</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div><dt className="text-gray-500">Pre-existing Conditions</dt><dd className="text-gray-800 font-medium">{data.hasPreExistingConditions ? 'Yes' : 'No'}</dd></div>
            {data.preExistingConditionsDetails && <div className="md:col-span-2"><dt className="text-gray-500">Conditions Detail</dt><dd className="text-gray-800 font-medium">{data.preExistingConditionsDetails}</dd></div>}
            <div><dt className="text-gray-500">Prescribed Medication</dt><dd className="text-gray-800 font-medium">{data.hasMedication ? 'Yes' : 'No'}</dd></div>
            {data.medicationDetails && <div className="md:col-span-2"><dt className="text-gray-500">Medication Detail</dt><dd className="text-gray-800 font-medium">{data.medicationDetails}</dd></div>}
            <div><dt className="text-gray-500">Surgeries or Hospital Treatment</dt><dd className="text-gray-800 font-medium">{data.hasSurgeries ? 'Yes' : 'No'}</dd></div>
            {data.surgeriesDetails && <div className="md:col-span-2"><dt className="text-gray-500">Surgery Detail</dt><dd className="text-gray-800 font-medium">{data.surgeriesDetails}</dd></div>}
            <div><dt className="text-gray-500">Family Medical History</dt><dd className="text-gray-800 font-medium">{data.hasFamilyHistory ? 'Yes' : 'No'}</dd></div>
            {data.familyHistoryDetails && <div className="md:col-span-2"><dt className="text-gray-500">Family History Detail</dt><dd className="text-gray-800 font-medium">{data.familyHistoryDetails}</dd></div>}
          </dl>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Lifestyle</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div><dt className="text-gray-500">Smoking Status</dt><dd className="text-gray-800 font-medium">{smokingLabels[data.smokingStatus]}</dd></div>
            <div><dt className="text-gray-500">Vaping or Nicotine Use</dt><dd className="text-gray-800 font-medium">{data.usesVapingOrNicotine ? 'Yes' : 'No'}</dd></div>
            <div><dt className="text-gray-500">Alcohol (units/week)</dt><dd className="text-gray-800 font-medium">{data.alcoholUnitsPerWeek}</dd></div>
            <div><dt className="text-gray-500">Recreational Drug Use</dt><dd className="text-gray-800 font-medium">{data.usesRecreationalDrugs ? 'Yes' : 'No'}</dd></div>
            {data.recreationalDrugsDetails && <div className="md:col-span-2"><dt className="text-gray-500">Drug Use Detail</dt><dd className="text-gray-800 font-medium">{data.recreationalDrugsDetails}</dd></div>}
          </dl>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Occupation & Hobbies</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div><dt className="text-gray-500">Job Title</dt><dd className="text-gray-800 font-medium">{data.jobTitle}</dd></div>
            <div><dt className="text-gray-500">Industry</dt><dd className="text-gray-800 font-medium">{data.industry}</dd></div>
            <div><dt className="text-gray-500">Hazardous Hobbies</dt><dd className="text-gray-800 font-medium">{data.hasHazardousHobbies ? 'Yes' : 'No'}</dd></div>
            {data.hazardousHobbiesDetails && <div className="md:col-span-2"><dt className="text-gray-500">Hobbies Detail</dt><dd className="text-gray-800 font-medium">{data.hazardousHobbiesDetails}</dd></div>}
          </dl>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Existing Cover</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div><dt className="text-gray-500">Existing Policies</dt><dd className="text-gray-800 font-medium">{data.hasExistingCover ? 'Yes' : 'No'}</dd></div>
            {data.existingCoverDetails && <div className="md:col-span-2"><dt className="text-gray-500">Existing Cover Detail</dt><dd className="text-gray-800 font-medium">{data.existingCoverDetails}</dd></div>}
            {data.existingCoverTotalAmount && <div><dt className="text-gray-500">Total Existing Cover</dt><dd className="text-gray-800 font-medium">£{data.existingCoverTotalAmount.toLocaleString()}</dd></div>}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default function LifeInsuranceForm() {
  const [result, setResult] = useState<ApplicationResult | null>(null)
  const [submittedData, setSubmittedData] = useState<LifeInsuranceSchema | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    control,
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

  const onFirstSubmit = () => {
    setAwaitingConfirmation(true)
  }

  const onConfirmedSubmit = async (data: LifeInsuranceSchema) => {
    if (!awaitingConfirmation) {
      setAwaitingConfirmation(true)
      return
    }
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const response = await axios.post<ApplicationResult>('/api/applications', {
        policyType: 'life',
        ...data
      })
      setSubmittedData(data)
      setResult(response.data)
    } catch {
      setSubmitError('Something went wrong submitting your application. Please try again.')
      setAwaitingConfirmation(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (result && submittedData) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          {result.decision === 'QUALIFY' && (
            <>
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Successful</h2>
              <p className="text-gray-600">
                Your application has been approved. We will be in touch shortly with your
                personalised quote.
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
                Based on the answers you provided you do not qualify for this policy. Please
                contact{' '}
                <span className="font-semibold text-gray-800">{CONTACT_NUMBER}</span> for further
                consultation.
              </p>
            </>
          )}
          <p className="text-xs text-gray-400 mt-4">Application ID: {result.applicationId}</p>
        </div>

        <SubmittedSummary data={submittedData} />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onConfirmedSubmit)} noValidate className="space-y-6">
      <PersonalDetails register={register} errors={errors} />
      <CoverDetails register={register} errors={errors} watch={watch} />
      <MedicalHistory register={register} errors={errors} watch={watch} control={control} />
      <LifestyleDetails register={register} errors={errors} watch={watch} control={control} />
      <OccupationAndHobbies register={register} errors={errors} watch={watch} control={control} />
      <ExistingCover register={register} errors={errors} watch={watch} control={control} />

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}

      {awaitingConfirmation && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800 text-sm font-medium">
            Please ensure all the information you have provided is correct before confirming your
            submission.
          </p>
        </div>
      )}

      <div className="flex justify-end pb-8">
        <button
          type={awaitingConfirmation ? 'submit' : 'button'}
          onClick={awaitingConfirmation ? undefined : handleSubmit(onFirstSubmit)}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Submitting...' : awaitingConfirmation ? 'Confirm & Submit' : 'Submit Application'}
        </button>
      </div>
    </form>
  )
}
