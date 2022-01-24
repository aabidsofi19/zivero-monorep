from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'Users'

    def ready(self):
        # Implicitly connect a signal handlers decorated with @receiver.
        from . import signals
