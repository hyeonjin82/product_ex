(function() {
    "use strict"

    angular.module("productManagement")
        .controller("ProductEditCtrl",["product", "$state", "toastr", "productService", ProductEditCtrl]);

    function ProductEditCtrl(product, $state, toastr, productService) {
        var vm = this;

        vm.product = product;
        vm.priceOption="percent";

        vm.jindate = new Date(1982, 7, 12);

        vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost)
        };

        vm.calculatePrice = function() {
            var price = 0;
            if(vm.priceOption == 'amount') {
                price = productService.calculateFromAmount( vm.product.cost, vm.markupAmount)
            }
            if(vm.priceOption == 'percent') {
                price = productService.calculateFromPercent( vm.product.cost, vm.markupPercent)
            }

            vm.product.price = price;
        };

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        } else {
            vm.title = "New Product";
        }

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened= !vm.opened;
        }

        vm.submit = function () {
            vm.product.$save();
            // toastr.success("Success","Save Successfully!");
        }

        vm.cancel = function(){
            $state.go('productList');
        }

        vm.addTags = function (tags) {
            if(tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags="";
            } else {
                alert("Please enter one or more tags separated by commas");
            }
        }
        vm.removeTag = function(idx){
            vm.product.tags.splice(idx,1);
        }
    }
}());