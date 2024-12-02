# Medicare Part B Immunos Calc
## Description
Free HTML/Javascript Based Copay Calculator for Medicare Part B Immunos

## Usage
This web-based calculator is deployed via GitHub pages and can be accessed from any web browser at the following [link](https://eszopicoder.github.io/MedBCalc/)

## Documentation
Pricing files are reported each quarter and can be found at the following [link](https://www.cms.gov/medicare/payment/part-b-drugs/asp-pricing-files)

Medicare payment (80%) is calculated using the following formula:

$$ Medicare = \frac{(Strength) * (Payment Limit) * (Tablets)}{(HCPCS Strength)}  $$

Copayment (20%) is calcated using the following formula:

$$ Copay = Medicare * 0.25 $$

Proof:

$$ \frac{Medicare}{Total} = \frac{80}{100}  $$

$$ Total * 80 = Medicare * 100 $$
