# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Frontend

A simple React + TypeScript app using Vite is located in the `frontend` directory.

Install dependencies and run the development server:
```bash
cd frontend
npm install
npm run dev
```
Build production assets:
```bash
npm run build
```
The CDK stack will deploy the assets from `frontend/dist` to an S3 static website bucket. Ensure you build the frontend before deploying:
```bash
npm run build && npx cdk deploy
```
