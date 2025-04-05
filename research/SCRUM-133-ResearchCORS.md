# Research - Cross-Origin Resource Sharing (CORS)

## Why are you doing it?
Upon setting up a couple of api endpoint connections to the frontend, I found that the api code was brittle, setting up the second api connection broke the first. Although both calls worked in the end, I suspect my limited understanding of CORS and setting it up appropriately plaed a large part in breaking the code. I aim to improve my CORS understanding and refine how CORS is set up within the project. This will provide me a good foundation to implement JWT without repreatedly breaking existing connections.

## What do you expect to learn/do?
I plan to learn how to properly configure CORS headers, understand the same-origin policy, manage preflight requests, and implement appropriate access control patterns. This knowledge will help me create more robust API connections between our frontend components and backend endpoints.

## What do you expect to do with it?
I plan to refine/streamline the current CORS set up by following a more standard CORS intialization and utilizing decorators for api functions. 

## What Jira task(s) represent the work you will do that was/is dependent on this research/training?
SCRUM-94 - Connection Frontend to Backend
SCRUM-128 - User Authentication with JWT

## Resources
- [Medium: Understanding CORS](https://medium.com/itnext/understanding-cors-4157bf640e11) - Concise Introduction and Overview
- [Mozilla - Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) - Longer Overview - Descriptions of HTTP Headers
- [Flask-Cors Documentation](https://corydolphin.com/flask-cors/)


##Related Resources
- [HTTP Request Methods](https://www.freecodecamp.org/news/http-request-methods-explained/)