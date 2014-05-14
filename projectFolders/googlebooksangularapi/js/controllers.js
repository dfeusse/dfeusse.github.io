/*
function SwitchableGridController($scope, instagram){
	//default layout
	$scope.layout = 'grid';

	$scope.pics = [];
	// now use insta service to fetch list of popular pics
	instagram.fetchPopular(function(data){
		//assigning the pics array will cause view to automatically be redrawn by angular
		$scope.pics = data; //**pics is what you reference in html as data in the controller
		console.log(data)
	});
}
*/

bookApp.controller('SwitchableGridController', //['$scope', 'Restangular', 
	function($scope, BookService){
	    $scope.searchTerm = "";
	    //$scope.mediaType = "all";
	    $scope.filterTerm = "";
	    //$scope.sortProp = "artistName";
	    //$scope.showFlag = false;
	    $scope.layout = 'grid';

		//$scope.pics = []; THIS MAY BE NEEDED

	    $scope.doSearch = function () {
	        //var type = $scope.mediaType;
	        //if ($scope.mediaType=="all")  type="";
	        //MediaService.get({term:$scope.searchTerm,entity:type},function(response){
	        BookService.get({action:$scope.searchTerm},function(response){
	            $scope.pics = response.items;
	            console.log('$$$$$$$$$$$$$$$')
	            console.log(response.items)
	        });
	    }
		/*
	    $scope.playVideo = function(item) {
	        $scope.showFlag = true;
	        $scope.url = item.previewUrl;
	        if  (item.trackName != null) $scope.title = item.trackName
	        else $scope.title = item.collectionName;

	        $scope.artist = item.artistName;
	    }

	    $scope.closeVideo = function() {
	        $scope.showFlag = false;
	    }
		*/
});
//}]);