(function() {
    "use strict"

    angular.module("productManagement")
        .controller("ProductEditCtrl",["product", ProductEditCtrl]);

    function ProductEditCtrl(product) {
        var vm = this;

        vm.product = product;

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        } else {
            vm.title = "New Product";
        }

        vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        };
    }
}());