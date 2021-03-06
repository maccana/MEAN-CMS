'use strict';

angular.module('myApp.services', [])

.factory('pagesFactory', ['$http',
  function($http) {

    return {
      getPages: function() {
        return $http.get('/api/pages');
      },
      // Refactor if require separate save / edit
      savePage: function(pageData) {
        var id = pageData._id;

        if (id === '0') {
          return $http.post('/api/pages/add', pageData);
        } else {
          return $http.post('/api/pages/update', pageData);
        }
      },
      deletePage: function(id) {
        return $http.delete('/api/pages/' + id);
      },
      getAdminPageContent: function(id) {
        return $http.get('/api/pages/admin-details/' + id);
      },
      getPageContent: function(url) {
        return $http.get('/api/pages/details/' + url);
      },
    };
  }
])
.factory('AuthService', ['$http', function($http) {
  return {
    login: function(credentials) {
      return $http.post('/api/login', credentials);
    },
    logout: function() {
    //  debugger;
      return $http.get('/api/logout');
    }
  };
}])
.factory('myHttpInterceptor', ['$q', '$location', function($q, $location) {
    return {
        response: function(response) {
            return response;
        },
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/admin/login');
                return $q.reject(response);
            }
            return $q.reject(response);
        }
    };
}]);
