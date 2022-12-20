import os
from celery import shared_task


@shared_task(bind=True)
def hello(*args, **kwargs):
    # return 'hello world'
    print(args, kwargs)
    print('hello world')

@shared_task(bind=True)
def hello_a():
    # return 'hello world'
    print('hello world')