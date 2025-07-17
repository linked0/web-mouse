import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class WebMouseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    dotenv.config();

    const lambdaFunction = new lambda.Function(this, 'WebMouseFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'main.handler',
      environment: {
        VERSION: process.env.VERSION || '0.0',
      }
    });

    const functionUrl = lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE, // No authentication for simplicity
      cors: {
        allowedOrigins: ['*'], // Allow all origins for CORS
        allowedMethods: [lambda.HttpMethod.ALL], // Allow all methods
        allowedHeaders: ['*'], // Allow all headers for CORS
      }
    });

    new cdk.CfnOutput(this, 'Url', {
      value: functionUrl.url,
      description: 'The URL of the WebMouse Lambda function',
    });

    // Static React app hosting
    const siteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      // Add this block to explicitly allow public access
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '..', 'frontend', 'dist'))],
      destinationBucket: siteBucket,
    });

    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: siteBucket.bucketWebsiteUrl,
      description: 'The URL of the static website hosted on S3',
    });
  }
}
