export default () => ({
  products: {
    Products: [],
    pageNo: 0,
    totalPages: 0,
    totalProducts: 0,
  }, // state of products in products page

  home_page_products: {
    trending: [],
    new_arrivals: [],
    best_sellers: [],
  }, // state of products in home page

  filters: {}, // stores the filters recieved from server

  queryFilters: {}, // stores the filters for  querieng products from server

  categories: [],
  brands: [
    {
      name: "nike",
      image:
        "https://i.pinimg.com/originals/25/6c/19/256c19006b945701f7e2d080fde7b12d.jpg",
    },
    {
      name: "adidas",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ae900d42678283.57d36e2c13251.jpg",
    },
    {
      name: "puma",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ae900d42678283.57d36e2c13251.jpg",
    },
    {
      name: "reebok",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ae900d42678283.57d36e2c13251.jpg",
    },
  ],
  genders: [
    {
      name: "MEN",
      image:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11326924/2020/3/13/a977398d-4154-41de-a992-6018c0d36d221584097310888-Roadster-Men-Shirts-6761584097308773-1.jpg",
    },
    {
      name: "WOMEN",
      image:
        "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/4320668/2018/9/11/75dd2431-cd02-40e9-be90-728276c3ed3c1536644197227-Roadster-Women-Tops-5111536644195073-1.jpg",
    },
  ],

  product: {}, // state of product in product page

  selected: [],

  // queryFilters:{

  // },// for queries from home page for particular category or tag
  // queryVariationFilters:{},

  tempFilters: {},
});
