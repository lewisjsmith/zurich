import { useState, useEffect } from 'react'
import PolicySelector from './components/PolicySelector'
import LifeInsuranceForm from './components/forms/LifeInsuranceForm'
import UnderwriterPanel from './components/UnderwriterPanel'
import AllApplicationsPanel from './components/AllApplicationsPanel'
import ApplicationStatusPage from './components/ApplicationStatusPage'
import { PolicyType } from './types/insurance'

type Tab = 'apply' | 'underwriter' | 'all'

function getStatusIdFromUrl(): string | null {
  const match = window.location.pathname.match(/^\/status\/([a-f0-9-]+)$/i)
  return match ? match[1] : null
}

export default function App() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('apply')
  const [statusId, setStatusId] = useState<string | null>(getStatusIdFromUrl)

  useEffect(() => {
    const handlePopState = () => {
      setStatusId(getStatusIdFromUrl())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (statusId) {
    return <ApplicationStatusPage applicationId={statusId} />
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'apply', label: 'Apply' },
    { id: 'underwriter', label: 'Underwriter Review' },
    { id: 'all', label: 'All Applications' }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Insurance Application</h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete the form below to apply for cover. All fields marked with{' '}
            <span className="text-red-500">*</span> are required.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex gap-0 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {activeTab === 'apply' && (
          <>
            <PolicySelector selected={selectedPolicy} onChange={setSelectedPolicy} />
            {selectedPolicy === 'life' && <LifeInsuranceForm />}
            {!selectedPolicy && (
              <div className="text-center text-gray-400 py-12">
                <p className="text-lg">Please select a policy type above to begin your application.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'underwriter' && <UnderwriterPanel />}

        {activeTab === 'all' && <AllApplicationsPanel />}
      </main>
    </div>
  )
}
