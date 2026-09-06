# OccasionFun infrastructure (`dev-occ`)

HalloweenReady stays on `dev` / `main` (`halloweenready-prod` + the existing Amplify app).

This branch deploys a **second, isolated** AWS footprint:

| Piece | HalloweenReady | OccasionFun |
|---|---|---|
| Git branch | `dev`, `main` | `dev-occ` |
| SAM / API stack | `halloweenready-prod` | `occasionfun-prod` |
| Amplify stack | existing Amplify app | `occasionfun-amplify-prod` |
| DynamoDB | `halloweenready-*-prod` | `occasionfun-*-prod` |
| Cognito | existing user pool | new `occasionfun-users-prod` |
| S3 + CloudFront | existing HR bucket/CDN | `occasionfun-uploads-prod-<account>` |
| Site | halloweenready.com | occasionfun.com |
| Orders | `HW…` | `OF…` |
| CJ import | Halloween keyword | full catalog |

Do **not** merge `dev-occ` into `main`. That would point HalloweenReady production at OccasionFun names.

## What a push to `dev-occ` does

GitHub Actions workflow **Deploy OccasionFun**:

1. Typecheck the monorepo
2. `sam deploy --config-env occ` → stack `occasionfun-prod`
3. If secret `OCC_AMPLIFY_GITHUB_TOKEN` is set, `aws cloudformation deploy` → stack `occasionfun-amplify-prod` (Amplify app `occasionfun`, branch `dev-occ`)

## GitHub secrets to add

Reuse the same AWS keys as HalloweenReady (same account, different stacks). Add OccasionFun-specific secrets when you have them:

| Secret | Required for | Notes |
|---|---|---|
| `OCC_SMTP_PASSWORD` | Order / contact email | GoDaddy mailbox `order@occasionfun.com` |
| `OCC_AMPLIFY_GITHUB_TOKEN` | Amplify CloudFormation | GitHub PAT with `repo` scope so Amplify can clone this repo |
| `OCC_STRIPE_SECRET_KEY` | Payments | New Stripe webhook to OccasionFun API URL; falls back to HR keys if unset |
| `OCC_STRIPE_WEBHOOK_SECRET` | Payments | Same |
| `OCC_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Checkout | |
| `OCC_RAZOR_KEY_ID` / `OCC_RAZOR_KEY_SECRET` / `OCC_RAZORPAY_WEBHOOK_SECRET` | INR checkout | New Razorpay webhook to OccasionFun API |
| `OCC_CJ_API_KEY` | CJ import | Can share the same CJ account; catalog data is still a **separate DynamoDB table** |
| `OCC_MARKETING_SMTP_PASS` | Marketing campaigns | Mailercloud sender `email@occasionfun.com` |

Until `OCC_AMPLIFY_GITHUB_TOKEN` is set, the backend stack still deploys. Create the Amplify app in the AWS console: name `occasionfun`, connect this GitHub repo, branch `dev-occ`, then paste the `occasionfun-prod` outputs into Amplify environment variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_CDN_URL`, Cognito ids, `NEXT_PUBLIC_SITE_URL=https://www.occasionfun.com`).

## GoDaddy DNS (`occasionfun.com`)

After the Amplify app exists:

1. Amplify → **occasionfun** → Domain management → add `occasionfun.com` and `www`
2. Copy the CNAME / ANAME records Amplify shows into GoDaddy (replace the current “Launching Soon” parking)
3. SES: `aws cloudformation describe-stacks --stack-name occasionfun-prod --query 'Stacks[0].Outputs'` — add the three DKIM CNAMEs (`DkimToken*` / `DkimValue*`) so `order@` / `email@` can send
4. Mailbox: create `order@occasionfun.com` and `support@occasionfun.com`, put the password in `OCC_SMTP_PASSWORD`

## After first deploy

1. Create an admin user in Cognito pool `occasionfun-users-prod` and add them to group `admin`
2. Stripe Dashboard → Webhooks → endpoint `https://<ApiUrl>/webhooks/stripe`
3. Razorpay Dashboard → Webhooks → `https://<ApiUrl>/webhooks/razorpay`
4. Admin → CJ Dropshipping → paste API key if not in secrets → **Import catalog** (full catalog, not Halloween-only)
5. Confirm storefront `NEXT_PUBLIC_API_URL` is the **new** execute-api URL, not `c70qsnpe4g` (HalloweenReady)

## Local SAM

```bash
cd infrastructure
sam build --config-env occ
sam deploy --config-env occ   # stack occasionfun-prod — never halloweenready-prod
```
