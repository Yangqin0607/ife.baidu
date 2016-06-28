angular.module("sportsStore")
.constant("productListPageCount",2)
.constant("productActiveClass","btn-primary")
.controller("productListCtrl",function($scope,$filter,productActiveClass,productListPageCount,cart){
	var selectedCategory=null;
	$scope.selectedPage=1;
	$scope.pageSize=productListPageCount;

	$scope.selectCategory=function(newCategory){
		selectedCategory=newCategory;
		$scope.selectedPage=1;
	}
	$scope.categoryFilterFn=function(product){
		return selectedCategory==null||product.category==selectedCategory;
	}
	$scope.getCategoryClass=function(category){
		return selectedCategory==category?productActiveClass:"";
	}
	$scope.selectPage=function(newPage){
		$scope.selectedPage=newPage;
	}
	$scope.getPageClass=function(page){
		return $scope.selectedPage==page?productActiveClass:"";
	}
	$scope.addProductToCart=function(product){
		cart.addProduct(product.id,product.name,product.price);
	}
});