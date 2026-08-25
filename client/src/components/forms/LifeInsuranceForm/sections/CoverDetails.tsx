import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { LifeInsuranceSchema } from '../schema'

interface Props {
  register: UseFormRegister<LifeInsuranceSchema>
  errors: FieldErrors<LifeInsuranceSchema>
  watch: UseFormWatch<LifeInsuranceSchema>
}

export default function CoverDetails({ register, errors, watch }: Props) {
  const coverType = watch('coverType')

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cover Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('coverType')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select cover type</option>
            <option value="term">Term Life</option>
            <option value="whole">Whole of Life</option>
            <option value="decreasing">Decreasing Term</option>
          </select>
          {errors.coverType && (
            <p className="text-red-500 text-sm mt-1">{errors.coverType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Amount (£) <span className="text-red-500">*</span>
          </label>
          <input
            {...register('coverAmount', { valueAsNumber: true })}
            type="number"
            min={0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="250000"
          />
          {errors.coverAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.coverAmount.message}</p>
          )}
        </div>

        {(coverType === 'term' || coverType === 'decreasing') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Term (years) <span className="text-red-500">*</span>
            </label>
            <input
              {...register('coverTermYears', { valueAsNumber: true })}
              type="number"
              min={1}
              max={50}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="25"
            />
            {errors.coverTermYears && (
              <p className="text-red-500 text-sm mt-1">{errors.coverTermYears.message}</p>
            )}
          </div>
        )}

        {coverType === 'decreasing' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Linked Liability Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('linkedLiabilityDescription')}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Repayment mortgage on primary residence, outstanding balance £200,000"
            />
            {errors.linkedLiabilityDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.linkedLiabilityDescription.message}
              </p>
            )}
          </div>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Cover <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('reasonForCover')}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. To protect my family's mortgage and living expenses in the event of my death"
          />
          {errors.reasonForCover && (
            <p className="text-red-500 text-sm mt-1">{errors.reasonForCover.message}</p>
          )}
        </div>
      </div>
    </section>
  )
}
