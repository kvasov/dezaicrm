app.controller('MainCtrl', function ($scope, httpPostFactory) {
  $scope.files = {
    file1: [],
    file1errors: [],
  };
  $scope.showProgress = false;
  $scope.filesForUploading = false;
  $scope.showBtns = false;
  $scope.showBtnsDo = function () {
    $scope.showBtns = true;
  };

  $scope.errorsStr = function () {
    var str = '';
    $scope.files.file1errors.forEach((file, i) => {
      str += file.name;
      if (i != $scope.files.file1errors.length - 1) {
        str += ', ';
      }
    });
    return str;
  };

  $scope.canSendCls = function () {
    if ($scope.files.file1.length == 0) {
      return 'disabled';
    }
    return '';
  };

  $scope.addfile = function (file) {
    $scope.files.file1.push(file);
  };
  $scope.upload = function () {
    $scope.filesForUploading = false;
    var formData = new FormData();
    for (var key in $scope.files) {
      if ($scope.files.hasOwnProperty(key) && !/errors/.test(key)) {
        $scope.files[key].forEach((file, i) => {
          if (!file.done) {
            formData.append(key + '_' + i, file._file);
            file.done = true;
            $scope.filesForUploading = true;
          }
        });
      }
    }

    if ($scope.filesForUploading) {
      httpPostFactory('upload.php', formData, function (callback) {
        console.log(callback);
      });
    }
  };

  $scope.removeFile = function (fileType, index) {
    console.log(index);
    console.log(fileType);
    console.log($scope.files[fileType]);
    $scope.files[fileType].splice(index, 1);
  };
});

app.directive('ngFileModel', function () {
  return {
    restrict: 'A',
    scope: false,
    link: function (scope, element, attrs) {
      element.bind('change', function () {
        var values = [];
        angular.forEach(element[0].files, function (item) {
          var value = {
            name: item.name,
            size: item.size,
            type: item.type,
            url: URL.createObjectURL(item),
            _file: item,
          };
          if (
            item.size < 1024 * 1024 * 5 &&
            /\/(png|jpeg|jpg|gif|pdf)$/.test(item.type)
          ) {
            if (typeof scope.showBtnsDo == 'function') {
              scope.showBtnsDo();
            }
            scope.files[attrs.filetype].push(value);
          } else {
            scope.files[attrs.errors].push(value);
          }
        });
        scope.$apply();
      });
    },
  };
});

app.directive('dropzone', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
      });
      elem.bind('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        scope.$apply(function () {
          scope.divClass = 'on-drag-enter';
        });
      });
      elem.bind('dragleave', function (e) {
        e.stopPropagation();
        e.preventDefault();
        scope.$apply(function () {
          scope.divClass = '';
        });
      });
      elem.bind('drop', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        window.console.log('listener worked!');
        // console.log(evt);
        var files = evt.originalEvent.dataTransfer.files;
        for (var i = 0, f; (f = files[i]); i++) {
          var reader = new FileReader();
          reader.readAsArrayBuffer(f);

          reader.onload = (function (theFile) {
            return function (e) {
              var newFile = {
                name: theFile.name,
                type: theFile.type,
                size: theFile.size,
                lastModifiedDate: theFile.lastModifiedDate,
                _file: theFile,
                url: URL.createObjectURL(theFile),
              };
              if (
                theFile.size < 1024 * 1024 * 5 &&
                /\/(png|jpeg|jpg|gif|pdf)$/.test(theFile.type)
              ) {
                scope.showBtnsDo();
                scope.files[attrs.filetype].push(newFile);
              } else {
                scope.files[attrs.errors].push(newFile);
              }
              // scope.addfile(newFile);
              $scope.$apply();
            };
          })(f);
        }
      });
    },
  };
});

app.factory('httpPostFactory', function ($http) {
  return function (file, data, callback) {
    $http
      .post(file, data, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined, 'Process-Data': false },
        uploadEventHandlers: {
          progress: function (e) {
            if (e.lengthComputable) {
              $scope.showProgress = true;
              $scope.progressBar = (e.loaded / e.total) * 100;
              // $scope.progressCounter = $scope.progressBar.toFixed(2) + ' %';
              if (e.loaded == e.total) {
                $scope.showProgress = false;
              }
            }
          },
        },
      })
      .success(function (response) {
        console.log(response);
        if (response.error) {
          $scope.error = true;
          $scope.errorMessage = response.message;
        } else {
          $scope.success = true;
          $scope.successMessage = response.message;
        }
      });

    // $http
    //   .post(file, data, {
    //     transformRequest: angular.identity,
    //     headers: { 'Content-Type': undefined, 'Process-Data': false },
    //   })
    //   .success(function (response) {
    //     $scope.response_msg = response;
    //   });
  };
});

app.filter('fileSize', function () {
  return function (input) {
    var size;
    size = Math.floor((input / 1024) * 100) / 100;
    return size + ' kb';
  };
});
