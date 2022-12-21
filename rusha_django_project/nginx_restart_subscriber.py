import redis
import os


con = redis.Redis(host='localhost', port=6379, db=0)

message = con.get('nginx_restart')
print(message)

if message == b'1':
    con.set('nginx_restart', '0')
    os.system("docker exec rusha_nginx nginx -s reload")








