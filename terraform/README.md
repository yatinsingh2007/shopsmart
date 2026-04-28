# Terraform — ShopSmart ECR Infrastructure

Provisions two **Amazon ECR** repositories (`shopsmart-server`, `shopsmart-client`) with lifecycle policies and an IAM push policy for CI/CD.

## Prerequisites

| Tool | Minimum version |
|------|----------------|
| [Terraform](https://developer.hashicorp.com/terraform/install) | 1.5.0 |
| [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) | 2.x |
| AWS credentials configured (`aws configure`) | — |

---

## Quick Start

### 1. Configure variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your preferred region / settings
```

### 2. Initialise Terraform

```bash
terraform init
```

### 3. Preview what will be created

```bash
terraform plan
```

### 4. Apply (create resources)

```bash
terraform apply
```

Type `yes` when prompted. After apply, the ECR repository URLs are printed as outputs:

```
Outputs:

client_ecr_repository_url = "123456789.dkr.ecr.us-east-1.amazonaws.com/shopsmart-client"
server_ecr_repository_url = "123456789.dkr.ecr.us-east-1.amazonaws.com/shopsmart-server"
```

---

## GitHub Actions — Required Secrets

Add the following secrets to your GitHub repository (**Settings → Secrets and variables → Actions**):

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | Access key ID for an IAM user/role with ECR push permissions |
| `AWS_SECRET_ACCESS_KEY` | Corresponding secret access key |
| `AWS_REGION` | AWS region (e.g. `us-east-1`) |
| `NEXT_PUBLIC_API_URL` | Public API URL passed as a build-arg to the client image |

> **Tip:** Attach the `shopsmart-ecr-push-policy` IAM policy (output by Terraform as `ecr_push_policy_arn`) to the IAM user whose credentials you use above.

---

## Pushing Images Manually

```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 \
  | docker login --username AWS --password-stdin \
    <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build and push server
docker build -t shopsmart-server ./server
docker tag  shopsmart-server:latest \
  <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/shopsmart-server:latest
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/shopsmart-server:latest

# Build and push client
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api \
  -t shopsmart-client ./client
docker tag  shopsmart-client:latest \
  <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/shopsmart-client:latest
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/shopsmart-client:latest
```

---

## Destroy Resources

```bash
terraform destroy
```

`force_delete = true` is set on both repositories so Terraform can delete them even if they contain images.

---

## File Structure

```
terraform/
├── main.tf                   # Provider + backend config
├── variables.tf              # Input variables
├── ecr.tf                    # ECR repos, lifecycle policies, IAM policy
├── outputs.tf                # Output values (repo URLs, ARNs)
├── terraform.tfvars.example  # Template — copy to terraform.tfvars
└── .gitignore                # Excludes state files and tfvars
```
