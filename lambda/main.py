def handler(event, context):
    """
    AWS Lambda function handler that processes an event and returns a response.
    
    Args:
        event (dict): The event data passed to the Lambda function.
        context (LambdaContext): The runtime information of the Lambda function.

    Returns:
        dict: A response containing the status code and a message.
    """
    print("Received event:", event)
    
    # Process the event here
    # For example, you could extract data from the event and perform some action
    
    response = {
        "statusCode": 200,
        "body": "Hello from Lambda! version 2.0 Wed Jul 16 11:15:25 KST 2025",
    }
    
    return response