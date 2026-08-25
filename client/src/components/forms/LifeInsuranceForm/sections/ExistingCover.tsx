import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { LifeInsuranceSchema } from '../schema'

interface Props {
  register: UseFormRegister<LifeInsuranceSchema>
  errors: FieldErrors<LifeInsuranceSchema>
  watch: UseFormWatch<LifeInsuranceSchema>
}

export default function ExistingCover({ register, errors, watch }: Props) {
  const hasExistingCover = watch('hasExistingCover')

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Cover</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you currently hold any other life insurance policies?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('hasExistingCover', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="true"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('hasExistingCover', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>

          {hasExistingCover && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please provide details of existing policies{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('existingCoverDetails')}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please list the insurer, policy type, and benefit amount for each existing policy"
                />
                {errors.existingCoverDetails && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.existingCoverDetails.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total existing cover amount (£) <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('existingCoverTotalAmount', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 150000"
                />
                {errors.existingCoverTotalAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.existingCoverTotalAmount.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
