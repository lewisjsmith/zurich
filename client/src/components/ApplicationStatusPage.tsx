import { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import { QualificationDecision, StoredApplication } from '../types/insurance'

interface ApplicationStatus {
  applicationId: string
  applicant: string
  submittedAt: string
  policyType: string
  decision: QualificationDecision
  decisionLabel: string
  rateLoading?: string
  reasons: string[]
}

interface Props {
  applicationId: string
}

const coverTypeLabels: Record<string, string> = {
  term: 'Term Life',
  whole: 'Whole of Life',
  decreasing: 'Decreasing Term'
}

const smokingLabels: Record<string, string> = {
  never: 'Never smoked',
  current: 'Current smoker',
  ex: 'Ex-smoker'
}

function generatePDF(status: ApplicationStatus, full: StoredApplication) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 20

  const checkPageBreak = (needed: number = 10) => {
    if (y + needed > 275) {
      doc.addPage()
      y = 20
    }
  }

  const drawLine = () => {
    checkPageBreak(6)
    doc.setDrawColor(220, 220, 220)
    doc.line(margin, y, pageWidth - margin, y)
    y += 6
  }

  const sectionHeading = (text: string) => {
    checkPageBreak(12)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(100, 100, 100)
    doc.text(text.toUpperCase(), margin, y)
    y += 6
  }

  const field = (label: string, value: string) => {
    checkPageBreak(10)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120, 120, 120)
    doc.text(label, margin, y)
    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'bold')
    const lines = doc.splitTextToSize(value, contentWidth - 60)
    doc.text(lines, margin + 65, y)
    y += lines.length * 5 + 3
  }

  // Header
  doc.setFillColor(37, 99, 235)
  doc.rect(0, 0, pageWidth, 28, 'F')
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('Insurance Application', margin, 13)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Application Summary & Decision', margin, 21)
  y = 38

  // Decision banner
  const decisionColours: Record<QualificationDecision, [number, number, number]> = {
    QUALIFY: [220, 252, 231],
    REFER: [254, 249, 195],
    DECLINE: [254, 226, 226]
  }
  const decisionTextColours: Record<QualificationDecision, [number, number, number]> = {
    QUALIFY: [22, 101, 52],
    REFER: [133, 77, 14],
    DECLINE: [153, 27, 27]
  }
  const [br, bg, bb] = decisionColours[status.decision]
  const [tr, tg, tb] = decisionTextColours[status.decision]
  doc.setFillColor(br, bg, bb)
  doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'F')
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(tr, tg, tb)
  doc.text(status.decisionLabel, pageWidth / 2, y + 7, { align: 'center' })
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  if (status.rateLoading) {
    doc.text(`Rate loading applied: ${status.rateLoading}`, pageWidth / 2, y + 13, { align: 'center' })
  }
  y += 26

  // Application details
  sectionHeading('Application Details')
  field('Application ID', status.applicationId)
  field('Applicant', status.applicant)
  field('Policy Type', `${status.policyType} insurance`)
  field('Submitted', new Date(status.submittedAt).toLocaleString('en-GB'))
  field('Decision', status.decisionLabel)
  drawLine()

  // Personal details
  const d = full.data
  sectionHeading('Personal Details')
  field('First Name', d.firstName)
  field('Last Name', d.lastName)
  field('Email', d.email)
  field('Date of Birth', d.dateOfBirth)
  field('NI Number', d.nationalInsuranceNumber)
  field('UK Permanent Resident', d.ukPermanentResident ? 'Yes' : 'No')
  drawLine()

  // Cover details
  sectionHeading('Cover Details')
  field('Cover Type', coverTypeLabels[d.coverType] ?? d.coverType)
  field('Cover Amount', `£${d.coverAmount.toLocaleString()}`)
  if (d.coverTermYears) field('Cover Term', `${d.coverTermYears} years`)
  if (d.linkedLiabilityDescription) field('Linked Liability', d.linkedLiabilityDescription)
  field('Reason for Cover', d.reasonForCover)
  drawLine()

  // Medical history
  sectionHeading('Medical History')
  field('Pre-existing Conditions', d.hasPreExistingConditions ? 'Yes' : 'No')
  if (d.preExistingConditionsDetails) field('Conditions Detail', d.preExistingConditionsDetails)
  field('Prescribed Medication', d.hasMedication ? 'Yes' : 'No')
  if (d.medicationDetails) field('Medication Detail', d.medicationDetails)
  field('Surgeries / Hospital Treatment', d.hasSurgeries ? 'Yes' : 'No')
  if (d.surgeriesDetails) field('Surgery Detail', d.surgeriesDetails)
  field('Family Medical History', d.hasFamilyHistory ? 'Yes' : 'No')
  if (d.familyHistoryDetails) field('Family History Detail', d.familyHistoryDetails)
  drawLine()

  // Lifestyle
  sectionHeading('Lifestyle')
  field('Smoking Status', smokingLabels[d.smokingStatus] ?? d.smokingStatus)
  field('Vaping / Nicotine Use', d.usesVapingOrNicotine ? 'Yes' : 'No')
  field('Alcohol (units/week)', String(d.alcoholUnitsPerWeek))
  field('Recreational Drug Use', d.usesRecreationalDrugs ? 'Yes' : 'No')
  if (d.recreationalDrugsDetails) field('Drug Use Detail', d.recreationalDrugsDetails)
  drawLine()

  // Occupation & hobbies
  sectionHeading('Occupation & Hobbies')
  field('Job Title', d.jobTitle)
  field('Industry', d.industry)
  field('Hazardous Hobbies', d.hasHazardousHobbies ? 'Yes' : 'No')
  if (d.hazardousHobbiesDetails) field('Hobbies Detail', d.hazardousHobbiesDetails)
  drawLine()

  // Existing cover
  sectionHeading('Existing Cover')
  field('Existing Policies', d.hasExistingCover ? 'Yes' : 'No')
  if (d.existingCoverDetails) field('Existing Cover Detail', d.existingCoverDetails)
  if (d.existingCoverTotalAmount) field('Total Existing Cover', `£${d.existingCoverTotalAmount.toLocaleString()}`)
  drawLine()

  // Underwriting notes
  sectionHeading('Underwriting Notes')
  status.reasons.forEach((reason) => {
    checkPageBreak(10)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(50, 50, 50)
    const lines = doc.splitTextToSize(`• ${reason}`, contentWidth)
    doc.text(lines, margin, y)
    y += lines.length * 5 + 3
  })

  // Footer on every page
  const totalPages = (doc.internal as { getNumberOfPages: () => number }).getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(160, 160, 160)
    doc.text(
      `Generated ${new Date().toLocaleString('en-GB')} — Page ${i} of ${totalPages}`,
      pageWidth / 2,
      290,
      { align: 'center' }
    )
  }

  doc.save(`application-${status.applicationId}.pdf`)
}

