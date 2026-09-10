# Movie Picture Pipeline - End-to-End CI/CD Project

[![Frontend CI](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/frontend-ci.yaml/badge.svg)](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/frontend-ci.yaml)
[![Backend CI](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/backend-ci.yaml/badge.svg)](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/backend-ci.yaml)
[![Frontend CD](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/frontend-cd.yaml/badge.svg)](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/frontend-cd.yaml)
[![Backend CD](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/backend-cd.yaml/badge.svg)](https://github.com/MALLALAVINAYKUMAR/MoviesDatabase/actions/workflows/backend-cd.yaml)

A complete, production-grade automated CI/CD pipeline for a full-stack web application featuring:
- **Frontend**: React 18, TypeScript, Axios, Prettier/ESLint, Jest.
- **Backend**: Python 3.10, Flask, uWSGI, Flake8, Pytest.
- **CI/CD Automation**: GitHub Actions (Linting, Unit Testing, Docker Image Building, ECR Publishing, EKS Deployments).
- **Cloud Infrastructure**: AWS EKS (Kubernetes 1.32), Amazon ECR, AWS VPC, and AWS IAM provisioned via Terraform.

---

## 🌐 Live AWS Service Endpoints

| Service | Public AWS LoadBalancer URL | Status |
| :--- | :--- | :--- |
| **Frontend Web Application** | [http://afc41cd0a9bab41a7a963edf905ea6c6-243305316.us-east-1.elb.amazonaws.com](http://afc41cd0a9bab41a7a963edf905ea6c6-243305316.us-east-1.elb.amazonaws.com) | `HTTP 200 OK` (Live React UI with modern movie cards & modal) |
| **Backend REST API** | [http://ab89cdcdaf2a14b8ea943919475bf685-1143139730.us-east-1.elb.amazonaws.com/movies](http://ab89cdcdaf2a14b8ea943919475bf685-1143139730.us-east-1.elb.amazonaws.com/movies) | `HTTP 200 OK` (Live Flask REST API returning movies JSON) |

> 📁 Detailed deployment proofs, logs, and screenshots are documented in the [evidence_Proof/](evidence_Proof/) directory.

---

## Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                               GITHUB REPOSITORY                                    |
|                                                                                   |
|   Pull Request to 'main'                             Push / Merge to 'main'       |
|            |                                                   |                  |
|            v                                                   v                  |
|  +--------------------+                             +--------------------+        |
|  | Frontend / Backend |                             | Frontend / Backend |        |
|  |    CI Pipeline     |                             |    CD Pipeline     |        |
|  |  (Lint, Test,      |                             |  (Lint, Test,      |        |
|  |   Docker Build)    |                             |   Build & Push,    |        |
|  +--------------------+                             |   Deploy to EKS)   |        |
|                                                     +---------+----------+        |
+---------------------------------------------------------------|-------------------+
                                                                |
                                             +------------------+------------------+
                                             |                                     |
                                             v (Push Image)                        v (Apply Manifests)
                                   +-------------------+                 +-------------------+
                                   |    Amazon ECR     |                 |     Amazon EKS    |
                                   |  (frontend/backend|<----------------+     (Kubernetes)  |
                                   +-------------------+  Pull Image     +---------+---------+
                                                                                   |
                                                                        +----------+----------+
                                                                        |                     |
                                                                        v                     v
                                                                 Frontend Service      Backend Service
                                                                  (LoadBalancer)        (LoadBalancer)
```

---

## Project Structure

```
movie-picture-pipeline/
├── .github/
│   └── workflows/
│       ├── frontend-ci.yaml      # Frontend Continuous Integration
│       ├── frontend-cd.yaml      # Frontend Continuous Deployment
│       ├── backend-ci.yaml       # Backend Continuous Integration
│       └── backend-cd.yaml       # Backend Continuous Deployment
├── backend/
│   ├── k8s/                      # Kubernetes deployment & service manifests
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   ├── movies/                   # Flask REST API blueprint
│   │   ├── __init__.py
│   │   ├── movies_api.py
│   │   └── resources.py
│   ├── .flake8                   # Flake8 style config
│   ├── Dockerfile                # Python 3.10-alpine container with CFLAGS fix
│   ├── Pipfile & Pipfile.lock    # Dependencies (Flask, uWSGI, pytest, flake8)
│   ├── test_app.py               # Backend Pytest unit test suite
│   └── __init__.py
├── frontend/
│   ├── k8s/                      # Kubernetes deployment & service manifests
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   ├── public/                   # HTML template and static assets
│   ├── src/                      # React application components
│   ├── .eslintrc.js              # ESLint configuration
│   ├── Dockerfile                # Node 18-alpine container with build-arg injection
│   └── package.json              # React dependencies and scripts
├── setup/
│   ├── terraform/                # Infrastructure as Code
│   │   ├── main.tf               # VPC, EKS, ECR, IAM resources
│   │   ├── variables.tf          # K8s version pinned to 1.32
│   │   ├── versions.tf
│   │   └── outputs.tf
│   ├── init.sh                   # aws-auth ConfigMap RBAC script
│   └── workspace-setup.sh        # Local developer setup script
├── evidence_Proof/               # Evidence screenshots and proof documentation
│   ├── README.md
│   ├── frontend_app_running.png
│   ├── backend_api_running.png
│   ├── frontend_cd_success.png
│   ├── backend_cd_success.png
│   ├── frontend_ci_success.png
│   ├── backend_ci_success.png
│   ├── terraform_init.png
│   ├── terraform_apply_output.png
│   └── all_workflows.png
└── README.md
```

---

## CI/CD Pipeline Specifications (Rubric Compliance)

### 1. Frontend Continuous Integration (`frontend-ci.yaml`)
- **Triggers**: `pull_request` against `main` (paths: `frontend/**`), manual via `workflow_dispatch`.
- **Parallel Jobs**:
  - `lint`: Node 18 setup, cache `~/.npm`, `npm ci`, `npm run lint`.
  - `test`: Node 18 setup, cache `~/.npm`, `npm ci`, `CI=true npm test`.
- **Build Job**:
  - Declares `needs: [lint, test]`.
  - Re-executes test suite (`CI=true npm test`) as mandated by rubric.
  - Builds Docker image with `--build-arg=REACT_APP_MOVIE_API_URL`.

### 2. Backend Continuous Integration (`backend-ci.yaml`)
- **Triggers**: `pull_request` against `main` (paths: `backend/**`), manual via `workflow_dispatch`.
- **Parallel Jobs**:
  - `lint`: Python 3.10 setup, cache pipenv, `pipenv install --dev`, `pipenv run lint` (flake8).
  - `test`: Python 3.10 setup, cache pipenv, `pipenv install --dev`, `pipenv run test` (pytest).
- **Build Job**:
  - Declares `needs: [lint, test]`.
  - Builds backend Docker image: `docker build --tag=mp-backend:latest .`.

### 3. Frontend Continuous Deployment (`frontend-cd.yaml`)
- **Triggers**: `push` to `main` (paths: `frontend/**`), manual via `workflow_dispatch`.
- **Jobs**:
  - `lint` & `test`: Run in parallel.
  - `build-and-push`: Runs only after lint & test pass (`needs: [lint, test]`). Authenticates via `aws-actions/amazon-ecr-login@v2` with GitHub Secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`). Injects `REACT_APP_MOVIE_API_URL` as build argument. Tags image with `github.sha` and pushes to AWS ECR `frontend` repository.
  - `deploy`: Runs after `build-and-push`. Configures AWS credentials, runs `aws eks update-kubeconfig`, installs `kustomize` via `imranismail/setup-kustomize@v3`, sets image tag via `kustomize edit set image`, tags VPC subnets for AWS Load Balancers, and applies manifests with `kubectl apply -f -`.

### 4. Backend Continuous Deployment (`backend-cd.yaml`)
- **Triggers**: `push` to `main` (paths: `backend/**`), manual via `workflow_dispatch`.
- **Jobs**:
  - `lint` & `test`: Run in parallel.
  - `build-and-push`: Authenticates to AWS ECR, builds backend container, pushes to AWS ECR `backend` repository.
  - `deploy`: Connects to EKS cluster `cluster`, sets image tag via `kustomize`, tags VPC subnets for AWS Load Balancers, and executes `kustomize build | kubectl apply -f -`.

---

## Key Technical Solutions & Decisions

1. **uWSGI Modern GCC Compiler Compatibility**:
   - Newer GCC versions fail on legacy uWSGI function pointer signatures.
   - Solved by exporting `CFLAGS="-Wno-error=incompatible-pointer-types -Wno-error=implicit-function-declaration"` in the Dockerfile (`ENV CFLAGS=...`) and workflow environment settings.
2. **EKS Version Upgrade**:
   - AWS retired Kubernetes 1.25. Upgraded `k8s_version` in `setup/terraform/variables.tf` to `1.32`.
3. **Environment Variable Injection for React**:
   - React compiles static HTML/JS bundles that cannot read runtime OS environment variables in the browser.
   - `REACT_APP_MOVIE_API_URL` is passed as a Docker build argument during `docker build`, baking the live backend LoadBalancer URL directly into the frontend production build.
4. **AWS STS Session Token & Subnet Tagging**:
   - Dynamic support for temporary session credentials (`AWS_SESSION_TOKEN`) in GitHub Secrets.
   - Automatic VPC subnet tagging (`kubernetes.io/role/elb=1`) ensured instant provisioning of Classic Elastic Load Balancers in AWS.
5. **Zero Hardcoded Secrets**:
   - AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`) are stored solely in GitHub Secrets, adhering to strict security compliance.

---

## Deployment Guide (Step-by-Step)

### Step 1: Provision Cloud Infrastructure (Terraform)
```bash
cd setup/terraform
terraform init
terraform apply -auto-approve
```

Outputs obtained:
- `cluster_name`: `cluster`
- `cluster_version`: `1.32`
- `frontend_ecr`: `604976185525.dkr.ecr.us-east-1.amazonaws.com/frontend`
- `backend_ecr`: `604976185525.dkr.ecr.us-east-1.amazonaws.com/backend`
- `github_action_user_arn`: `arn:aws:iam::604976185525:user/github-action-user`

### Step 2: Grant EKS Access to GitHub Actions User
```bash
cd ../../setup
chmod +x init.sh
./init.sh
```

### Step 3: Configure GitHub Repository Secrets
Under your GitHub Repository > **Settings** > **Secrets and variables** > **Actions**, add:
- `AWS_ACCESS_KEY_ID`: AWS Access Key ID
- `AWS_SECRET_ACCESS_KEY`: AWS Secret Access Key
- `AWS_SESSION_TOKEN`: AWS Session Token (if using STS / temporary credentials)
- `AWS_REGION`: `us-east-1`
- `EKS_CLUSTER_NAME`: `cluster`
- `REACT_APP_MOVIE_API_URL`: `http://ab89cdcdaf2a14b8ea943919475bf685-1143139730.us-east-1.elb.amazonaws.com`

### Step 4: Run Pipelines
1. **Trigger Backend CD**:
   Push changes to `backend/**` or trigger `Backend Continuous Deployment` via GitHub Actions tab.
2. **Verify Backend Endpoint**:
   ```bash
   curl http://ab89cdcdaf2a14b8ea943919475bf685-1143139730.us-east-1.elb.amazonaws.com/movies
   ```
3. **Trigger Frontend CD**:
   Push changes to `frontend/**` or trigger `Frontend Continuous Deployment` via GitHub Actions tab.
4. **Access Live Frontend**:
   Open [http://afc41cd0a9bab41a7a963edf905ea6c6-243305316.us-east-1.elb.amazonaws.com](http://afc41cd0a9bab41a7a963edf905ea6c6-243305316.us-east-1.elb.amazonaws.com) in any web browser.

---

## Verification & Test Failure Simulation

### Pipeline Safety Guarantee:
To prove that the pipelines fail when tests fail (mandated by rubric):
1. In `backend/test_app.py`, change line 7 to set `FAIL_TEST = 500`.
2. Open a Pull Request on a feature branch.
3. Observe that GitHub Actions marks the `test` job as **FAILED** and the `build` job is **SKIPPED**.
4. Revert the test assertion back to `200` to restore the green passing status.

---

## Infrastructure Teardown (Cost Conservation)
Once verification is complete, tear down AWS resources to prevent ongoing cloud charges:
```bash
# 1. Delete Kubernetes LoadBalancers
kubectl delete svc frontend backend

# 2. Destroy Terraform Resources
cd setup/terraform
terraform destroy -auto-approve
```
