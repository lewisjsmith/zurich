import { useEffect, useState } from 'react'
import axios from 'axios'
import { QualificationDecision } from '../types/insurance'

interface ApplicationStatus {
  applicationId: string
  applicant: string
  submittedAt: string
  policyType: string
  decision: QualificationDecision
  decisionLabel: string
  rateLoading?: string
  reasons: string[]
}

interface Props {
  applicationId: string
}

export default function ApplicationStatusPage({ applicationId }: Props) {
  const [status, setStatus] = useState<ApplicationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axios.get<ApplicationStatus>(
          `/api/applications/${applicationId}/status`
        )
        setStatus(response.data)
      } catch {
        setError('We could not find an application with that ID. Please check the link and try again.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchStatus()
  }, [applicationId])

  const decisionConfig: Record<
    QualificationDecision,
    { icon: string; iconColour: string; heading: string; message: string; bannerColour: string }
  > = {
    QUALIFY: {
      icon: '✓',
      iconColour: 'text-green-500',
      heading: 'Application Approved',
      message: 'Your application has been approved. We will be in touch shortly with your personalised quote.',
      bannerColour: 'bg-green-50 border-green-200'
    },
    REFER: {
      icon: '⏳',
      iconColour: 'text-yellow-500',
      heading: 'Application Under Review',
      message: 'Your application has been forwarded for further review. You will be contacted using the email provided in due course.',
      bannerColour: 'bg-yellow-50 border-yellow-200'
    },
    DECLINE: {
      icon: '✗',
      iconColour: 'text-red-500',
      heading: 'Application Unsuccessful',
      message: 'Based on the answers you provided you do not qualify for this policy. Please contact 0800 123 4567 for further consultation.',
      bannerColour: 'bg-red-50 border-red-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Insurance Application</h1>
          <p className="text-sm text-gray-500 mt-1">Application Status</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {isLoading && (
          <div className="text-center py-16 text-gray-400">
            <p>Loading your application status...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-500 text-4xl mb-3">✗</div>
            <h2 className="text-lg font-semibold text-red-800 mb-2">Application Not Found</h2>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {status && (
          <div className="bg-white rounded-lg shadow p-8 space-y-6">
            <div className="text-center">
              <div className={`text-5xl mb-4 ${decisionConfig[status.decision].iconColour}`}>
                {decisionConfig[status.decision].icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {decisionConfig[status.decision].heading}
              </h2>
              <p className="text-gray-600">
                {decisionConfig[status.decision].message}
              </p>
              {status.rateLoading && (
                <p className="mt-2 text-sm text-blue-700 font-medium">
                  Rate loading applied: {status.rateLoading}
                </p>
              )}
            </div>

            <div className={`border rounded-lg p-4 ${decisionConfig[status.decision].bannerColour}`}>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">Applicant</dt>
                  <dd className="text-gray-800 font-medium">{status.applicant}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Policy Type</dt>
                  <dd className="text-gray-800 font-medium capitalize">{status.policyType} insurance</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Submitted</dt>
                  <dd className="text-gray-800 font-medium">
                    {new Date(status.submittedAt).toLocaleString('en-GB')}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Decision</dt>
                  <dd className="text-gray-800 font-medium">{status.decisionLabel}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-gray-500">Application ID</dt>
                  <dd className="text-gray-800 font-medium font-mono text-xs">{status.applicationId}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Underwriting Notes
              </h3>
              <ul className="space-y-2">
                {status.reasons.map((reason, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 bg-gray-50 rounded px-3 py-2"
                  >
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
