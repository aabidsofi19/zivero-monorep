import environ
import os
import os.path
from pathlib import Path
from mongoengine import connect

# connect('zivero',host='mongodb://localhost:27017')
# connect('products',host='mongodb://25.19.8.34:27017')

connect('zivero', host='mongodb+srv://test-user:M7AbnQx3MQLZErZ@cluster0.n9vpu.mongodb.net/zivero?retryWrites=true&w=majority')



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))




env = environ.Env(
    # set casting, default value
    DEBUG=(bool, True)
)



# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.test.env'))



# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = ["localhost","127.0.0.1","192.168.43.82"]

# sentry

# import sentry_sdk
# from sentry_sdk.integrations.django import DjangoIntegration
# from sentry_sdk.integrations.redis import RedisIntegration
# sentry_sdk.init(
# dsn="https://411eefffeb484b99a8a7b37e028bb030@o497769.ingest.sentry.io/5578850",
# integrations=[DjangoIntegration(),
# RedisIntegration()
# ],

# # Set traces_sample_rate to 1.0 to capture 100%
# # of transactions for performance monitoring.
# # We recommend adjusting this value in production,
# traces_sample_rate=1.0,

# # If you wish to associate users to errors (assuming you are using
# # django.contrib.auth) you may enable sending PII data.
# send_default_pii=True
# )
# Application definition

INSTALLED_APPS = [
   
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'graphene_django',
    "graphql_auth",
    'shop.apps.ShopConfig',
    'corsheaders',
    "django_filters",
    "cart.apps.CartConfig",
    "wishlist.apps.WishlistConfig",
    "Orders.apps.OrdersConfig",
    "Users.apps.UsersConfig",
    "search.apps.SearchConfig",
    'graphql_jwt.refresh_token.apps.RefreshTokenConfig',
    'checkout.apps.CheckoutConfig',
    "social",
    "social_django",
    
]

MONGOADMIN_OVERRIDE_ADMIN = True
'''
SESSION_ENGINE = 'redis_sessions.session'
SESSION_REDIS = {
    'host': 'redis-19920.c14.us-east-1-2.ec2.cloud.redislabs.com',
    'port': '19920',
    'db': 0,
    'password': 'laIQX28R9zsfFpLpPjIPdOtJdFtD393D',
    'prefix': 'session',
    'socket_timeout': 1,
    'retry_on_timeout': False
}
'''
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '../cache',
    }
}

CORS_ALLOWED_ORIGINS = [


    "http://localhost:8080",
    "http://127.0.0.1:8080"
]
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
AUTH_USER_MODEL = "Users.User"

ROOT_URLCONF = 'Zivero.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Zivero.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
'''
DATABASES = {

    'default': {

        'ENGINE': 'django.db.backends.postgresql_psycopg2',

        'NAME': 'znmydypz',

        'USER': 'znmydypz',

        'PASSWORD': 'UdGQEH58tRSrOLBtihRh-eVDvF8TnkrH',

        'HOST': 'suleiman.db.elephantsql.com',

        'PORT': '5432',

    }

}'''
# mongodb
# connect('products',host='mongodb://localhost:27017')

EMAIL_USE_TLS = True
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = 587
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'


GRAPHENE = {
    'SCHEMA': 'Zivero.schema.schema',
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

AUTHENTICATION_BACKENDS = [
    # remove this
   
    # add thisi
    #  'social.backends.facebook.FacebookOAuth2',
    # 'social.backends.google.GoogleOAuth2',
    # 'social.backends.twitter.TwitterOAuth',
    'social_core.backends.linkedin.LinkedinOAuth2',
    'social_core.backends.instagram.InstagramOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
     "graphql_jwt.backends.JSONWebTokenBackend",
    "graphql_auth.backends.GraphQLAuthBackend",

]

# social_auth
SOCIAL_AUTH_FACEBOOK_KEY = env("SOCIAL_AUTH_FACEBOOK_KEY")   # App ID
SOCIAL_AUTH_FACEBOOK_SECRET = env("SOCIAL_AUTH_FACEBOOK_SECRET")  # App Secret

SOCIAL_AUTH_FACEBOOK_SCOPE = ['email', 'user_link']  # add this
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {       # add this
    'fields': 'id, name, email, picture.type(large), link'
}
SOCIAL_AUTH_FACEBOOK_EXTRA_DATA = [                 # add this
    ('name', 'name'),
    ('email', 'email'),
    ('picture', 'picture'),
    ('link', 'profile_url'),
]
#REGISTER_MUTATION_FIELDS_OPTIONAL = ['is_customer','customer']

GRAPHQL_AUTH = {
    # ...

    'REGISTER_MUTATION_FIELDS_OPTIONAL': [
        # ...
        'is_customer'
    ],

    # You can set the graphene base scalars:
    "REGISTER_MUTATION_FIELDS" :{
       "email": "String",
       "username": "String",
       
       'is_customer': 'Boolean',
    },

    "EMAIL_TEMPLATE_VARIABLES": {
        "frontend_domain": "http://localhost:8080"
    }
}

EMAIL_TEMPLATE_VARIABLES ={
        "frontend_domain": "http://localhost:8080"
    }

GRAPHQL_JWT = {
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LONG_RUNNING_REFRESH_TOKEN': True,

    "JWT_ALLOW_ANY_CLASSES": [
        "graphql_auth.mutations.Register",
        "graphql_auth.mutations.VerifyAccount",
        "graphql_auth.mutations.ResendActivationEmail",
        "graphql_auth.mutations.SendPasswordResetEmail",
        "graphql_auth.mutations.PasswordReset",
        "graphql_auth.mutations.ObtainJSONWebToken",
        "graphql_auth.mutations.VerifyToken",
        "graphql_auth.mutations.RefreshToken",
        "graphql_auth.mutations.RevokeToken",
        "graphql_auth.mutations.VerifySecondaryEmail",
    ],
}

CART_SESSION_ID = 'cart'


STRIPE_PUBLISHABLE_KEY = env("STRIPE_PUBLISHABLE_KEY")
STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY")


STRIPE_WEBHOOK_SECRET= env("STRIPE_WEBHOOK_SECRET")