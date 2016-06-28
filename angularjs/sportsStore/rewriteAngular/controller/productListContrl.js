angular.module("sportsStore")
.constant("productActiveClass","btn-primary")
.constant("productListSize",2)
.controller("productListCtrl",function($scope,productActiveClass,productListSize){
	var selectedCate=null;
	$scope.selectedPage=1;
	$scope.pageSize=productListSize;

	$scope.selectCategory=function(cate){
		selectedCate=cate;
		$scope.selectedPage=1;
	};
	$scope.categoryFilterFn=function(product){
		return selectedCate==null||selectedCate==product.category;
	};
	$scope.getCategoryClass=function(cate){
		return selectedCate==cate?productActiveClass:"";
	};
	$scope.selectPage=function(newPage){
		$scope.selectedPage=newPage;
	};
	$scope.getPageClass=function(page){
		return $scope.selectedPage==page?productActiveClass:"";
	}
});