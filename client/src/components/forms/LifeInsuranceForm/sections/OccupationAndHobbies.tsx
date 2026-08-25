import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { LifeInsuranceSchema } from '../schema'

interface Props {
  register: UseFormRegister<LifeInsuranceSchema>
  errors: FieldErrors<LifeInsuranceSchema>
  watch: UseFormWatch<LifeInsuranceSchema>
}

export default function OccupationAndHobbies({ register, errors, watch }: Props) {
  const hasHazardousHobbies = watch('hasHazardousHobbies')

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Occupation & Hobbies</h2>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register('jobTitle')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Software Engineer"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry <span className="text-red-500">*</span>
            </label>
            <input
              {...register('industry')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Technology"
            />
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you participate in any hazardous hobbies or activities?{' '}
            <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Examples include skydiving, motorcycling, mountaineering, scuba diving, or motor racing.
          </p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('hasHazardousHobbies', {
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
                {...register('hasHazardousHobbies', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {hasHazardousHobbies && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please provide details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('hazardousHobbiesDetails')}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe the activity, how often you participate, and any safety qualifications or equipment used"
              />
              {errors.hazardousHobbiesDetails && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.hazardousHobbiesDetails.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
