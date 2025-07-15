import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class WebMouseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, 'WebMouseFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'main.handler',
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
  }
}
