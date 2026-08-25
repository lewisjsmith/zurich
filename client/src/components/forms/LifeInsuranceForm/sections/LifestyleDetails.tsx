import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { LifeInsuranceSchema } from '../schema'

interface Props {
  register: UseFormRegister<LifeInsuranceSchema>
  errors: FieldErrors<LifeInsuranceSchema>
  watch: UseFormWatch<LifeInsuranceSchema>
}

export default function LifestyleDetails({ register, errors, watch }: Props) {
  const usesRecreationalDrugs = watch('usesRecreationalDrugs')

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lifestyle</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Smoking Status <span className="text-red-500">*</span>
          </label>
          <select
            {...register('smokingStatus')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select status</option>
            <option value="never">Never smoked</option>
            <option value="current">Current smoker</option>
            <option value="ex">Ex-smoker</option>
          </select>
          {errors.smokingStatus && (
            <p className="text-red-500 text-sm mt-1">{errors.smokingStatus.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you currently use vaping products or nicotine substitutes?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('usesVapingOrNicotine', {
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
                {...register('usesVapingOrNicotine', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {errors.usesVapingOrNicotine && (
            <p className="text-red-500 text-sm mt-1">{errors.usesVapingOrNicotine.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alcohol consumption (units per week) <span className="text-red-500">*</span>
          </label>
          <input
            {...register('alcoholUnitsPerWeek', { valueAsNumber: true })}
            type="number"
            min={0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 14"
          />
          <p className="text-xs text-gray-500 mt-1">
            A unit is approximately half a pint of beer, a small glass of wine, or a single measure of spirits.
          </p>
          {errors.alcoholUnitsPerWeek && (
            <p className="text-red-500 text-sm mt-1">{errors.alcoholUnitsPerWeek.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you used recreational drugs in the last 5 years?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('usesRecreationalDrugs', {
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
                {...register('usesRecreationalDrugs', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {usesRecreationalDrugs && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please provide details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('recreationalDrugsDetails')}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe the substances used, frequency, and whether you are currently using"
              />
              {errors.recreationalDrugsDetails && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.recreationalDrugsDetails.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
