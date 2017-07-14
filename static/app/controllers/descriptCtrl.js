import {app} from '../app.js';
import {descript} from '../servis/servisDescriptionPhone.js';

app.controller('descriptCtrl', ['$scope', '$http', '$location', '$templateCache', '$routeParams', 'descript','$localStorage',
    function($scope, $http, $location, $templateCache, $routeParams, descript, $localStorage) {

        $scope.$on('$routeChangeStart', function(event, next, current) {
            if (typeof(current) !== 'undefined'){
                $templateCache.remove(next.templateUrl);
            }
        });

        $scope.$on("$routeChangeSuccess", function () {
            $scope.id = $routeParams["phoneId"];    //вытягиваем с url параметр ид телефона
            if($scope.id !== 'undefined'){
                // console.log($scope.id);
            }
        });

        //Загрузка описание json description
        descript.then(function(data) {
            var arr =   data.data;      //получаем массив обьектов всех телефонов;
            for(var i = 0;i<arr.length;i++){
                if(arr[i].id == $scope.id){
                    $scope.detail = arr[i];
                    // console.log(arr[i].id);
                    //console.log(arr[i]);
                }
            }
        });

        //Смена главной картинки
        $scope.setImage = function(item){
            let img = angular.element(document.querySelector(".phone-images>img:nth-of-type(1)"));
            img.attr("ng-src", item.img);
            img.attr("src", item.img);

            // let div = angular.element(document.querySelector(".phone-images"));
            // img.remove();
            // let img2 = angular.element("<img>");
            // img2.attr("ng-src", item.img);
            // img2.attr("src", item.img)
            // img2.addClass("phone animated fadeInRight");
            // img2.css("animation-name", "fadeInRight");
            // div.after(img2);
        };



        //Реализация рейтинга товаров

        $scope.rateKey = $routeParams["phoneId"]+"rate";     //ид устройства на странице

        //Инициализация и сохранение в local storege
        if(!$localStorage[$scope.rateKey]){
            $localStorage[$scope.rateKey] = {like: 0, dislike: 0};
            $scope.rateProd = $localStorage[$scope.rateKey];           //инициализация свойства для авторизации
            scoreRate($scope.rateProd.like, $scope.rateProd.dislike);
        }else if($localStorage[$scope.rateKey]){
            $scope.rateProd = $localStorage[$scope.rateKey];           //инициализация свойства для авторизации
            scoreRate($scope.rateProd.like, $scope.rateProd.dislike);
        }


        //likes Up
        $scope.scoreUp = function(index){

            $localStorage[$scope.rateKey].like+=1;
            $scope.rateProd = $localStorage[$scope.rateKey];
            scoreRate($scope.rateProd.like, $scope.rateProd.dislike);
        };

        //Likes Down
        $scope.scoreDown = function(index){
            $localStorage[$scope.rateKey].dislike+=1;
            $scope.rateProd = $localStorage[$scope.rateKey];
            scoreRate($scope.rateProd.like, $scope.rateProd.dislike);
        };

        // меняем шкалу рейтинга по товару
        function scoreRate(up, down) {
            let rate =  (up / (up + down))*100;
            let progress = angular.element(document.querySelector(".progress-bar"));
            progress.css("width", rate +"%");
        }


}]);