resource "aws_s3_bucket" "cashie-lambda" {
    bucket = "cashie-lambda"
    force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "cashie-lambda" {
    bucket = aws_s3_bucket.cashie-lambda.id
    block_public_acls = true
    ignore_public_acls = true
    block_public_policy = true
    restrict_public_buckets = true
}

resource "aws_iam_role" "lambda_role" {
    name = "cashie_lambda_role"
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = "sts:AssumeRole"
                Effect = "Allow"
                Principal = {
                    Service = "lambda.amazonaws.com"
                }
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
    role = aws_iam_role.lambda_role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "cashie_lambda" {
    function_name = "cashie_lambda"
    runtime = "nodejs16.x"
    handler = "dbPinger.handler"
    
    s3_bucket = aws_s3_bucket.cashie-lambda.bucket
    s3_key = aws_s3_object.cashie-lambda.key

    source_code_hash = data.archive_file.cashie-lambda.output_base64sha256

    role = aws_iam_role.lambda_role.arn
}

resource "aws_cloudwatch_log_group" "cashie_lambda_log_group" {
    name = "/aws/lambda/${aws_lambda_function.cashie_lambda.function_name}"
    retention_in_days = 7
}

data "archive_file" "cashie-lambda" {
    type = "zip"
    source_dir = "../${path.module}/lambda"
    output_path = "../${path.module}/lambda.zip"
}

resource "aws_s3_object" "cashie-lambda" {
    bucket = aws_s3_bucket.cashie-lambda.bucket
    key = "lambda.zip"
    source = data.archive_file.cashie-lambda.output_path
    etag = data.archive_file.cashie-lambda.output_base64sha256
}

# Trigger the Lambda function with event bridge to run every day
resource "aws_cloudwatch_event_rule" "daily_trigger" {
    name = "daily_trigger"
    schedule_expression = "rate(1 day)"
}
resource "aws_cloudwatch_event_target" "lambda_trigger" {
    rule = aws_cloudwatch_event_rule.daily_trigger.name
    target_id = "cashie_lambda"
    arn = aws_lambda_function.cashie_lambda.arn
}
resource "aws_lambda_permission" "allow_eventbridge" {
    statement_id = "AllowExecutionFromEventBridge"
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.cashie_lambda.function_name
    principal = "events.amazonaws.com"
    source_arn = aws_cloudwatch_event_rule.daily_trigger.arn
}
resource "aws_sns_topic" "cashie_sns" {
    name = "cashie_sns"
}
