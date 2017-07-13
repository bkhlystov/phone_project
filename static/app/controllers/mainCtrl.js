import angular from "angular";
import $ from 'jquery';
import {app} from '../app.js';
import {forecast} from '../servis/servisPhone.js';



app.controller("mainCtrl", ['$scope', 'forecast',
	//озвращает список телефонов
function($scope, forecast){
	forecast.then(function(data){
		$scope.phones = data.data;
	});

	$scope.orderProp = 'age';

}]);
