import { PolicyType } from '../types/insurance'

interface Props {
  selected: PolicyType | null
  onChange: (policy: PolicyType) => void
}

const POLICIES: { value: PolicyType; label: string; description: string }[] = [
  {
    value: 'life',
    label: 'Life Insurance',
    description:
      'Provides a lump sum payment to your beneficiaries in the event of your death during the policy term.'
  }
]

export default function PolicySelector({ selected, onChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Policy Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {POLICIES.map((policy) => (
          <button
            key={policy.value}
            type="button"
            onClick={() => onChange(policy.value)}
            className={`text-left p-4 rounded-lg border-2 transition-colors ${
              selected === policy.value
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <p className="font-semibold text-gray-800">{policy.label}</p>
            <p className="text-sm text-gray-500 mt-1">{policy.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
