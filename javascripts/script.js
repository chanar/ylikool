    // JavaScript Document

$(document).ready(function() { 
    
});


// shortcut for console.log
function cl(data) {
    console.log(data);
}

var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.unique']);
//var scotchApp = angular.module('scotchApp', ['ui.unique']);

    scotchApp.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://heli.er.ee/helid/oy/**']);
        
        // The blacklist overrides the whitelist so the open redirect here is blocked.
        $sceDelegateProvider.resourceUrlBlacklist([
        'http://myapp.example.com/clickThru**']);
    });


	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/otsi.html',
				controller  : 'otsiController'
			})

			.when('/otsi', {
				templateUrl : 'pages/otsi.html',
				controller  : 'otsiController'
			})

            .when('/esinejad', {
				templateUrl : 'pages/esinejad.html',
				controller  : 'otsiController'
			})

            .when('/teemad', {
				templateUrl : 'pages/teemad.html',
				controller  : 'otsiController'
			})
        
            .when('/loeng/:name', { 
                templateUrl: 'pages/loeng.html', 
                controller: 'CMSController' 
            })
    });

    scotchApp.filter('searchFilter', function() {
        return function(lectures, searchText) {

            var regexp = new RegExp(searchText, 'i');
            return lectures.filter(function(lecture) {
                var found = false;
                //!TODO: Add whatever other fields need to be searched
                if (lecture.title.search(regexp) > -1) {
                    found = true;
                }
                if (lecture.tag.search(regexp) > -1) {
                    found = true;
                }
                if (!found) {
                    lecture.authors.some(function(author) {
                        found = author.search(regexp) > -1;
                        return found;
                    });
                }

                return found;
            });
        };
    });


	scotchApp.controller('mainController', function($scope) {
    });

    scotchApp.controller('otsiController', function($scope) {
        $scope.db = db;        
    });

    scotchApp.controller('CMSController', function($scope, $route, $routeParams) {
        $scope.message = 'JOU. '+$routeParams.name;
        var nid = $routeParams.name;
        var data = db[nid];
        $scope.title = data.title;
        $scope.tag = data.tag;
        $scope.file = data.file;
        $scope.fileUrl = "http://heli.er.ee/helid/oy/"+data.file+".mp3";
        $scope.text = data.text;
        $scope.year = data.year;
        $scope.authors = data.authors;   
        $scope.sound = data.sound;   
        $scope.editor = data.editor;   
        $scope.nid = nid; 
    })


