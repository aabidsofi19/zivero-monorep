import graphene
from graphene_django.types import ObjectType
from numpy import equal
import bson
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

        # if not info.context.user.is_superuser:
        #     filter["status"] = "active"

        limit = 30
        offset = (pageNb - 1) * limit
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


def clean_product_variation(data):
    copy = {k: v for k, v in data.items() if v != None}
    variants_cleaned = [bson.ObjectId(variant) for variant in data.variant]
    copy["variant"] = variants_cleaned
    return copy


def clean_product_update_input(data):
    copy = {k: v for k, v in data.items() if v != None}
    brand = copy.get("brand")
    category = copy.get("category")
    if brand:
        copy["brand"] = bson.ObjectId(brand)
    if category:
        copy["category"] = bson.ObjectId(category)

    variations_copy = []
    for variation in copy["variations"]:
        variations_copy.append(clean_product_variation(variation))

    copy["variations"] = variations_copy

    return copy


class updateProduct(graphene.Mutation):

    product = graphene.Field(ProductType)

    class Arguments:
        id = graphene.String()
        pd = ProductInput()

    def mutate(root, info, id, pd):
        product = Product.objects(id=id).first()
        clean_input = clean_product_update_input(pd)
        print(clean_input)

        product.update(**clean_input)
        product.reload()
        return updateProduct(product=product)


class deleteProduct(graphene.Mutation):

    product = graphene.Field(ProductType)

    class Arguments:
        id = graphene.String()

    def mutate(root, info, id):
        product = Product.objects(id=id).first()
        product.delete()
        return deleteProduct(product=product)


class Mutation(graphene.ObjectType):
    create_product = createProduct.Field()
    update_product = updateProduct.Field()
    delete_product = deleteProduct.Field()
