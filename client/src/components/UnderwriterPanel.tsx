import { useEffect, useState } from 'react'
import axios from 'axios'
import { StoredApplication, QualificationDecision } from '../types/insurance'

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

type ActionType = 'accept' | 'deny' | 'rate' | null

function FlaggedAnswers({ data }: { data: StoredApplication['data'] }) {
  const flagged: { label: string; detail: string }[] = []

  if (data.hasPreExistingConditions && data.preExistingConditionsDetails) {
    flagged.push({ label: 'Pre-existing Conditions', detail: data.preExistingConditionsDetails })
  }
  if (data.hasMedication && data.medicationDetails) {
    flagged.push({ label: 'Prescribed Medication', detail: data.medicationDetails })
  }
  if (data.hasSurgeries && data.surgeriesDetails) {
    flagged.push({ label: 'Surgeries / Hospital Treatment', detail: data.surgeriesDetails })
  }
  if (data.hasFamilyHistory && data.familyHistoryDetails) {
    flagged.push({ label: 'Family Medical History', detail: data.familyHistoryDetails })
  }
  if (data.usesVapingOrNicotine) {
    flagged.push({ label: 'Vaping / Nicotine Use', detail: 'Applicant confirmed use of vaping or nicotine substitutes.' })
  }
  if (data.smokingStatus === 'current') {
    flagged.push({ label: 'Current Smoker', detail: 'Applicant is a current smoker.' })
  }
  if (data.usesRecreationalDrugs && data.recreationalDrugsDetails) {
    flagged.push({ label: 'Recreational Drug Use', detail: data.recreationalDrugsDetails })
  }
  if (data.hasHazardousHobbies && data.hazardousHobbiesDetails) {
    flagged.push({ label: 'Hazardous Hobbies', detail: data.hazardousHobbiesDetails })
  }
  if (data.hasExistingCover && data.existingCoverDetails) {
    flagged.push({ label: 'Existing Cover', detail: data.existingCoverDetails })
  }

  if (flagged.length === 0) return null

  return (
    <div className="mb-6">
      <h4 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-3">
        ⚑ Flagged Answers
      </h4>
      <div className="space-y-3">
        {flagged.map((item) => (
          <div key={item.label} className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm font-semibold text-red-700">{item.label}</p>
            <p className="text-sm text-red-800 mt-1">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ApplicationCard({
  application,
  onUpdate
}: {
  application: StoredApplication
  onUpdate: (updated: StoredApplication) => void
}) {
  const [pendingAction, setPendingAction] = useState<ActionType>(null)
  const [rateValue, setRateValue] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [minimised, setMinimised] = useState(false)

  const { data } = application

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      let body: { decision?: QualificationDecision; rate?: number } = {}

      if (pendingAction === 'accept') {
        body = { decision: 'QUALIFY' }
      } else if (pendingAction === 'deny') {
        body = { decision: 'DECLINE' }
      } else if (pendingAction === 'rate') {
        const parsed = parseFloat(rateValue)
        if (isNaN(parsed) || parsed < 0 || parsed > 100) {
          setError('Please enter a valid rate between 0 and 100.')
          setIsSubmitting(false)
          return
        }
        body = { decision: 'QUALIFY', rate: parsed }
      }

      const response = await axios.patch<StoredApplication>(
        `/api/applications/${application.id}`,
        body
      )
      onUpdate(response.data)
      setPendingAction(null)
      setRateValue('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const decisionBadge = (decision: QualificationDecision) => {
    const styles: Record<QualificationDecision, string> = {
      QUALIFY: 'bg-green-100 text-green-700',
      REFER: 'bg-yellow-100 text-yellow-700',
      DECLINE: 'bg-red-100 text-red-700'
    }
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[decision]}`}>
        {decision}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {data.firstName} {data.lastName}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Submitted: {new Date(application.submittedAt).toLocaleString('en-GB')}
          </p>
          {minimised && application.decision === 'REFER' && (
            <p className="text-xs text-yellow-600 font-semibold mt-1">⚑ Action required</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            {decisionBadge(application.decision)}
            {application.rate !== undefined && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Rate: {application.rate}%
              </span>
            )}
            <button
              onClick={() => setMinimised((prev) => !prev)}
              className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded px-2 py-1 transition-colors"
            >
              {minimised ? '▼ Expand' : '▲ Minimise'}
            </button>
          </div>
        </div>
      </div>

      {!minimised && (
        <div className="mt-6 space-y-6">
          <p className="text-sm text-gray-500">{data.email}</p>
          <p className="text-xs text-gray-400 font-mono">{application.id}</p>

          <FlaggedAnswers data={data} />

          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Application Details
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Personal</p>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><dt className="text-gray-500">Date of Birth</dt><dd className="text-gray-800 font-medium">{data.dateOfBirth}</dd></div>
                  <div><dt className="text-gray-500">UK Permanent Resident</dt><dd className="text-gray-800 font-medium">{data.ukPermanentResident ? 'Yes' : 'No'}</dd></div>
                  <div className="md:col-span-2"><dt className="text-gray-500">NI Number</dt><dd className="text-gray-800 font-medium font-mono">{data.nationalInsuranceNumber}</dd></div>
                </dl>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Cover</p>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><dt className="text-gray-500">Cover Type</dt><dd className="text-gray-800 font-medium">{coverTypeLabels[data.coverType]}</dd></div>
                  <div><dt className="text-gray-500">Cover Amount</dt><dd className="text-gray-800 font-medium">£{data.coverAmount.toLocaleString()}</dd></div>
                  {data.coverTermYears && <div><dt className="text-gray-500">Term</dt><dd className="text-gray-800 font-medium">{data.coverTermYears} years</dd></div>}
                  <div className="md:col-span-2"><dt className="text-gray-500">Reason for Cover</dt><dd className="text-gray-800 font-medium">{data.reasonForCover}</dd></div>
                  {data.linkedLiabilityDescription && <div className="md:col-span-2"><dt className="text-gray-500">Linked Liability</dt><dd className="text-gray-800 font-medium">{data.linkedLiabilityDescription}</dd></div>}
                </dl>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Lifestyle</p>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><dt className="text-gray-500">Smoking Status</dt><dd className="text-gray-800 font-medium">{smokingLabels[data.smokingStatus]}</dd></div>
                  <div><dt className="text-gray-500">Alcohol (units/week)</dt><dd className="text-gray-800 font-medium">{data.alcoholUnitsPerWeek}</dd></div>
                </dl>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Occupation</p>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><dt className="text-gray-500">Job Title</dt><dd className="text-gray-800 font-medium">{data.jobTitle}</dd></div>
                  <div><dt className="text-gray-500">Industry</dt><dd className="text-gray-800 font-medium">{data.industry}</dd></div>
                </dl>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Underwriting Reasons</p>
                <ul className="space-y-1">
                  {application.reasons.map((reason, i) => (
                    <li key={i} className="text-sm text-gray-700 bg-gray-50 rounded px-3 py-2">{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {application.decision === 'REFER' && (
            <div className="border-t pt-4">
              {!pendingAction && (
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setPendingAction('accept')}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setPendingAction('deny')}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => setPendingAction('rate')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    Rate
                  </button>
                </div>
              )}

              {pendingAction === 'accept' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 space-y-3">
                  <p className="text-sm font-medium text-green-800">
                    Are you sure you want to <strong>accept</strong> this application? The decision will be updated to QUALIFY.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Accept'}
                    </button>
                    <button
                      onClick={() => { setPendingAction(null); setError(null) }}
                      className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>
              )}

              {pendingAction === 'deny' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 space-y-3">
                  <p className="text-sm font-medium text-red-800">
                    Are you sure you want to <strong>deny</strong> this application? The decision will be updated to DECLINE.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Deny'}
                    </button>
                    <button
                      onClick={() => { setPendingAction(null); setError(null) }}
                      className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>
              )}

              {pendingAction === 'rate' && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 space-y-3">
                  <p className="text-sm font-medium text-blue-800">
                    Enter a rate loading (0–100%) to apply to this application. The decision will be updated to QUALIFY with the specified rate.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={rateValue}
                      onChange={(e) => setRateValue(e.target.value)}
                      placeholder="e.g. 25"
                      className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Rate'}
                    </button>
                    <button
                      onClick={() => { setPendingAction(null); setRateValue(''); setError(null) }}
                      className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>
              )}
            </div>
          )}

          {application.decision !== 'REFER' && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 italic">
                This application has been resolved with decision: <strong>{application.decision}</strong>
                {application.rate !== undefined && ` at a rate of ${application.rate}%`}.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function UnderwriterPanel() {
  const [applications, setApplications] = useState<StoredApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get<StoredApplication[]>('/api/applications')
      const referred = response.data.filter((a) => a.decision === 'REFER')
      setApplications(referred)
    } catch {
      setError('Failed to load applications. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleUpdate = (updated: StoredApplication) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>Loading applications...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600 text-sm">{error}</p>
        <button onClick={fetchApplications} className="text-sm text-red-700 underline mt-2">
          Retry
        </button>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No applications currently require review.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Applications Requiring Review ({applications.length})
        </h2>
        <button
          onClick={fetchApplications}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Refresh
        </button>
      </div>
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  )
}
