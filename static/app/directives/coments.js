import {app} from '../app.js';

app.directive('setComents', ['$localStorage', '$routeParams', '$http'
    ,function($localStorage, $routeParams, $http){
    return{
        restrict: 'E',
        scope:{

        },
        controller: "descriptCtrl",
        templateUrl: "./static/app/templates/coments.html",
        link: function(scope, element, attrs) {

            scope.idProperty = $routeParams["phoneId"];     //ид устройства на странице
            scope.auth = $localStorage.checkAuth;           //инициализация свойства для авторизации

            //проверка авторизации иналиция пользователя в базе
            scope.tryAuth = function(login, password){
                 $http.get('./phones/auth.json')
                    .then(function(data) {
                        let dataPass = data.data;

                        scope.checkAuth(dataPass, login, password);

                    });
            };

            scope.checkAuth = function(dataPass, login, password){
                //проверка есть ли клиентв списке проверяем весь список
                for(let i = 0; i< dataPass.length; i++){

                    //проверка правильно ли введен пароль
                    if(dataPass[i].user == login && dataPass[i].passowrd == password){
                        console.log('Есть');
                        $localStorage.checkAuth = true;                //флаг авторизации на странице товара
                        scope.auth = $localStorage.checkAuth;      //добавления флага в $localStorage
                    }

                    //проверка условаия если клиента нет в списке
                    if(dataPass[i].user !== login && dataPass[i].passowrd !== password && i == (dataPass.length -1)){
                        console.log('Нет');
                    }
                }
            };


            //инициализация место в $localStorage ид телефона будет его ключем
                if(!$localStorage[scope.idProperty]){
                    $localStorage[scope.idProperty] = [
                        {
                        id: "Test Id",
                        name: "Test",
                        date: "2017-07-13 19:44:46",
                        coment: "Lorem ipsum dolor sit amet, " +
                        "consectetur adipisicing elit. Accusantium facere fugit iure nesciunt nisi " +
                        "nobis porro repudiandae, ut voluptas. Amet cumque delectus " +
                        "eius enim eum hic quasi quidem, quisquam voluptas."
                        }
                    ];
                    scope.coments = $localStorage[scope.idProperty];

                }else if(!!$localStorage[scope.idProperty]){
                    scope.coments = $localStorage[scope.idProperty];
                }


            //добавление коментариев в описании товара и сохранение в localstorege
            scope.addComents = function(name, coment){
                this.date = new Date();
                //сохранение в localStorage
                $localStorage[scope.idProperty].push(
                    {
                        id: scope.idProperty,
                        name: name,
                        date: this.date,
                        coment: coment
                    });
                scope.coments = $localStorage[scope.idProperty];
            };



            //Добавление рейтинга по по коментарию пользователя
             function init_coments(){
                scope.rateNameComent = $routeParams["phoneId"]+$localStorage[scope.idProperty][0].name;
                //инициализаяция ключа для каждого комента комбинацией id товара и именем того кто писал комент

                //Инициализация и сохранение в local storege рейтинга коментариев для начального первого коментария

                if(!$localStorage[scope.rateNameComent]){
                    $localStorage[scope.rateNameComent] = {like: 0, dislike: 0};
                    scope.rateNameComent = $localStorage[scope.rateNameComent];           //инициализация свойства для авторизации
                }else if($localStorage[scope.rateNameComent]){
                    scope.rateNameComent = $localStorage[scope.rateNameComent];           //инициализация свойства для авторизации
                }
            }
            init_coments();



            //likes Up for coments
            scope.comentUp = function(index, _this){
                scope.rateNameComent = $routeParams["phoneId"]+$localStorage[scope.idProperty][index].name;
                if(!$localStorage[scope.rateNameComent]){
                    $localStorage[scope.rateNameComent] = {like: 0, dislike: 0};
                    $localStorage[scope.rateNameComent].like+=1;
                    scope.rateNameComent = $localStorage[scope.rateNameComent];           //инициализация свойства для авторизации
                }else if($localStorage[scope.rateNameComent]){
                    $localStorage[scope.rateNameComent].like+=1;
                    scope.rateNameComent = $localStorage[scope.rateNameComent];           //инициализация свойства для авторизации
                }
            };

            //likes Up for coments

            //ошибка что все свойства записывает с localstorege записывает в одну переменную rateNameComent по всем коментам

            scope.comentDown = function(index, _this){
                scope.rateNameComent = $routeParams["phoneId"]+$localStorage[scope.idProperty][index].name;
                if(!$localStorage[scope.rateNameComent]){
                    $localStorage[scope.rateNameComent] = {like: 0, dislike: 0};
                    $localStorage[scope.rateNameComent].dislike+=1;
                    scope.rateNameComent = $localStorage[scope.rateNameComent];           //инициализация свойства для авторизации
                }else if($localStorage[scope.rateNameComent]){
                    $localStorage[scope.rateNameComent].dislike+=1;
                    scope.rateNameComent = $localStorage[scope.rateNameComent];           //инициализация свойства для авторизации
                }

            };







            //Очистка формы
            scope.reset = function(item) {
                item.name = '';
                item.coment = '';
                item.login = '';
                item.password = '';
            };
        }

    };
}]);