import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { qualifyLifeInsurance } from '../services/qualificationEngine'
import { applicationStore } from '../store/applicationStore'
import { StoredApplication, LifeInsuranceApplication, QualificationDecision } from '../types/insurance'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  const applications = applicationStore.findAll()
  res.json(applications)
})

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

router.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const { decision, rate } = req.body as { decision?: QualificationDecision; rate?: number }

  const existing = applicationStore.findById(id)
  if (!existing) {
    res.status(404).json({ error: 'Application not found.' })
    return
  }

  const changes: Partial<StoredApplication> = {}

  if (decision !== undefined) {
    const validDecisions: QualificationDecision[] = ['QUALIFY', 'REFER', 'DECLINE']
    if (!validDecisions.includes(decision)) {
      res.status(400).json({ error: 'Invalid decision value.' })
      return
    }
    changes.decision = decision
  }

  if (rate !== undefined) {
    if (typeof rate !== 'number' || rate < 0 || rate > 100) {
      res.status(400).json({ error: 'Rate must be a number between 0 and 100.' })
      return
    }
    changes.rate = rate
  }

  const updated = applicationStore.update(id, changes)
  res.json(updated)
})

export default router
