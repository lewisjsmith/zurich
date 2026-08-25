import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { LifeInsuranceSchema } from '../schema'

interface Props {
  register: UseFormRegister<LifeInsuranceSchema>
  errors: FieldErrors<LifeInsuranceSchema>
  watch: UseFormWatch<LifeInsuranceSchema>
}

function YesNoField({
  label,
  fieldName,
  register,
  errors
}: {
  label: string
  fieldName: keyof LifeInsuranceSchema
  register: UseFormRegister<LifeInsuranceSchema>
  errors: FieldErrors<LifeInsuranceSchema>
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register(fieldName as never)}
            type="radio"
            value="true"
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Yes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register(fieldName as never)}
            type="radio"
            value="false"
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">No</span>
        </label>
      </div>
      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  )
}

export default function MedicalHistory({ register, errors, watch }: Props) {
  const hasPreExistingConditions = watch('hasPreExistingConditions')
  const hasMedication = watch('hasMedication')
  const hasSurgeries = watch('hasSurgeries')
  const hasFamilyHistory = watch('hasFamilyHistory')

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Medical History</h2>
      <p className="text-sm text-gray-500 mb-4">
        All information is treated in strict confidence and used solely for underwriting purposes.
      </p>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have any pre-existing medical conditions? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('hasPreExistingConditions', {
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
                {...register('hasPreExistingConditions', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {hasPreExistingConditions && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please provide details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('preExistingConditionsDetails')}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe your conditions, when diagnosed, and any ongoing treatment"
              />
              {errors.preExistingConditionsDetails && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preExistingConditionsDetails.message}
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you currently taking any prescribed medication? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('hasMedication', {
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
                {...register('hasMedication', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {hasMedication && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please list your medications <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('medicationDetails')}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please list medication names, dosages, and the conditions they are prescribed for"
              />
              {errors.medicationDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.medicationDetails.message}</p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you had any surgeries or hospital treatment in the last 5 years?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('hasSurgeries', {
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
                {...register('hasSurgeries', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {hasSurgeries && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please provide details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('surgeriesDetails')}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe the surgery or treatment, date, and outcome"
              />
              {errors.surgeriesDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.surgeriesDetails.message}</p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have a family history of serious illness (e.g. heart disease, cancer, diabetes)?{' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('hasFamilyHistory', {
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
                {...register('hasFamilyHistory', {
                  setValueAs: (v) => v === 'true' || v === true
                })}
                type="radio"
                value="false"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {hasFamilyHistory && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please provide details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('familyHistoryDetails')}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe the condition, which family member, and their age at diagnosis"
              />
              {errors.familyHistoryDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.familyHistoryDetails.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
