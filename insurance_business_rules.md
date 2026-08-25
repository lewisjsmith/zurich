# Insurance Applicant Qualification Business Rules

## Purpose and decision outcomes

These rules provide an initial qualification decision for UK applicants. They are intended for triage and quote pre-screening, not as a substitute for product wording, underwriting guidance, affordability checks, fraud controls, or a human underwriter.

Each policy rule produces one of these outcomes:

- **QUALIFY**: the application can proceed to the standard quote journey.
- **REFER**: the application needs more evidence, a specialist product, or manual underwriting.
- **DECLINE**: the application is outside the product's stated eligibility criteria.

A rule must never decline an applicant solely because of a protected characteristic. Health-related data must be collected only where relevant, handled as special-category personal data, and assessed under the insurer's approved UK legal, regulatory, and fairness controls.

## Shared rules for all policies

| Rule ID | Applicant answer or condition | Decision | Rule |
|---|---|---|---|
| ALL-01 | Full legal name and date of birth are missing, inconsistent, or cannot be verified | REFER | Request identity evidence and correct the application before quoting. |
| ALL-02 | Applicant is not legally and permanently resident in the UK, or residency cannot be verified | DECLINE / REFER | Decline where the product requires UK permanent residence and the answer is confirmed; otherwise refer for eligibility review. |
| ALL-03 | Material answer is missing, contradictory, or appears inaccurate | REFER | Do not infer a favourable answer. Ask a clear follow-up question and retain the original answer. |
| ALL-04 | Applicant does not meet the product's published age, territory, or customer eligibility limits | DECLINE | Apply the approved product limits. Do not use an age or residency proxy where the product does not require it. |
| ALL-05 | Potential fraud, identity misrepresentation, or deliberate non-disclosure is identified | REFER | Escalate through the approved fraud and financial-crime process. Do not disclose internal fraud indicators to the applicant. |
| ALL-06 | Applicant requests cover, but the requested amount, term, or risk cannot be supported by the product | REFER | Offer an approved alternative where available; otherwise decline only after the product limit is confirmed. |

---

# Motor Insurance

## Relevant applicant questions

Use full legal name, date of birth, residency, occupation, hobbies only where they affect vehicle use, and the requested coverage. Health and medical questions are generally **not** required for ordinary private motor insurance and must not be used as rating factors unless a specific product and approved underwriting basis requires them.

Questionnaire mapping: **Job details**, **Dangerous hobbies**, **Cover amount and length**, and **Existing cover** are assessed only where relevant to motor use or requested benefits. **Smoking and vaping** and **Alcohol and drug use** are not standard private motor rating factors.

## Qualification rules

| Rule ID | Condition | Decision | Business rule |
|---|---|---|---|
| MOT-01 | Applicant identity, date of birth, and UK permanent residency pass verification | QUALIFY | Continue to vehicle and driver underwriting. |
| MOT-02 | Applicant fails the product's minimum age or licence eligibility requirement | DECLINE / REFER | Decline outside the product appetite; refer where a specialist young-driver or non-standard product may apply. |
| MOT-03 | Occupation or regular work activity involves driving, carrying goods, passengers, or hazardous sites | REFER | Confirm vehicle use, annual mileage, business-use class, goods/passenger use, and any required endorsements. |
| MOT-04 | Applicant participates in motorcycling or another hazardous hobby | REFER | Ask whether the activity involves the insured vehicle or affects regular driving. Rate or refer only under the approved motor schedule. |
| MOT-05 | Applicant discloses a medical condition, medication, or treatment that may affect legal fitness to drive | REFER | Do not make a medical eligibility decision from the initial answer. Request the legally required driving-fitness declaration or evidence and refer to approved underwriting. |
| MOT-06 | Applicant reports smoking, vaping, alcohol use, or past substance misuse but no driving-fitness issue is identified | QUALIFY | Do not use these answers as ordinary private motor rating factors unless the approved product rules explicitly require them. |
| MOT-07 | Requested cover is within the policy's vehicle, driver, use, and territorial limits | QUALIFY | Continue to quote, subject to vehicle details, claims, convictions, licence, and fraud checks. |
| MOT-08 | Requested cover requires an excluded use, vehicle type, driver type, or territory | DECLINE | Explain the product-level eligibility outcome and signpost any approved alternative. |

## Required follow-up data

The supplied question set is not sufficient to quote motor insurance. Collect vehicle registration or vehicle specification, ownership or lease status, driving licence details, claims and convictions, annual mileage, overnight parking, use of vehicle, and no-claims history where applicable.

