main.directive('chartBar', function() {
    var bar = charts.bar();    
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope: {
            data: '=',
            // barebone for now
            summed: '&'
        },
        link: function($scope, $element, $attr) {
            var div = d3.select($element[0]);
            bar.on('brush', function() {
                var extent = d3.event.target.extent(),
                    x = bar.x();
                $scope.summed({args:[extent, x]});
            });
            bar.on('brushend', function() {
                var extent = d3.event.target.extent(),
                    x = bar.x();
                $scope.summed({args:[extent, x]});
            });
            $scope.$watch('data', function(newVal, oldVal) {
                if(newVal) div.datum(newVal).call(bar);
            });
        }
    }
});