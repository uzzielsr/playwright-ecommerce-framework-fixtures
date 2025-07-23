#!/bin/bash

# GitHub Actions Setup Script for Playwright E-commerce Framework
# This script helps configure the repository secrets and variables needed for the workflows

echo "🎭 Setting up GitHub Actions for Playwright E-commerce Framework"
echo "=================================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed.${NC}"
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️ You need to authenticate with GitHub CLI${NC}"
    echo "Run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI found and authenticated${NC}"

# Get repository information
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo -e "${BLUE}📁 Working with repository: $REPO${NC}"

echo ""
echo "🔐 Setting up repository secrets..."
echo "==================================="

# Environment Variables Setup
echo -e "${YELLOW}Setting up environment variables for different environments...${NC}"

# Production environment secrets
echo "Setting up PROD environment secrets..."
gh secret set PROD_TEST_EMAIL --body "produser@example.com" || echo "⚠️ Failed to set PROD_TEST_EMAIL"
gh secret set PROD_TEST_PASSWORD --body "Secure@123" || echo "⚠️ Failed to set PROD_TEST_PASSWORD"

# QA environment secrets  
echo "Setting up QA environment secrets..."
gh secret set QA_TEST_EMAIL --body "qauser@example.com" || echo "⚠️ Failed to set QA_TEST_EMAIL"
gh secret set QA_TEST_PASSWORD --body "Secure@123" || echo "⚠️ Failed to set QA_TEST_PASSWORD"

# UAT environment secrets
echo "Setting up UAT environment secrets..."
gh secret set UAT_TEST_EMAIL --body "uatuser@example.com" || echo "⚠️ Failed to set UAT_TEST_EMAIL"
gh secret set UAT_TEST_PASSWORD --body "Secure@123" || echo "⚠️ Failed to set UAT_TEST_PASSWORD"

# Notification settings (optional)
read -p "Do you want to set up Slack webhook for notifications? (y/n): " setup_slack
if [[ $setup_slack == "y" || $setup_slack == "Y" ]]; then
    read -p "Enter your Slack webhook URL: " slack_webhook
    gh secret set SLACK_WEBHOOK --body "$slack_webhook" || echo "⚠️ Failed to set SLACK_WEBHOOK"
fi

# Teams webhook (optional)
read -p "Do you want to set up Teams webhook for notifications? (y/n): " setup_teams
if [[ $setup_teams == "y" || $setup_teams == "Y" ]]; then
    read -p "Enter your Teams webhook URL: " teams_webhook
    gh secret set TEAMS_WEBHOOK --body "$teams_webhook" || echo "⚠️ Failed to set TEAMS_WEBHOOK"
fi

echo ""
echo "⚙️ Setting up repository variables..."
echo "===================================="

# Set repository variables
gh variable set NODE_VERSION --body "18" || echo "⚠️ Failed to set NODE_VERSION"
gh variable set PLAYWRIGHT_VERSION --body "1.54.1" || echo "⚠️ Failed to set PLAYWRIGHT_VERSION"
gh variable set DEFAULT_ENVIRONMENT --body "prod" || echo "⚠️ Failed to set DEFAULT_ENVIRONMENT"
gh variable set DEFAULT_BROWSER --body "chromium" || echo "⚠️ Failed to set DEFAULT_BROWSER"

echo ""
echo "📋 Repository Settings Recommendations"
echo "====================================="
echo -e "${BLUE}Consider enabling these repository settings:${NC}"
echo "1. Branch protection rules for main branch"
echo "2. Require status checks before merging"
echo "3. Require branches to be up to date before merging"
echo "4. Require review from code owners"
echo "5. Dismiss stale reviews when new commits are pushed"

echo ""
echo -e "${GREEN}✅ Setup completed!${NC}"
echo ""
echo "🚀 Next Steps:"
echo "==============="
echo "1. Push your changes to trigger the first workflow run"
echo "2. Check the Actions tab to see your workflows"
echo "3. Configure branch protection rules in repository settings"
echo "4. Add team members as reviewers for PRs"
echo ""
echo "📖 Workflow Files Created:"
echo "- .github/workflows/playwright-tests.yml (Main CI/CD)"
echo "- .github/workflows/scheduled-tests.yml (Scheduled runs)"
echo "- .github/workflows/performance-tests.yml (Performance testing)"
echo "- .github/workflows/security-scan.yml (Security scanning)"
echo "- .github/dependabot.yml (Dependency updates)"
echo ""
echo -e "${BLUE}Happy Testing! 🎭${NC}"
