import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django_redis import get_redis_connection

class MyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        request = data['request']
        user_id = data['userId']


        if request == 'get_notifications':
            redis_connection = get_redis_connection("default")
            key = f"{user_id}_notification_queue"
            #  check if there are any notifications in the queue and read each one of them until the queue is empty
            while redis_connection.llen(key) > 0:
                notification = redis_connection.rpop(key)
                await self.send(text_data=notification.decode('utf-8'))
                # wait for 1 second before sending the next notification
                await asyncio.sleep(5)

            



        else: 
            await self.send(text_data=json.dumps({
                'message': 'no request'
            }))
            return