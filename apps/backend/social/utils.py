import requests
from django.conf import Settings
from social_django.utils import load_strategy, load_backend
#
uri_facebook="https://graph.facebook.com/v9.0/oauth/access_token"

SOCIAL_AUTH_FACEBOOK_KEY = '217051536716231'   # App       ID                                               
SOCIAL_AUTH_FACEBOOK_SECRET =  '87fad01d2fde1ef80c3ba6a76e753a62' # App Secret
payload_facebook={
        'client_id':SOCIAL_AUTH_FACEBOOK_KEY,
        'redirect_uri':'http://localhost:8080/admin',
        'client_secret':SOCIAL_AUTH_FACEBOOK_SECRET,
        
        }
def get_access_token(code_grant,provider):
    if provider=='facebook':
        code=code_grant
        payload_facebook['code']=code
        #print(payload_facebook)
        r=requests.get(uri_facebook,params=payload_facebook)
        return r.json()
def auth(request,token,backend):
    #request = info.context 
    uri='social:complete'
    strategy=load_strategy(request)
    backend = load_backend(strategy, backend, uri)
    user = backend.do_auth(token)
    return user


