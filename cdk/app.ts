import * as cdk from "aws-cdk-lib"

import { prefix } from "./constants"
import { BucketDeploymentStack } from "./stacks/bucket-deployment-stack"
import { BucketStack } from "./stacks/bucket-stack"
import { CloudfrontStack } from "./stacks/cloudfront-stack"
import { LambdaStack } from "./stacks/lambda-stack"
import { RestApiStack } from "./stacks/rest-api-stack"

const app = new cdk.App()

const lambdaStack = new LambdaStack(app, `${prefix}-lambda-stack`)
const restApiStack = new RestApiStack(app, `${prefix}-rest-api-stack`, { lambda: lambdaStack.lambda })
const bucketStack = new BucketStack(app, `${prefix}-bucket-stack`)
new CloudfrontStack(app, `${prefix}-cloudfront-stack`, { restApi: restApiStack.restApi, bucket: bucketStack.bucket })
new BucketDeploymentStack(app, `${prefix}-bucket-deployment-stack`, { destinationBucket: bucketStack.bucket })
