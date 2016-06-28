angular.module("sportsStore")
.controller("sportsStoreCtrl",function($scope){
	$scope.data={
		products:[
			{name:"Product#1",description:"description for Product#1",category:"category#1",price:100},
			{name:"Product#2",description:"description for Product#2",category:"category#1",price:200},
			{name:"Product#3",description:"description for Product#3",category:"category#2",price:300},
			{name:"Product#4",description:"description for Product#4",category:"category#2",price:400},
			{name:"Product#5",description:"description for Product#5",category:"category#3",price:500},
			{name:"Product#6",description:"description for Product#6",category:"category#3",price:600},
			{name:"Product#7",description:"description for Product#7",category:"category#3",price:700},
			{name:"Product#8",description:"description for Product#8",category:"category#3",price:800}
		]
	}
})