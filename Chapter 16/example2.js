angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('DatepickerPopupDemoCtrl', function($scope) {
    $scope.endDate = new Date();
    $scope.dateInit = {
        startDate: new Date(),
        // endDate: new Date()
    }
    $scope.start = {
        opened: false,
        Open: function() {
            $scope.start.opened = true;
            console.log("start " + $scope.dateInit.startDate);
        },
        Options: {
            formatYear: 'yyyy',
            maxDate: $scope.endDate,
            startingDay: 1
        }
    }
    $scope.endOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: $scope.dateInit.startDate,
        startingDay: 1
    }
    $scope.endopened = false;
    $scope.endOpen = function() {
        $scope.endopened = true;
        // console.log($scope.endDate);
    }

    $scope.$watch('endDate', function(newValue, oldValue) {
        // $scope.start.Options.maxDate = newValue;
        console.log($scope.endDate);
    })
    
    $scope.$watch("dateInit.startDate", function(newValue, oldValue) {
        $scope.endOptions.minDate = newValue;
    })
});
