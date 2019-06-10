var ROUTES_INDEX = {
  "name": "<root>", "kind": "module", "className": "AppModule", "children": [{
    "name": "routes",
    "filename": "src/app/app.routing.module.ts",
    "module": "AppRoutingModule",
    "children": [{"path": "", "redirectTo": "/home", "pathMatch": "full"}, {
      "path": "home",
      "component": "HomePageComponent"
    }, {"path": "login", "component": "LoginComponent", "data": {"title": "Logowanie"}}, {
      "path": "signup",
      "component": "SignUpComponent",
      "data": {"title": "Rejestracja"}
    }, {
      "path": "products",
      "component": "ProductListComponent",
      "data": {"title": "Produkty", "animation": "ProductListPage"}
    }, {
      "path": "products/:subcategoryId",
      "component": "ProductListComponent",
      "data": {"animation": "ProductListPage"}
    }, {
      "path": "products/category/:categoryId",
      "component": "ProductListComponent",
      "data": {"animation": "ProductListPage"}
    }, {
      "path": "products/detail/:id",
      "component": "ProductDetailsComponent",
      "data": {"animation": "ProductDetailsPage"}
    }, {
      "path": "cart",
      "component": "ShoppingCartComponent",
      "canActivate": ["AuthGuard"],
      "data": {"roles": ["ROLE_USER"], "title": "Koszyk"}
    }, {
      "path": "account",
      "component": "MyAccountComponent",
      "canActivate": ["AuthGuard"],
      "data": {"roles": ["ROLE_USER"], "title": "Mojekonto"},
      "children": [{"path": "", "redirectTo": "personal-info", "pathMatch": "full"}, {
        "path": "personal-info",
        "component": "PersonalInfoComponent",
        "data": {"title": "Daneosobowe"}
      }, {"path": "orders", "component": "MyOrdersComponent", "data": {"title": "Zamówienia"}}, {
        "path": "orders/:id",
        "component": "OrderDetailComponent"
      }]
    }, {
      "path": "payment",
      "component": "PaymentComponent",
      "canActivate": ["AuthGuard"],
      "data": {"roles": ["ROLE_USER"], "title": "Składaniezamówienia"}
    }, {
      "path": "order-summary",
      "component": "OrderSummaryComponent",
      "canActivate": ["AuthGuard"],
      "data": {"roles": ["ROLE_USER"], "title": "Podsumowanie"}
    }, {
      "path": "support",
      "component": "SupportComponent",
      "canActivate": ["AuthGuard"],
      "data": {"roles": ["ROLE_USER"], "title": "Wsparcie"}
    }, {
      "path": "admin",
      "loadChildren": "./admin/admin.module#AdminModule",
      "canActivate": ["AuthGuard"],
      "data": {"roles": ["ROLE_ADMIN", "ROLE_WORKER"], "title": "Paneladministracyjny"},
      "children": [{
        "kind": "module",
        "children": [{
          "name": "routes",
          "filename": "src/app/admin/admin-routing.module.ts",
          "module": "AdminRoutingModule",
          "children": [{"path": "", "redirectTo": "account", "pathMatch": "full"}, {
            "path": "account",
            "component": "AccountComponent",
            "data": {"title": "Paneladministracyjny"},
            "children": [{"path": "", "redirectTo": "orders", "pathMatch": "full"}, {
              "path": "personal-info",
              "component": "CustomersComponent",
              "canActivate": ["AuthGuard"],
              "data": {"roles": ["ROLE_USER"], "title": "Klienci"}
            }, {
              "path": "personal-info/:id",
              "component": "PersonalInfoComponent",
              "canActivate": ["AuthGuard"],
              "data": {"roles": ["ROLE_USER"], "title": "Klienci-szczegóły"}
            }, {
              "path": "orders",
              "component": "OrdersComponent",
              "data": {"title": "Zamówienia"}
            }, {"path": "orders/:id", "component": "OrderDetailComponent"}, {
              "path": "products",
              "component": "ProductListComponent",
              "data": {"title": "Produkty"}
            }, {
              "path": "products/new",
              "component": "AddProductComponent",
              "data": {"title": "Dodajnowyprodukt"}
            }, {"path": "products/:id", "component": "ProductDetailsComponent"}]
          }],
          "kind": "module"
        }],
        "module": "AdminModule"
      }]
    }, {"path": "**", "component": "PageNotFoundComponent", "data": {"title": "Hurtpol-404"}}],
    "kind": "module"
  }]
};
