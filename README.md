# Medicare Part B Immunos Calc
## Description
Free HTML/Javascript Based Copay Calculator for Medicare Part B Immunosuppressants.

Note: Traditional Medicare Part B covers 80% of the costs for the following immunosuppressants listed below. This calculator predicts the 20% copay the patient is responsible for.

## Usage
This web-based calculator is deployed via GitHub pages and can be accessed from any web browser at the following [link](https://eszopicoder.github.io/MedBCalc/)

## Documentation
Pricing files are reported each quarter and can be found at the following [link](https://www.cms.gov/medicare/payment/part-b-drugs/asp-pricing-files)

| HCPCS Code | Drug Name | HCPCS Code Strength | Available Strengths |
| --- | --- | --- | --- |
| J7500 | IMURAN (azathioprine) | 50 mg | 25 mg, 50 mg, 75 mg, 100 mg |
| J7502 | NEORAL (cyclosporine) | 100 mg | 100 mg |
| J7503 | ENVARSUS XR (tacrolimus ER) | 0.25 mg | 0.75 mg, 1 mg, 4 mg |
| J7507 | PROGRAF (tacrolimus) | 1 mg | 0.5 mg, 1 mg, 5 mg |
| J7508 | ASTAGRAF XL (tacrolimus ER) | 0.1 mg | 0.5 mg, 1 mg, 5 mg |
| J7509 | methylPREDNISolone | 4 mg | 4 mg, 8 mg, 16 mg, 32 mg |
| J7510 | predniSOLONE | 5 mg | 5 mg |
| J7512 | predniSONE | 1 mg | 1 mg, 5 mg, 10 mg |
| J7515 | NEORAL (cyclosporine) | 25 mg | 25 mg |
| J7517 | CELLCEPT (mycophenolate mofetil) | 250 mg | 250 mg, 500 mg |
| J7518 | MYFORTIC (mycophenolic acid) | 180 mg | 180 mg, 360 mg |
| J7520 | RAPAMUNE (sirolimus) | 1mg | 0.5 mg, 1 mg |
| J7527 | ZORTRESS (everolimus) | 0.25 mg | 0.25 mg, 0.5 mg, 0.75 mg |

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
