import angular from "angular";
import {app} from '../app.js';

//Сервис по возврату данных с json списка товаров телефонов
app.factory('descript', ['$http', function($http) {
    return $http.get('./phones/descript.json')
        .then(function(data) {
            return data;
        });
}]);
