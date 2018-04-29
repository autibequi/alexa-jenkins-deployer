rm lambda.zip
zip -r lambda.zip index.js node_modules/
aws lambda update-function-code --function-name alexa-deployer --zip-file fileb://lambda.zip