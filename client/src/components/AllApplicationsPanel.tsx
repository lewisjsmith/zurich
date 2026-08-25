import { useEffect, useState } from 'react'
import axios from 'axios'
import { StoredApplication, QualificationDecision } from '../types/insurance'

const coverTypeLabels: Record<string, string> = {
  term: 'Term Life',
  whole: 'Whole of Life',
  decreasing: 'Decreasing Term'
}

function DecisionBadge({ decision }: { decision: QualificationDecision }) {
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

export default function AllApplicationsPanel() {
  const [applications, setApplications] = useState<StoredApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get<StoredApplication[]>('/api/applications')
      setApplications(response.data)
    } catch {
      setError('Failed to load applications. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

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
        <p className="text-lg">No applications found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          All Applications ({applications.length})
        </h2>
        <button
          onClick={fetchApplications}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Applicant</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Policy</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cover</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Submitted</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Decision</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">
                    {application.data.firstName} {application.data.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{application.data.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {coverTypeLabels[application.data.coverType]}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  £{application.data.coverAmount.toLocaleString()}
                  {application.data.coverTermYears && (
                    <span className="text-gray-400"> / {application.data.coverTermYears}yr</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(application.submittedAt).toLocaleString('en-GB')}
                </td>
                <td className="px-4 py-3">
                  <DecisionBadge decision={application.decision} />
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {application.rate !== undefined ? `${application.rate}%` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
