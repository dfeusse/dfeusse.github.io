/*
bookApp.factory('BookService', function($resource){
	return $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU',
	//return $resource('https://www.googleapis.com/books/v1/volumes?q=rand&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU&callback=JSON_CALLBACK',
        {action: "search"},//, callback: 'JSON_CALLBACK'},
        {get: {method: 'JSONP'}
    });
});
*/

bookApp.factory('BookService', function($resource){
	return $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU'
	//return $resource('https://www.googleapis.com/books/v1/volumes?q=rand&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU&callback=JSON_CALLBACK',
        //{action: "search"},//, callback: 'JSON_CALLBACK'},
        //{get: {method: 'JSONP'}
    );
});

/*
bookApp.factory('BookService', function($resource){
	return {
		fetchPopular: function(callback){
			// here is api credentials
			// for insta , need to get my own client id
			//var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
			//	client_id: 'a2bcad5de7ab400eb16b7cc8d2ff0d24'
			//var api = $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=:client_key&callback=JSON_CALLBACK',
			var api = $resource('https://www.googleapis.com/books/v1/volumes?q=fountainhead&key=:client_key&callback=JSON_CALLBACK',
			{client_key: 'AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU'},
			//{action: 'search'},
			{
				// where we put the action
				//JSONP requires that the callback=JSON_CALLBACK part is added to the URL.
				fetch:{method:'JSONP'}
			}); //end of api var
			
			api.fetch(function(response){
				// call supplied callback function
				//callback(response.data);
				callback(response.items);
				console.log(response)
			});
			
		}
	}
});
*/