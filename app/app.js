/**
 * Created by Deb on 8/20/2014.
 */
(function () {
    "use strict";
    var app = angular.module("productManagement",
        ["common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "productResourceMock"]);

    app.config(["$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "welcomeView.html"
                })
                // Products
                .state("productList", {
                    url: "/products",
                    templateUrl: "products/productListView.html",
                    controller: "ProductListCtrl as vm"
                })
                .state("productEdit", {
                    abstract: true,
                    url: "/products/edit/:productId",
                    templateUrl: "products/productEditView.html",
                    controller: "ProductEditCtrl as vm",
                    resolve: {
                        productResource: "productResource",

                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get({ productId: productId }).$promise
                        }
                    }
                })
                .state("productEdit.info", {
                    url: "/info",
                    templateUrl: "products/productEditInfoView.html"
                })
                .state("productEdit.price", {
                    url: "/price",
                    templateUrl: "products/productEditPriceView.html"
                })
                .state("productEdit.tags", {
                    url: "/tags",
                    templateUrl: "products/productEditTagsView.html"
                })
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "products/productDetailView.html",
                    controller: "ProductDetailCtrl as vm",
                    resolve: {
                        productResource: "productResource",

                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get({ productId: productId}).$promise
                        }
                    }
                })

        }]
    );
}());