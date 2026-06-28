#!/usr/bin/env bash
# Set Amplify environment variables for halloweenready.com (Next.js on Amplify — WordPress retired).
# Requires: aws CLI, active AWS credentials with Amplify access.
#
# Usage:
#   export AWS_ACCESS_KEY_ID=...
#   export AWS_SECRET_ACCESS_KEY=...
#   export AWS_SESSION_TOKEN=...   # if using temporary creds
#   ./scripts/set-amplify-env.sh
#
# Or update one branch only:
#   ./scripts/set-amplify-env.sh main

set -euo pipefail

APP_ID="${AMPLIFY_APP_ID:-d1jpjybwyr2l8t}"
BRANCH="${1:-main}"

# Production values — halloweenready.com is the Next.js storefront (not WordPress).
SAMPLE_ENV=$(cat <<'EOF'
{
  "NEXT_PUBLIC_SITE_URL": "https://halloweenready.com",
  "NEXT_PUBLIC_API_URL": "https://c70qsnpe4g.execute-api.us-east-1.amazonaws.com/prod",
  "NEXT_PUBLIC_CDN_URL": "https://d2lfdzx32wxe94.cloudfront.net",
  "NEXT_PUBLIC_GTM_ID": "GTM-XXXXXXX",
  "NEXT_PUBLIC_GA4_ID": "G-XXXXXXXXXX",
  "NEXT_PUBLIC_META_PIXEL_ID": "1459099935879507",
  "NEXT_PUBLIC_CLARITY_ID": "xdpv6v2lq9",
  "NEXT_PUBLIC_BING_SITE_VERIFICATION": "SAMPLE_BING_VERIFICATION_CODE",
  "NEXT_PUBLIC_BING_UET_ID": "SAMPLE_BING_UET_TAG_ID",
  "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION": "google882629f2a0f6ec6d"
}
EOF
)

update_branch() {
  local branch="$1"
  echo "Updating Amplify branch: $branch"

  EXISTING=$(aws amplify get-branch --app-id "$APP_ID" --branch-name "$branch" \
    --query 'branch.environmentVariables' --output json 2>/dev/null || echo '{}')

  MERGED=$(python3 -c "
import json, os
existing = json.loads(os.environ.get('EXISTING') or '{}')
samples = json.loads(os.environ.get('SAMPLE_ENV') or '{}')
merged = {**existing, **samples}
print(json.dumps(merged))
" EXISTING="$EXISTING" SAMPLE_ENV="$SAMPLE_ENV")

  ENV_STRING=$(python3 -c "
import json, sys
d = json.loads(sys.stdin.read())
print(','.join(f'{k}={v}' for k, v in d.items()))
" <<< "$MERGED")

  aws amplify update-branch \
    --app-id "$APP_ID" \
    --branch-name "$branch" \
    --environment-variables "$ENV_STRING" \
    --output json \
    --query 'branch.branchName'

  echo "  ✓ $branch updated. Redeploy from Amplify Console or push a commit."
}

update_branch "$BRANCH"

echo ""
echo "Required for product images (WordPress media is retired):"
echo "  NEXT_PUBLIC_CDN_URL=https://d2lfdzx32wxe94.cloudfront.net"
echo "  Upload wp-content/uploads to S3, then run: npm run migrate:images"
