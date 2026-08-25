import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { qualifyLifeInsurance } from '../services/qualificationEngine'
import { applicationStore } from '../store/applicationStore'
import { StoredApplication, LifeInsuranceApplication } from '../types/insurance'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  const { policyType, ...applicationData } = req.body

  if (policyType !== 'life') {
    res.status(400).json({ error: 'Unsupported policy type.' })
    return
  }

  const application = applicationData as LifeInsuranceApplication

  if (!application.ukPermanentResident) {
    res.status(400).json({ error: 'Applicant must be a UK permanent resident.' })
    return
  }

  const { decision, reasons } = qualifyLifeInsurance(application)

  const stored: StoredApplication = {
    id: uuidv4(),
    policyType: 'life',
    submittedAt: new Date().toISOString(),
    decision,
    reasons,
    data: application
  }

  applicationStore.save(stored)

  res.status(201).json({
    applicationId: stored.id,
    decision,
    reasons
  })
})

router.get('/:id', (req: Request, res: Response) => {
  const application = applicationStore.findById(req.params.id)
  if (!application) {
    res.status(404).json({ error: 'Application not found.' })
    return
  }
  res.json(application)
})

export default router