---

# Home Insurance

## Relevant applicant questions

Use full legal name, date of birth, residency, occupation, and requested coverage. Health, medication, family medical history, smoking, vaping, alcohol, and drug-use answers are normally **not material** to standard home buildings or contents insurance and should not be requested for this product unless a specific approved product justifies them.

Questionnaire mapping: **Job details**, **Dangerous hobbies**, **Cover amount and length**, and **Existing cover** are assessed only when they affect the property, contents, liability, or requested benefit. **Pre-existing medical conditions**, **Medication**, **Family medical history**, **Smoking and vaping**, and **Alcohol and drug use** are not standard home rating factors.

## Qualification rules

| Rule ID | Condition | Decision | Business rule |
|---|---|---|---|
| HOM-01 | Applicant is a UK permanent resident and can verify the insured property interest | QUALIFY | Continue to property underwriting. |
| HOM-02 | Applicant cannot confirm whether they are owner, leaseholder, landlord, or tenant | REFER | Establish the insurable interest and select the correct buildings, contents, landlord, or tenant product. |
| HOM-03 | Occupation involves hazardous work carried out at the insured home, or the home is used for a business | REFER | Confirm business equipment, visitors, stock, liability, and any required commercial or home-worker extension. |
| HOM-04 | Occupation or hobby creates unusual storage, fire, liability, or high-value contents exposure | REFER | Obtain details and apply approved underwriting rules rather than using the job or hobby label alone. |
| HOM-05 | Requested buildings or contents sum insured is within product limits and the property meets construction and occupancy rules | QUALIFY | Continue to quote, subject to property and security information. |
| HOM-06 | Property is unoccupied beyond the product's permitted period, used for prohibited purposes, or has excluded construction | DECLINE / REFER | Use the approved unoccupied, non-standard construction, holiday-let, or specialist-property route where available. |
| HOM-07 | Applicant supplies health, medication, family-history, smoking, vaping, alcohol, or drug-use information voluntarily | QUALIFY | Do not use it for standard home eligibility or rating unless a separate approved coverage specifically requires it. Minimise retention and restrict access. |
| HOM-08 | Requested coverage is outside territorial, property-type, or sum-insured limits | DECLINE | Decline the request under the product criteria and offer an approved alternative where available. |

## Required follow-up data

Collect property address, owner or tenant status, property construction and age, bedrooms, occupancy, outbuildings, security, claims history, rebuild value, contents value, high-value items, and business or short-term-let use.

---

# Life Insurance

## Relevant applicant questions

All supplied questions may be relevant to life insurance underwriting. The decision should be based on the product's approved underwriting evidence and not on a single answer in isolation.

Questionnaire mapping: **Height and weight**, **Pre-existing medical conditions**, **Medication**, **Family medical history**, **Smoking and vaping**, **Alcohol and drug use**, **Job details**, **Dangerous hobbies**, **Cover amount and length**, and **Existing cover** may all be material, subject to the approved product rules.

## Qualification rules

| Rule ID | Condition | Decision | Business rule |
|---|---|---|---|
| LIF-01 | Identity, date of birth, and UK permanent residency pass verification | QUALIFY | Continue to financial-needs and medical underwriting. |
| LIF-02 | Age is outside the selected product's entry or expiry limits | DECLINE / REFER | Decline outside the product limits; refer only where a later-life or specialist product is available. |
| LIF-03 | Requested cover amount and term are within product limits and consistent with the declared need | QUALIFY | Continue to quote, subject to underwriting and affordability checks. |
| LIF-04 | Requested cover is unusually high, the term is unusually long, or the need is unclear | REFER | Request financial justification, income or liability context, and existing-cover details. |
| LIF-05 | Pre-existing condition, surgery, treatment, medication, or family history indicates potentially material mortality risk | REFER | Ask the approved follow-up questions and request medical evidence only through the approved process. Do not automatically decline. |
| LIF-06 | Smoking, vaping, nicotine substitute use, alcohol intake, or substance-misuse history falls outside standard underwriting thresholds | REFER | Apply the approved smoker, nicotine, alcohol, and substance-use criteria. Consider a specialist product where available. |
| LIF-07 | Hazardous occupation or dangerous hobby is disclosed, including skydiving, motorcycling, or mountaineering | REFER | Confirm frequency, safety controls, professional versus recreational status, and whether an exclusion, loading, or specialist product applies. |
| LIF-08 | Existing cover is not disclosed, conflicts with the requested amount, or creates possible over-insurance | REFER | Verify existing policies and assess total cover under the approved financial-needs and reinsurance rules. |
| LIF-09 | Applicant refuses a required material answer or medical evidence cannot be obtained | REFER / DECLINE | Refer where an evidence-light product is available; otherwise decline for insufficient underwriting information. |
| LIF-10 | Material misrepresentation or non-disclosure is identified after review | REFER | Escalate for underwriting and fraud review; do not make an automated adverse decision without the approved process. |

