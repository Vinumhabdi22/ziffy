# Deployment Guide

This guide will walk you through the process of publishing your Next.js website to a live domain. We recommend using **Vercel** for hosting as it is built by the creators of Next.js and offers the best performance and easiest deployment experience.

## Prerequisites

- A [GitHub](https://github.com/) account.
- The code pushed to a GitHub repository.

## Step 1: Push Code to GitHub

If you haven't already, make sure your code is in a GitHub repository.

1.  Initialize git in your project folder (if not done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Follow the instructions on GitHub to push your local code to the remote repository.

## Step 2: Buy a Domain

You need a domain name (e.g., `yourwebsite.com`). You can buy one from various registrars.

**Options:**
*   **Vercel (Easiest):** You can buy a domain directly through Vercel during or after deployment. This automatically configures everything for you.
*   **Namecheap / GoDaddy / Google Domains:** comprehensive options. If you buy from these, you will need to update DNS settings later.

## Step 3: Deploy to Vercel

1.  Go to [Vercel.com](https://vercel.com/) and sign up (using your GitHub account is easiest).
2.  On your dashboard, click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  Vercel will detect that it is a Next.js project.
5.  **Environment Variables:** If your project uses any `.env` variables (e.g., for a database or API keys), copy them from your local `.env` file and paste them into the "Environment Variables" section in Vercel.
6.  Click **"Deploy"**.
7.  Wait a minute for the build to finish. Your site is now live on a `.vercel.app` subdomain!

## Step 4: Configure Custom Domain

If you want to use your own domain (e.g., `www.yourbusiness.com`) instead of the default `vercel.app` link:

1.  Go to your Project Dashboard on Vercel.
2.  Click on the **"Settings"** tab.
3.  Select **"Domains"** from the left sidebar.
4.  Enter your domain name (e.g., `yourwebsite.com`) and click **"Add"**.

### If you bought the domain on Vercel:
It will just work. You are done!

### If you bought the domain elsewhere (Namecheap, GoDaddy, etc.):
Vercel will show you the required DNS records. You need to log in to your domain registrar (where you bought the domain) and add these records.

Usually, it involves adding:
*   **A Record:** pointing to Vercel's IP address (76.76.21.21).
*   **CNAME Record:** for `www` pointing to `cname.vercel-dns.com`.

*Refer to the specific instructions provided by Vercel in the Domains tab, as they might verify via TXT record first.*

## Updates

Whenever you want to update your website, just **push your changes to GitHub**. Vercel will automatically detect the new commit and re-deploy your site.
