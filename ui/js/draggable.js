var freeDraggerModule = angular.module('freeDragger', []);

freeDraggerModule.directive('messageta', ['$document', function ($document) {
    return {
        link: function (scope, element, attribute) {

            element.css({
                color: 'blue'
            });

            element.on('keyup', function (event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                console.log(element.val());

                persistTextAreaText(element.val());
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                function persistPos() {
                    console.log(y);
                    //$http.post("url?x="+x+"&y="+y);
                }

                persistPos();
            }


        }
    }
}]);


freeDraggerModule.directive('draggable', ['$document', function ($document) {
    return {
        link: function (scope, element, attribute) {
            var startX = 0, startY = 0, x = 0, y = 0;

            element.css({
                position: 'relative',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer'
            });

            element.on('mousedown', function (event) {
                // Prevent default dragging of selected content
                //event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                function persistPos() {
                    console.log(y);
                    //$http.post("url?x="+x+"&y="+y);
                }

                persistPos();
            }


        }
    }
}]);
