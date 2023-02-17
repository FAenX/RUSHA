
from django_redis import get_redis_connection


class RedisConnection(object):
    def __init__(self, server='default'):
        self.connection = get_redis_connection(server)

    def insert_key_value_pair(self, key, value):
        self.connection.set(key, value)

    def get_value(self, key):
        return self.connection.get(key)
    
    def delete_key(self, key):
        self.connection.delete(key)

    def get_all_keys(self):
        return self.connection.keys()
    
    def insert_list(self, key, value):
        self.connection.lpush(key, value)

    