# Medicare Part B Immunos and Oncology Drugs Calc
## Description
Free HTML/Javascript Based Copay Calculator for Medicare Part B Immunosuppressants and Oncology Drugs.

Note: Traditional Medicare Part B covers 80% of the costs for the following immunosuppressants and oncology drugs listed below. This calculator predicts the 20% copay the patient is responsible for.

## Usage
This web-based calculator is deployed via GitHub pages and can be accessed from any web browser at the following [link](https://eszopicoder.github.io/MedBCalc/)

## Documentation
Pricing files are reported each quarter and can be found at the following [link](https://www.cms.gov/medicare/payment/part-b-drugs/asp-pricing-files)

|Drug Class | HCPCS Code | Drug Name | HCPCS Code Strength | Available Strengths | Notes |
| --- | --- | --- | --- | --- | --- |
| Immunosuppressant | J7500 | IMURAN (azathioprine) | 50 mg | 25 mg, 50 mg, 75 mg, 100 mg |
| Immunosuppressant | J7502 | NEORAL (cyclosporine) | 100 mg | 100 mg |
| Immunosuppressant | J7503 | ENVARSUS XR (tacrolimus ER) | 0.25 mg | 0.75 mg, 1 mg, 4 mg |
| Immunosuppressant | J7507 | PROGRAF (tacrolimus) | 1 mg | 0.5 mg, 1 mg, 5 mg |
| Immunosuppressant | J7508 | ASTAGRAF XL (tacrolimus ER) | 0.1 mg | 0.5 mg, 1 mg, 5 mg |
| Immunosuppressant | J7509 | methylPREDNISolone | 4 mg | 4 mg, 8 mg, 16 mg, 32 mg |
| Immunosuppressant | J7510 | predniSOLONE | 5 mg | 5 mg |
| Immunosuppressant | J7512 | predniSONE | 1 mg | 1 mg, 5 mg, 10 mg |
| Immunosuppressant | J7515 | NEORAL (cyclosporine) | 25 mg | 25 mg |
| Immunosuppressant | J7517 | CELLCEPT (mycophenolate mofetil) | 250 mg | 250 mg, 500 mg |
| Immunosuppressant | J7518 | MYFORTIC (mycophenolic acid) | 180 mg | 180 mg, 360 mg |
| Immunosuppressant | J7520 | RAPAMUNE (sirolimus) | 1 mg | 0.5 mg, 1 mg |
| Immunosuppressant | J7521 | PROGRAF Granules (tacrolimus) | 0.1 mg | 0.2 mg, 1 mg | Added April 2025 |
| Immunosuppressant | J7527 | ZORTRESS (everolimus) | 0.25 mg | 0.25 mg, 0.5 mg, 0.75 mg |
| Immunosuppressant | J7528 | CELLCEPT susp (mycophenolate mofetil) | 100 mg | 200 mg/mL | Added January 2026 |
| Oncology | J8520	| XELODA (capecitabine)	| 150 mg	| 150 mg	| Depricated October 2025 |
| Oncology | J8521	| XELODA (capecitabine)	| 500 mg	| 500 mg	| Depricated October 2025 |
| Oncology | J8522	| XELODA (capecitabine)	| 50 mg	| 150 mg, 500 mg	| Added October 2025 |
| Oncology | J8530	| CYTOXAN (cyclophosphamide)	| 25 mg	| 25 mg, 50 mg |	
| Oncology | J8560	| VEPESID (etoposide)	| 50 mg	| 50 mg	|
| Oncology | J8610	| methotrexate	| 2.5mg	| 2.5mg	|
| Oncology | J8700	| TEMODAR (temozolomide)	| 5 mg	| 5 mg, 20 mg, 100 mg, 140 mg, 180 mg, 250 mg	|
| Oncology | J8705	| HYCAMTIN (topotecan)	| 0.25 mg	| 0.25 mg, 1 mg	|

Medicare payment (80%) is calculated using the following formula:

$$ Medicare = \frac{(Strength) * (Payment Limit) * (Tablets)}{(HCPCS Strength)}  $$

Copayment (20%) is calcated using the following formula:

$$ Copay = Medicare * 0.25 $$

Proof:

$$ \frac{Medicare}{Total} = \frac{80}{100}  $$

$$ Total * 80 = Medicare * 100 $$

$$ Total = Medicare * 1.25 $$

$$ Total * 0.2 = Medicare * 1.25 * 0.2 $$

$$ Total * 0.2 = Medicare * 0.25 $$
