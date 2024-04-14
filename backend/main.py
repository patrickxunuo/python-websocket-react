import asyncio
import random
from textblob import TextBlob
import websockets
import json

async def handler(websocket, path):
    await asyncio.sleep(2.5)
    # Generating a random text blob (paragraph)
    tb = "This is a simple example to demonstrate how to send data from a backend to a frontend. We can generate a more complex paragraph using other techniques or libraries if needed."

    # Splitting the paragraph into words
    # Sending each word with a delay
    for word in tb:
        await websocket.send(json.dumps({"word": word}))
        # Wait for 1-2 seconds before sending the next word
        await asyncio.sleep(random.uniform(0, 0.25))  # random.uniform for non-integer delay

start_server = websockets.serve(handler, "127.0.0.1", 8888)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
