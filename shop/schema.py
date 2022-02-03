import graphene
from graphene_django.types import ObjectType

from .models import Product, Category, Variant
from filters.schema import FilterInput
from .types import ProductsType, VariantType, ProductType, CategoryType


class Query(ObjectType):

    Products = graphene.Field(
        ProductsType,
        filter=FilterInput(),
        pageNb=graphene.Int(default_value=1, required=False),
    )
    product = graphene.Field(ProductType, id=graphene.String())
    categories = graphene.List(CategoryType)
    variants = graphene.List(VariantType)

    def resolve_product(self, info, id, **kwargs):
        product = Product.objects(id=id).first()
        # print(product)
        return product

    def resolve_Products(self, info, filter={}, pageNb=1, **kwargs):
        # print("fetching products")
        # print("pagenb :- ",pageNb)
        limit = 30
        offset = (pageNb - 1) * limitBrandType, VariationType, SubCategoryType
        if filter:
            products_set = Product().filterby(filter)
            Products = products_set[offset : (offset + limit)]
            # print(products_set.count())
        else:
            products_set = Product.objects()
            Products = products_set[offset : (offset + limit)]

        response = ProductsType(
            products=Products,
            total_products=products_set.count(),
            page_no=pageNb,
            total_pages=products_set.count() / limit + 1,
        )
        return response

    def resolve_categories(self, info, **kwargs):
        categories = Category.objects.all()
        # print(categories)
        return categories

    def resolve_variants(self, info, **kwargs):
        return Variant.objects.all()


"""


class Variant(Document):
    name = StringField()
    value = StringField(unique=True)


class Variation(EmbeddedDocument):
    _id = ObjectIdField(required=True, default=lambda: ObjectId())
    variant = ListField(ReferenceField(Variant))
    sku = UUIDField(default=lambda: (uuid.uuid4()))
    quantity = IntField()
    available = BooleanField(default=True)
    price = IntField(required=True)
    discount_percent = IntField(required=False, default=0)
    images = ListField(URLField())
    meta = {"strict": False}

"""


class VariationInput(graphene.InputObjectType):

    quantity = graphene.Int()
    available = graphene.Boolean()
    price = graphene.Int()
    discount_percent = graphene.Int()
    images = graphene.List(graphene.String)
    sku = graphene.UUID()
    variant = graphene.List(graphene.ID)


class ProductInput(graphene.InputObjectType):

    name = graphene.String()
    gender = graphene.String()
    brand = graphene.String()
    category = graphene.String()
    description = graphene.String()
    variations = graphene.List(VariationInput)
    tags = graphene.List(graphene.String)
    images = graphene.List(graphene.String)
    # available = graphene.Boolean()
    status = graphene.String()
    price = graphene.Int()
    quantity = graphene.Int()
    discount_percent = graphene.Int()


class createProduct(graphene.Mutation):
    product = graphene.Field(ProductType)

    class Arguments:
        pd = ProductInput()

    def mutate(root, info, pd):

        product = Product(**pd)
        # print(pd)

        product.save()

        return createProduct(product=product)


class Mutation(graphene.ObjectType):
    create_product = createProduct.Field()
