import angular from "angular";
import {app} from '../app.js';

//Сервис по возврату данных с json списка товаров телефонов
app.factory('forecast', ['$http', function($http) {
    return $http.get('./phones/phones.json')
        .then(function(data) {
            return data;
        });
}]);
