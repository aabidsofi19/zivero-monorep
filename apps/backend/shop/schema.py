import graphene
from graphene_django.types import ObjectType
import bson
from .models import Product, Category, Variant, Brand
from filters.schema import FilterInput
from .types import ProductsType, VariantType, ProductType, CategoryType, BrandType
from Orders.models import Order, OrderItem


class Query(ObjectType):

    Products = graphene.Field(
        ProductsType,
        filter=FilterInput(default_value=FilterInput.default()),
        pageNb=graphene.Int(default_value=1, required=False),
    )
    product = graphene.Field(ProductType, id=graphene.String())
    categories = graphene.List(CategoryType)
    variants = graphene.List(VariantType)
    brands = graphene.List(BrandType)

    def resolve_product(self, info, id, **kwargs):
        product = Product.objects(id=id).first()
        return product

    def resolve_Products(self, info, filter, pageNb=1, **kwargs):
        if not info.context.user.is_superuser:
            filter.status = "active"

        limit = 30
        offset = (pageNb - 1) * limit
        if filter:
            products_set = Product().filterby(filter)
            Products = products_set[offset : (offset + limit)]
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
        return categories

    def resolve_variants(self, info, **kwargs):
        return Variant.objects.all()

    def resolve_brands(self, info, **kwargs):
        return Brand.objects.all()


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
    status = graphene.String()
    price = graphene.Int()
    quantity = graphene.Int()
    discount_percent = graphene.Int()


class CategoryInput(graphene.InputObjectType):
    name = graphene.String()
    description = graphene.String()
    image = graphene.String()
    brands = graphene.List(graphene.String)
    genders = graphene.List(graphene.String)


class BrandInput(graphene.InputObjectType):
    name = graphene.String()
    logo = graphene.String()


class VariantInput(graphene.InputObjectType):
    name = graphene.String()
    value = graphene.String()


class createVariant(graphene.Mutation):
    class Arguments:
        input = VariantInput(required=True)

    variant = graphene.Field(VariantType)

    def mutate(self, info, input):
        variant = Variant(**input)
        variant.save()
        return createVariant(variant=variant)


class updateVariant(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        input = VariantInput(required=True)

    variant = graphene.Field(VariantType)

    def mutate(self, info, id, input):
        variant = Variant.objects(id=id).first()
        variant.update(**input)
        variant.save()
        return updateVariant(variant=variant)


class deleteVariant(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    variant = graphene.Field(VariantType)

    def mutate(self, info, id):
        variant = Variant.objects(id=id).first()
        variant.delete()
        return deleteVariant(variant=variant)


class createBrand(graphene.Mutation):
    class Arguments:
        input = BrandInput(required=True)

    brand = graphene.Field(BrandType)

    def mutate(self, info, input):
        brand = Brand(**input)
        brand.save()
        return createBrand(brand=brand)


class updateBrand(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        input = BrandInput(required=True)

    brand = graphene.Field(BrandType)

    def mutate(self, info, id, input):
        brand = Brand.objects(id=id).first()
        brand.update(**input)
        brand.save()
        brand.reload()
        return updateBrand(brand=brand)


class deleteBrand(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    brand = graphene.Field(BrandType)

    def mutate(self, info, id):
        brand = Brand.objects(id=id).first()
        brand.delete()
        return deleteBrand(brand=brand)


class createCategory(graphene.Mutation):
    class Arguments:
        input = CategoryInput()

    category = graphene.Field(CategoryType)

    def mutate(self, info, input):
        category = Category(
            name=input.name,
            description=input.description,
            image=input.image,
            brands=input.brands,
        )
        category.save()
        return createCategory(category=category)


class updateCategory(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        input = CategoryInput(required=True)

    category = graphene.Field(CategoryType)

    def mutate(self, info, id, input):
        category = Category.objects(id=id).first()
        clean_input = clean_category_input(input)
        if category:
            category.update(**clean_input)
            category.save()
            category.reload()
            return updateCategory(category=category)
        else:
            return updateCategory(category=None)


def clean_category_input(input):
    copy = {k: v for k, v in input.items() if v is not None}
    if copy.get("brands"):
        copy["brands"] = {bson.ObjectId(id) for id in copy["brands"]}
    return copy


class deleteCategory(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        category = Category.objects(id=id).first()
        if category:
            category.delete()
            return deleteCategory(success=True)
        else:
            return deleteCategory(success=False)


class createProduct(graphene.Mutation):
    product = graphene.Field(ProductType)

    class Arguments:
        pd = ProductInput()

    def mutate(root, info, pd):

        product = Product(**pd)
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

        product.update(**clean_input)
        product.reload()
        return updateProduct(product=product)


class deleteProduct(graphene.Mutation):

    product = graphene.Field(ProductType)

    class Arguments:
        id = graphene.String()

    def mutate(root, info, id):

        orders_for_product = OrderItem.objects.filter(product_id=id)

        if orders_for_product:
            raise Exception("Orders for this product exist")

        product = Product.objects(id=id).first()
        product.delete()
        return deleteProduct(product=product)


class Mutation(graphene.ObjectType):
    create_product = createProduct.Field()
    update_product = updateProduct.Field()
    delete_product = deleteProduct.Field()
    create_category = createCategory.Field()
    update_category = updateCategory.Field()
    delete_category = deleteCategory.Field()
    create_brand = createBrand.Field()
    update_brand = updateBrand.Field()
    delete_brand = deleteBrand.Field()
    create_variant = createVariant.Field()
    update_variant = updateVariant.Field()
    delete_variant = deleteVariant.Field()