## Coverage-specific rules

- **Term life**: require a stated term and benefit amount. Check that the term does not exceed the product's maximum expiry age.
- **Whole-of-life**: confirm the product is available for the applicant's age and that premium or affordability requirements are met.
- **Decreasing term**: request the linked liability and confirm that the requested benefit and term reasonably match it.
- **Joint life**: collect and underwrite each applicant separately, then apply the joint-policy rules.

---

# Health Insurance

## Relevant applicant questions

Use identity, date of birth, UK residency, height and weight, pre-existing conditions, treatment, surgery, medication, lifestyle, occupation, hobbies, and requested coverage where relevant. Family medical history is product-dependent and should be used only if the approved health product asks for it.

Questionnaire mapping: **Height and weight**, **Pre-existing medical conditions**, **Medication**, **Family medical history**, **Smoking and vaping**, **Alcohol and drug use**, **Job details**, **Dangerous hobbies**, and **Cover amount and length** may be relevant. **Existing cover** is relevant only where the selected health product coordinates with other cover.

## Qualification rules

| Rule ID | Condition | Decision | Business rule |
|---|---|---|---|
| HEA-01 | Identity, date of birth, and UK permanent residency pass verification | QUALIFY | Continue health product eligibility and medical underwriting. |
| HEA-02 | Height and weight are present and BMI can be calculated | QUALIFY | Calculate BMI as weight in kilograms divided by height in metres squared. Use BMI as an underwriting indicator only where the approved product permits it; do not treat it as a diagnosis. |
| HEA-03 | Height or weight is missing, inconsistent, or indicates an extreme value requiring context | REFER | Verify units and measurements, then apply approved underwriting guidance. |
| HEA-04 | Pre-existing condition, current treatment, prior surgery, or medication is disclosed | REFER | Determine whether the condition is covered, excluded, subject to a waiting period, or requires medical evidence. Do not automatically decline. |
| HEA-05 | Family history indicates a hereditary condition and the product's approved questions make it material | REFER | Ask only the permitted follow-up questions and apply the approved family-history criteria. |
| HEA-06 | Smoking, vaping, nicotine substitute use, alcohol, or substance-misuse history may affect eligibility or product terms | REFER | Apply the approved health underwriting thresholds and evidence requirements. |
| HEA-07 | Occupation or hobby creates a higher injury or exposure risk relevant to the health product | REFER | Confirm the activity and apply approved exclusions, premium adjustments, or specialist-product rules. |
| HEA-08 | Applicant provides incomplete medical answers or refuses required medical evidence | REFER / DECLINE | Refer to an evidence-light product where available; otherwise decline only for insufficient information under the approved process. |
| HEA-09 | Requested benefit, treatment area, territorial scope, or waiting period is within the product limits | QUALIFY | Continue to quote subject to policy terms, exclusions, and affordability. |
| HEA-10 | Requested treatment or condition is expressly excluded and no alternative product applies | DECLINE | Decline only the unsupported coverage or product, using clear approved wording. |

## BMI calculation and handling

Use consistent units:

```text
BMI = weight_kg / (height_m * height_m)
```

Store the source measurements and the calculation result separately. BMI should trigger context or referral where required, not serve as the sole reason for an adverse decision.

---

# Decision flow and implementation notes

1. Verify identity, date of birth, UK permanent residency, and the selected policy.
2. Apply shared rules and stop automated processing when a rule returns `REFER` or `DECLINE`.
3. Ask only the product-relevant questions. Do not reuse life or health questions for motor or home insurance without an approved purpose.
4. Apply product-specific rules in order of evidence quality: verified facts, complete applicant answers, then approved medical or financial evidence.
5. Return a decision, the rule IDs that fired, missing information, and the next action.
6. Log the rule version, timestamp, and decision reason for auditability. Protect medical and lifestyle data with role-based access and retention controls.

Automated rules should be tested for false declines, inconsistent outcomes, accessibility, and protected-group impact before production use. Product wording and underwriting manuals take precedence over this initial rule set.
