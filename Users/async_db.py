import asyncpg

#import django
#from django.conf import settings
#import os
#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Zivero.settings')


#settings.configure()
#django.setup()

from Users.models import User

query=User.objects.all()
db={ 
        'NAME': 'znmydypz',

        'user': 'znmydypz',

        'password': 'UdGQEH58tRSrOLBtihRh-eVDvF8TnkrH',

        'host': 'suleiman.db.elephantsql.com',

        'port': '5432',

        
        }
async def fetch(query):
    conn =await asyncpg.connect(**db)
    async with conn as con:
        con.execute(str(query.query))



