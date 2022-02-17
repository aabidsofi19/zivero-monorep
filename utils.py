import graphene
import graphene.relay as relay


class CountableConnectionBase(relay.Connection):
    class Meta:
        abstract = True

    total_items = graphene.Int()

    def resolve_total_items(self, *args, **kwargs):
        return self.length
