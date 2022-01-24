import django
from django.conf import settings

from django.core.cache import cache

from functools import wraps
#settings.configure()
#django.setup()

########cache decorator######
def graphql_cache(time_out=None):
    def graphql_cache(func):
        @wraps(func)
        def _cache(*args,**kwargs):
            info=args[1]
            query=info.context.body.decode('utf-8')
            #query=info
            query=query.replace('\\n','')
            query=''.join(query.split())
            cached_result=cache.get(query)
            if cached_result:
                #print('cached')
                return cached_result
            result=func(*args,**kwargs)
            if time_out:
                #print('time_out')
                cache.set(query,result,time_out)
            else:
                cache.set(query,result,30*40)
            return result
        return _cache
    return graphql_cache





