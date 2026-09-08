# Screenshots of Outputs

This directory contains the required evidence screenshots demonstrating successful execution of all CI/CD pipelines and live application deployment in accordance with the Udacity Nanodegree Project Rubric.

---

## Required Submission Screenshots

| Screenshot Filename | Pipeline / Service | Description & Rubric Criteria Met |
| :--- | :--- | :--- |
| **`01-frontend-ci-pipeline.png`** | Frontend CI | Shows GitHub Actions run for **Frontend Continuous Integration** (`frontend-ci.yaml`) with green checks on **lint**, **test**, and **build** (with `needs: [lint, test]`). |
| **`02-backend-ci-pipeline.png`** | Backend CI | Shows GitHub Actions run for **Backend Continuous Integration** (`backend-ci.yaml`) with green checks on **lint**, **test**, and **build** (with `needs: [lint, test]`). |
| **`03-frontend-cd-pipeline.png`** | Frontend CD | Shows GitHub Actions run for **Frontend Continuous Deployment** (`frontend-cd.yaml`) with green checks on **lint**, **test**, **build-and-push**, and **deploy**. |
| **`04-backend-cd-pipeline.png`** | Backend CD | Shows GitHub Actions run for **Backend Continuous Deployment** (`backend-cd.yaml`) with green checks on **lint**, **test**, **build-and-push**, and **deploy**. |
| **`05-backend-api-live.png`** | Backend API (Live) | Shows the browser or terminal (`curl`) output accessing the live AWS LoadBalancer endpoint: `http://<backend-elb-url>/movies` returning the JSON payload with movie items. |
| **`06-frontend-app-live.png`** | Frontend App (Live) | Shows the browser displaying the live Movie Picture Catalog UI on `http://<frontend-elb-url>`, verifying that the frontend successfully calls the backend API and renders movie posters and details. |

---

## How to Capture and Place the Screenshots

1. **GitHub Actions Workflows**:
   - Go to your GitHub repository -> Click on the **Actions** tab.
   - For each workflow (**Frontend CI**, **Backend CI**, **Frontend CD**, **Backend CD**), click on the latest successful run.
   - Capture a screenshot showing the workflow name, full graph of jobs (showing green checks), and the browser URL bar to confirm repository ownership.
   - Save the images as:
     - `01-frontend-ci-pipeline.png`
     - `02-backend-ci-pipeline.png`
     - `03-frontend-cd-pipeline.png`
     - `04-backend-cd-pipeline.png`

2. **Backend API Live Verification**:
   - In your browser or command line, access: `http://<backend-loadbalancer-domain>/movies`
   - Capture a screenshot showing the JSON response:
     ```json
     {
       "movies": [
         {"id": "123", "title": "Top Gun: Maverick"},
         {"id": "456", "title": "Sonic the Hedgehog"},
         {"id": "789", "title": "A Quiet Place"}
       ]
     }
     ```
   - Save as `05-backend-api-live.png`.

3. **Frontend Application Live Verification**:
   - In your browser, open: `http://<frontend-loadbalancer-domain>`
   - Verify that the page loads, the title shows "Movie List", and all movie cards are rendered from the backend API.
   - Save as `06-frontend-app-live.png`.
