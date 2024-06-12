# Backend

Use install dependency for database first migration of models:

- pip install mssql-django

Python Django Debugger is built in the launch.json file

# Cloud Hosting

Docker: platform designed to make it easier to develop, deploy, and run applications by using containers. Containers allow a developer to package up an application with all parts it needs, such as libraries and dependencies, and ship it all out as one package.

- Docker Images Built through command line (docker-compose up)
- Docker images can now be stored within Amazon Elastic Container Registry
  - AWS ECR: Fully managed Docker Container registry that makes it easy to store, manage, and deploy Docker container images
  - Store each docker image within its own Repository within the registry, ensure name of repository matches the docker image name
- Amazon Elastic Container Service can be used to deploy containers to the web
  - AWS ECS: fully managed container orchestration service provided by Amazon Web Services.
  - easily run, manage, and scale containerized applications using Docker containers
  - Built in the AWS console, connected to AWS Elastic Compute Cloud (EC2), and allocates hardware to host your app

# Frontend

Sending emails are configured with Amazon AWS Simple Email Service (IAM credentials one directory up)

- All emails in sandbox mode must be verified
- In production mode, email addresses do not have to be verified to have emails sent
- AWS SES email triggered by AWS Lambda Function (SES client within the function)
- Lambda Function is triggered calling a POST endpoint with the email content within the body

AWS Login Workaround:
Original: The solution linked by Joelster's comment worked for me.

One quick workaround is to modify c:\Users\username\.docker\config.json file. Remove the following line so docker will use file system to store tokens:

          "credsStore": "wincred"
