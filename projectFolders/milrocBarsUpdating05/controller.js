// Controllers
var MainController = ['$scope', function($scope) {

    $scope.uploadFile = function(){
        //$scope.data = [{"x":1,"y":16},{"x":2,"y":25},{"x":3,"y":30},{"x":4,"y":10}];
        var newData;
        var file = $scope.myFile;
        console.log('%%%%%%')
        console.log(file)

        var read = new FileReader();
        read.readAsBinaryString(file);

        read.onloadend = function() {

            //$scope.data = [{"x":1,"y":16},{"x":2,"y":25},{"x":3,"y":30},{"x":4,"y":10}];
            //$scope.data = read.result;
            var fileContentString = read.result;
            var fileContentObject = JSON.parse(fileContentString)
            $scope.data = fileContentObject;

            console.log('read result: ')
            console.log(read.result);
            newData = read.result;
            console.log('var var')
            console.log(newData)

            document.getElementById('dataResult').innerHTML = newData;
            //$scope.charts = {data: newData};
            $scope.$apply(function() {
                //$scope.charts = {data: [112, 16, 3, 15, 20, 14]};
                //$scope.charts = {data: newData};
                console.log('$$$$$$')
                console.log(newData)
            })
        }

        read.onprogress = function(data) {
            if (data.lengthComputable) {                                            
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                console.log('progress')
                console.log(progress + '%');
            }
        }

    };
/*
    $scope.randomize = function(n, y) {
        if (arguments.length < 2) y = 400;
        if (!arguments.length) n = 20;
        var i = 0;
        return d3.range(~~(Math.random()*n) + 1).map(function(d, i) { return {
            x: ++i,
             y: ~~(Math.random()*y)
        }});
    };
*/ 
    $scope.update = function() { 
        $scope.data = [{"x":1,"y":16},{"x":2,"y":25},{"x":3,"y":30},{"x":4,"y":10}];
        $scope.sum = 0;
    };  
           
    $scope.summed = function() {
        // there has to be a better way to pass variables,
        // still learning angular
        var extent = arguments[0][0], 
            x = arguments[0][1],
            l = $scope.data.length;
        $scope.sum = 0;
        for (var i = 0; i < l; i++) {
            var d = $scope.data[i];
            if (extent[0] <= x(d.x) && x(d.x) + x.rangeBand() <= extent[1]) {
                $scope.sum += d.y;
            }
        }
        $scope.$apply();
    };
    // Models
    $scope.sum = 0;
    //$scope.data = $scope.randomize(); 
    //$scope.data = $scope.randomize(); 
    //console.log($scope.data)
    $scope.data = [{"x":1,"y":166},{"x":2,"y":386},{"x":3,"y":235},{"x":4,"y":36},{"x":5,"y":46}];
    document.getElementById('dataResult').innerHTML = JSON.stringify($scope.data);
    //document.getElementById('dataResult').innerHTML = ($scope.data);
}];