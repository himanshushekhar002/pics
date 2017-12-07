/* 
 * To change $scope license header, choose License Headers in Project Properties.
 * To change $scope template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : June 19, 2017
 Author     : Himanshu Shekhar {himanshushekhar00@gmail.com}
 */
var power2smeChat = angular.module("app.chatui");

power2smeChat.directive('schrollBottom', function () {
    return {
        scope: {
            schrollBottom: "="
        },
        link: function (scope, element) {
            console.log('I am scrollBottom directive');
            scope.$watchCollection('schrollBottom', function (newValue) {
                if (newValue)
                {
                    var chat_view = document.getElementsByClassName('chat-view')[0];
                    console.log("ScrollHeight:" + chat_view.scrollHeight);
                    var scroll_height = chat_view.scrollHeight;
                    jQuery('.chat-view').animate({scrollTop: scroll_height + 500}, 2000, 'linear', function () {
                        //alert("Finished animating");
                    });
                }
            });
        }
    };
});


power2smeChat.directive("scroll", function ($window) {
    return {
        restrict: "A",
        scope: {
            myindex: "@",
            chatmessagelist: "=",
            sendcardrequest: "&"
        },

        link: function (scope, element, attrs) {
            element.on("scroll", function () {
                console.log('I am scroll directive');
                //console.log(this.scrollLeft + ":" + this.scrollWidth + ":" + 400);
                //console.log(scope.chatmessagelist[scope.myindex].scrollActive);
                if (scope.chatmessagelist[scope.myindex].scrollActive == true) {
                    if (this.scrollLeft >= ((this.scrollWidth - 1) - 400)) {
                        scope.chatmessagelist[scope.myindex].scrollActive = false;
                        scope.sendcardrequest();
                    }
                }
            });
        }
    };
});
power2smeChat.directive('picsView', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/chatui/chatview.html',
        link: function (scope, element, attrs) {
            console.log('I am chatui directive');
            try {
                scope.smeId = attrs.smeId;            
            } catch (exception) {
                console.log('NO SMEID ERROR');
            }
            try {
                scope.email = attrs.emailId;
//                scope.userdetail.email = attrs.emailId;
            } catch (exception) {
                console.log('NO EMAIL ERROR');
            }
            try {
                scope.phone = attrs.phone;
//                scope.userdetail.phone = attrs.phone;
            } catch (exception) {
                console.log(exception);
                console.log('NO POHONE FIELD');
            }               
        }
    };
});

power2smeChat.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (!event.ctrlKey && event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

power2smeChat.directive('ctrlEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.ctrlKey && event.which === 13) {
                console.log('CTRL + ENTER');
            }
            ;
        });
    };
});

power2smeChat.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);
  