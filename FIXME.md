# @fixme :: Indicates places in the code to fix

1. Refactor API key validation with middleware
    Target files : js/server.js

    Status : 0%

2. Make the session id generation happen at server middleware level
    Make the nodeJS server recieve an api call telling it to generate
    a session id for username 'john doe', using the API key that is now
    safely validated and can't be stolen by a simple look at network tab.

    Status : 0%

3. Make the sid validation not vulnerable to SQL injections.
    Filter the sid and if possible make it unalterable by the user

    Status : 0%
