import graphene
import requests
from graphql_jwt.shortcuts import get_token
from Users.schema import UserType
from .utils import get_access_token,auth


class SocialAuth(graphene.Mutation):
    user= graphene.Field(UserType)
    token =graphene.String()
    class Arguments:
        code=graphene.String()
        provider=graphene.String()
    def mutate(self,info,code,provider,**kwargs):
        response=get_access_token(code,provider=provider)
        
        access_token=response['access_token']
        user=auth(request=info.context,token=access_token,backend=provider)

        jwt_token=get_token(user=user)
        if user and jwt_token:
            return SocialAuth(user=user,token=jwt_token)

            
 
class Mutations(graphene.ObjectType):
    social_auth = SocialAuth.Field()        








