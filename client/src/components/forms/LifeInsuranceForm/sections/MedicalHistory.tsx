import { UseFormRegister, FieldErrors, UseFormWatch, Controller, Control } from 'react-hook-form'
import { LifeInsuranceSchema } from '../schema'

interface Props {
  register: UseFormRegister<LifeInsuranceSchema>
  errors: FieldErrors<LifeInsuranceSchema>
  watch: UseFormWatch<LifeInsuranceSchema>
  control: Control<LifeInsuranceSchema>
}

interface BooleanRadioProps {
  name: keyof LifeInsuranceSchema
  control: Control<LifeInsuranceSchema>
  error?: string
}

function BooleanRadioGroup({ name, control, error }: BooleanRadioProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600"
                checked={field.value === false}
                onChange={() => field.onChange(false)}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  )
}

export default function MedicalHistory({ register, errors, watch, control }: Props) {
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
          <BooleanRadioGroup
            name="hasPreExistingConditions"
            control={control}
            error={errors.hasPreExistingConditions?.message}
          />
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
          <BooleanRadioGroup
            name="hasMedication"
            control={control}
            error={errors.hasMedication?.message}
          />
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
          <BooleanRadioGroup
            name="hasSurgeries"
            control={control}
            error={errors.hasSurgeries?.message}
          />
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
          <BooleanRadioGroup
            name="hasFamilyHistory"
            control={control}
            error={errors.hasFamilyHistory?.message}
          />
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