export default function ApplicationStatusPage({ applicationId }: Props) {
  const [status, setStatus] = useState<ApplicationStatus | null>(null)
  const [fullApplication, setFullApplication] = useState<StoredApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [statusResponse, fullResponse] = await Promise.all([
          axios.get<ApplicationStatus>(`/api/applications/${applicationId}/status`),
          axios.get<StoredApplication>(`/api/applications/${applicationId}`)
        ])
        setStatus(statusResponse.data)
        setFullApplication(fullResponse.data)
      } catch {
        setError('We could not find an application with that ID. Please check the link and try again.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [applicationId])

  const handleDownloadPDF = () => {
    if (!status || !fullApplication) return
    setIsGeneratingPDF(true)
    try {
      generatePDF(status, fullApplication)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const decisionConfig: Record<
    QualificationDecision,
    { icon: string; iconColour: string; heading: string; message: string; bannerColour: string }
  > = {
    QUALIFY: {
      icon: '✓',
      iconColour: 'text-green-500',
      heading: 'Application Approved',
      message: 'Your application has been approved. We will be in touch shortly with your personalised quote.',
      bannerColour: 'bg-green-50 border-green-200'
    },
    REFER: {
      icon: '⏳',
      iconColour: 'text-yellow-500',
      heading: 'Application Under Review',
      message: 'Your application has been forwarded for further review. You will be contacted using the email provided in due course.',
      bannerColour: 'bg-yellow-50 border-yellow-200'
    },
    DECLINE: {
      icon: '✗',
      iconColour: 'text-red-500',
      heading: 'Application Unsuccessful',
      message: 'Based on the answers you provided you do not qualify for this policy. Please contact 0800 123 4567 for further consultation.',
      bannerColour: 'bg-red-50 border-red-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Insurance Application</h1>
          <p className="text-sm text-gray-500 mt-1">Application Status</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {isLoading && (
          <div className="text-center py-16 text-gray-400">
            <p>Loading your application status...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-500 text-4xl mb-3">✗</div>
            <h2 className="text-lg font-semibold text-red-800 mb-2">Application Not Found</h2>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {status && fullApplication && (
          <div className="bg-white rounded-lg shadow p-8 space-y-6">
            <div className="text-center">
              <div className={`text-5xl mb-4 ${decisionConfig[status.decision].iconColour}`}>
                {decisionConfig[status.decision].icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {decisionConfig[status.decision].heading}
              </h2>
              <p className="text-gray-600">
                {decisionConfig[status.decision].message}
              </p>
              {status.rateLoading && (
                <p className="mt-2 text-sm text-blue-700 font-medium">
                  Rate loading applied: {status.rateLoading}
                </p>
              )}
            </div>

            <div className={`border rounded-lg p-4 ${decisionConfig[status.decision].bannerColour}`}>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">Applicant</dt>
                  <dd className="text-gray-800 font-medium">{status.applicant}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Policy Type</dt>
                  <dd className="text-gray-800 font-medium capitalize">{status.policyType} insurance</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Submitted</dt>
                  <dd className="text-gray-800 font-medium">
                    {new Date(status.submittedAt).toLocaleString('en-GB')}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Decision</dt>
                  <dd className="text-gray-800 font-medium">{status.decisionLabel}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-gray-500">Application ID</dt>
                  <dd className="text-gray-800 font-medium font-mono text-xs">{status.applicationId}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Underwriting Notes
              </h3>
              <ul className="space-y-2">
                {status.reasons.map((reason, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 bg-gray-50 rounded px-3 py-2"
                  >
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 flex justify-end">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                {isGeneratingPDF ? 'Generating...' : '⬇ Download PDF'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
