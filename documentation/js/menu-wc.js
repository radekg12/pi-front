'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
  constructor() {
    super();
    this.isNormalMode = this.getAttribute('mode') === 'normal';
  }

  connectedCallback() {
    this.render(this.isNormalMode);
  }

  render(isNormalMode) {
    let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">portal-app documentation</a>
                </li>

                <li class="divider"></li>
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ''}
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${isNormalMode ?
      'data-target="#modules-links"' : 'data-target="#xs-modules-links"'}>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#components-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"' : 'data-target="#xs-components-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"'}>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="components-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"' :
      'id="xs-components-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"'}>
                                            <li class="link">
                                                <a href="components/AccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrdersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrdersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"' : 'data-target="#xs-injectables-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"' :
      'id="xs-injectables-links-module-AdminModule-ecf9ef500a0253383fb722dd54ad9090"'}>
                                        <li class="link">
                                            <a href="injectables/TitleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TitleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#components-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"' : 'data-target="#xs-components-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"'}>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="components-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"' :
      'id="xs-components-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"'}>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyAccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyOrdersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MySlickCarouselComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MySlickCarouselComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderSummaryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderSummaryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaymentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PersonalInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingCartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShoppingCartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SupportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SupportComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"' : 'data-target="#xs-injectables-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"' :
      'id="xs-injectables-links-module-AppModule-800f1dcd50cc649608a3c886006cc084"'}>
                                        <li class="link">
                                            <a href="injectables/ProductService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-AppRoutingModule-8bea33d49231a99afc1e4cb52a502cca"' : 'data-target="#xs-injectables-links-module-AppRoutingModule-8bea33d49231a99afc1e4cb52a502cca"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-AppRoutingModule-8bea33d49231a99afc1e4cb52a502cca"' :
      'id="xs-injectables-links-module-AppRoutingModule-8bea33d49231a99afc1e4cb52a502cca"'}>
                                        <li class="link">
                                            <a href="injectables/TitleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TitleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#components-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"' : 'data-target="#xs-components-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"'}>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="components-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"' :
      'id="xs-components-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"'}>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#directives-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"' : 'data-target="#xs-directives-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"'}>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="directives-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"' :
      'id="xs-directives-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"'}>
                                        <li class="link">
                                            <a href="directives/MyCurrencyFormatterDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyCurrencyFormatterDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#pipes-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"' : 'data-target="#xs-pipes-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"'}>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="pipes-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"' :
      'id="xs-pipes-links-module-SharedModule-d2aa6f1d0011b845c538d4c13f16624f"'}>
                                            <li class="link">
                                                <a href="pipes/PlnCurrencyPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlnCurrencyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PostcodePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PostcodePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#components-links"' :
      'data-target="#xs-components-links"'}>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${isNormalMode ? 'id="components-links"' : 'id="xs-components-links"'}>
                            <li class="link">
                                <a href="components/OrderDetailComponent-1.html" data-type="entity-link">OrderDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PersonalInfoComponent-1.html" data-type="entity-link">PersonalInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductDetailsComponent-1.html" data-type="entity-link">ProductDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductListComponent-1.html" data-type="entity-link">ProductListComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#classes-links"' :
      'data-target="#xs-classes-links"'}>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/AddressModel.html" data-type="entity-link">AddressModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Authority.html" data-type="entity-link">Authority</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartItem.html" data-type="entity-link">CartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Customer.html" data-type="entity-link">Customer</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeliveryType.html" data-type="entity-link">DeliveryType</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link">Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderPosition.html" data-type="entity-link">OrderPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderStatus.html" data-type="entity-link">OrderStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderStatusCategory.html" data-type="entity-link">OrderStatusCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderStatusCategoryAll.html" data-type="entity-link">OrderStatusCategoryAll</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentMethod.html" data-type="entity-link">PaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentPayUResponse.html" data-type="entity-link">PaymentPayUResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCartPosition.html" data-type="entity-link">ShoppingCartPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpecificationPosition.html" data-type="entity-link">SpecificationPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subcategory.html" data-type="entity-link">Subcategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Support.html" data-type="entity-link">Support</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#injectables-links"' :
      'data-target="#xs-injectables-links"'}>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'}>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link">CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryTypeService.html" data-type="entity-link">DeliveryTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link">MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link">OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderStatusCategoryService.html" data-type="entity-link">OrderStatusCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderStatusService.html" data-type="entity-link">OrderStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentMethodService.html" data-type="entity-link">PaymentMethodService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link">PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link">ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShoppingCartService.html" data-type="entity-link">ShoppingCartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SupportService.html" data-type="entity-link">SupportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TitleService.html" data-type="entity-link">TitleService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#interceptors-links"' :
      'data-target="#xs-interceptors-links"'}>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"'}>
                            <li class="link">
                                <a href="interceptors/AuthExpiredInterceptor.html" data-type="entity-link">AuthExpiredInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/JwtAuthorizationInterceptor.html" data-type="entity-link">JwtAuthorizationInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#guards-links"' :
      'data-target="#xs-guards-links"'}>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"'}>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#interfaces-links"' :
      'data-target="#xs-interfaces-links"'}>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'}>
                            <li class="link">
                                <a href="interfaces/EnumColor.html" data-type="entity-link">EnumColor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortByOption.html" data-type="entity-link">SortByOption</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#miscellaneous-links"'
      : 'data-target="#xs-miscellaneous-links"'}>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
    this.innerHTML = tp.strings;
  }
});
