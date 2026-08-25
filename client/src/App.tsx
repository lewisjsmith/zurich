import { useState } from 'react'
import PolicySelector from './components/PolicySelector'
import LifeInsuranceForm from './components/forms/LifeInsuranceForm'
import { PolicyType } from './types/insurance'

export default function App() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType | null>(null)

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
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <PolicySelector selected={selectedPolicy} onChange={setSelectedPolicy} />

        {selectedPolicy === 'life' && <LifeInsuranceForm />}

        {!selectedPolicy && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">Please select a policy type above to begin your application.</p>
          </div>
        )}
      </main>
    </div>
  )
}
