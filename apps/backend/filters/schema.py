# from Users.schema import UpdateAddressMutation
from unicodedata import category
import graphene
from graphene_mongo import MongoengineObjectType
from importlib_metadata import List
from shop.models import Brand, SubCategory, Category, Product, Variant
from shop.types import BrandType, CategoryType


class sub_filter(graphene.ObjectType):
    filter = graphene.String()
    values = graphene.List(graphene.String)


class FilterType(graphene.ObjectType):
    genders = graphene.List(graphene.String)
    categories = graphene.List(CategoryType)
    sub_categories_filters = graphene.List(graphene.String)
    variation_filters = graphene.List(sub_filter)
    brands = graphene.List(BrandType)
    tags = graphene.List(graphene.String)


def variant_values(variant_filter):  # returns values for a variant filter
    return [v for v in Variant.objects(name=variant_filter).distinct("value")]


class FiltersQuery(graphene.ObjectType):
    filters = graphene.Field(FilterType)

    def resolve_filters(self, info, **kwargs):
        # categories = [c.name for c in Category.objects.only('name')]
        categories = Category.objects.all()
        sub_categories = [s.name for s in SubCategory.objects.all()]
        variant_filters = [v for v in Variant.objects().distinct("name")]
        # print(variant_filters)

        variation_filters = [
            {"filter": f, "values": variant_values(f)} for f in variant_filters
        ]
        # print(variation_filters)

        product_brands = Brand.objects.all()
        # print(product_brands)
        tags = [t for t in Product.objects().distinct("tags")]
        filter = {
            "categories": categories,
            "sub_categories_filters": sub_categories,
            "genders": [choice for choice, _ in Category.gender_choices],
            # product related like brand
            "brands": product_brands,
            "variation_filters": variation_filters,
            "tags": tags,
        }

        return filter


class VariantsFilterInput(graphene.InputObjectType):
    name = graphene.List(graphene.String, required=False)
    values = graphene.List(graphene.String, required=False)


class SortOptions(graphene.Enum):
    PriceLowToHigh = "variations__price"
    PriceHighToLow = "-variations__price"
    WhatsNew = "-created_at"
    BetterDiscount = "-variations__discount_percent"
    Popularity = "-popularity"


class FilterInput(graphene.InputObjectType):
    categories = graphene.List(graphene.String, required=False)
    gender = graphene.String(required=False)
    status = graphene.String(required=False, default_value="active")
    sub_categories = graphene.List(graphene.String, required=False)
    brands = graphene.List(graphene.String, required=False)
    variant_filters = graphene.List(VariantsFilterInput, required=False)
    tags = graphene.List(graphene.String, required=False)
    sort_by = graphene.Field(SortOptions)

    @classmethod
    def default(cls):
        meta = cls._meta
        fields = meta.fields
        default_fields = {name: field.default_value for name, field in fields.items()}
        container = meta.container
        return container(**default_fields)


##### custom filter to use in model #######


# trying inverted tree
# currently updates categories and brands acoording to gender and also brands according to categories
# also needs to update gender and categories according to brand


def cleaned_filter(filter):
    cleaned_filter = {}
    for k, v in filter.items():
        if type(v) == list and (None not in v) and len(v) > 0:
            cleaned_filter[k] = v
        elif type(v) == str and (v != None):
            cleaned_filter[k] = v
    return cleaned_filter


def update_filter(filter):
    print("raw", filter)
    filter = cleaned_filter(filter)
    print("cleaned filter", filter)
    if filter.get("gender"):
        in_genders = [filter.get("gender")]
    else:
        in_genders = None
    in_categories = filter.get("categories")
    in_brands = filter.get("brands")
    categories = None
    product_brands = None
    genders = None
    print(in_brands, in_categories, in_genders)
    # category_names = None
    # if the user has already selected all filters thers no update .. we are skipping updates for variant filters
    if len(filter) >= 3:

        return {"categories": categories, "brands": product_brands, "genders": genders}

    if in_genders and in_categories:
        # update_brands
        print("c", in_categories)
        categories_ = Category.objects(id__in=in_categories, gender__in=in_genders)
        print(categories_)
        product_brands = {
            brand for category in categories_ for brand in category.brands
        }

    elif in_genders and in_brands:
        # update_categorie
        categories = Category.objects(genders__in=in_genders, brands__in=in_brands)
        # category_names=[category.name for category in categories_]

    elif in_categories and in_brands:
        # update genders
        categories_ = Category.objects(id__in=in_categories, brands__in=in_brands)
        genders = {gender for category in categories_ for gender in category.genders}

    elif in_genders:
        # update brands and cats
        categories = Category.objects(genders__in=in_genders)
        product_brands = {brand for category in categories for brand in category.brands}
        # category_names=[category.name for category in categories_]
    elif in_categories:
        # update genders and brands
        categories_ = Category.objects(id__in=in_categories)
        genders = {gender for category in categories_ for gender in category.genders}
        product_brands = {
            brand for category in categories_ for brand in category.brands
        }

    elif in_brands:
        # update genders and categories
        categories = Category.objects(brands__in=in_brands)
        genders = {gender for category in categories for gender in category.genders}
        # category_names=[category.name for category in categories_]

    data = {"categories": categories, "brands": product_brands, "genders": genders}
    print(data)
    return data


class UpdateFilterMutation(graphene.Mutation):
    updated_filters = graphene.Field(FilterType)

    class Arguments:
        filter = FilterInput()

    def mutate(self, info, filter):
        # print("filter updates", filter)
        filter_updates = update_filter(filter)
        return UpdateFilterMutation(updated_filters=filter_updates)


class Mutation(graphene.ObjectType):
    updateFilters = UpdateFilterMutation.Field()
