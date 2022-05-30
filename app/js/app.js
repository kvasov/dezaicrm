// var app = angular.module('myApp', []);

// app.controller('MainCtrl', function ($scope, httpPostFactory) {
//   $scope.files = {
//     fileTmp: [],
//     file1: [],
//     file1errors: [],
//     file2: [],
//     file2errors: [],
//   };
//   $scope.showProgress = false;
//   $scope.addfile = function (file) {
//     $scope.files.fileTmp.push(file);
//   };
//   $scope.upload = function () {
//     var formData = new FormData();
//     for (var key in $scope.files) {
//       console.log();

//       if ($scope.files.hasOwnProperty(key) && !/errors/.test(key)) {
//         $scope.files[key].forEach((file, i) => {
//           if (!file.done) {
//             formData.append(key + '_file_' + i, file._file);
//             file.done = true;
//           }
//         });
//       }
//     }

//     httpPostFactory('upload.php', formData, function (callback) {
//       console.log(callback);
//     });
//   };
//   $scope.removeFile = function (fileType, index) {
//     console.log(index);
//     console.log(fileType);
//     console.log($scope.files[fileType]);
//     $scope.files[fileType].splice(index, 1);
//   };
// });

// app.directive('ngFileModel', [
//   '$parse',
//   function ($parse) {
//     return {
//       restrict: 'A',
//       scope: false,
//       link: function (scope, element, attrs) {
//         var model = $parse(attrs.filetype);
//         var modelErrors = $parse(attrs.errors);
//         // var isMultiple = attrs.multiple;
//         // var modelSetter = model.assign;
//         // var modelErrorsSetter = modelErrors.assign;
//         element.bind('change', function () {
//           var values = [];
//           angular.forEach(element[0].files, function (item) {
//             var value = {
//               name: item.name,
//               size: item.size,
//               type: item.type,
//               url: URL.createObjectURL(item),
//               _file: item,
//             };
//             if (
//               item.size < 1024 * 1024 * 5 &&
//               /\/(png|jpeg|jpg|gif|pdf)$/.test(item.type)
//             ) {
//               scope.files[attrs.filetype].push(value);
//             } else {
//               scope.files[attrs.errors].push(value);
//             }
//           });
//           scope.$apply(function () {
//             // Object.assign(scope[model], values);
//             // Object.assign(scope[modelErrors], errors);
//             // modelErrorsSetter(scope, errors);
//             // if (isMultiple) {
//             //   modelSetter(scope, values);
//             // } else {
//             //   modelSetter(scope, values[0]);
//             // }
//           });
//         });
//       },
//     };
//   },
// ]);

// app.directive('dropzone', function () {
//   return {
//     restrict: 'A',
//     link: function (scope, elem) {
//       elem.bind('dragover', function (e) {
//         e.stopPropagation();
//         e.preventDefault();
//       });
//       elem.bind('dragenter', function (e) {
//         e.stopPropagation();
//         e.preventDefault();
//         scope.$apply(function () {
//           scope.divClass = 'on-drag-enter';
//         });
//       });
//       elem.bind('dragleave', function (e) {
//         e.stopPropagation();
//         e.preventDefault();
//         scope.$apply(function () {
//           scope.divClass = '';
//         });
//       });
//       elem.bind('drop', function (evt) {
//         evt.stopPropagation();
//         evt.preventDefault();
//         window.console.log('listener worked!');
//         var files = evt.dataTransfer.files;
//         for (var i = 0, f; (f = files[i]); i++) {
//           var reader = new FileReader();
//           reader.readAsArrayBuffer(f);

//           reader.onload = (function (theFile) {
//             return function (e) {
//               var newFile = {
//                 name: theFile.name,
//                 type: theFile.type,
//                 size: theFile.size,
//                 lastModifiedDate: theFile.lastModifiedDate,
//                 _file: theFile,
//                 url: URL.createObjectURL(theFile),
//               };
//               scope.addfile(newFile);
//               $scope.$apply();
//             };
//           })(f);
//         }
//       });
//     },
//   };
// });

// app.factory('httpPostFactory', function ($http) {
//   return function (file, data, callback) {
//     $http
//       .post(file, data, {
//         transformRequest: angular.identity,
//         headers: { 'Content-Type': undefined, 'Process-Data': false },
//         uploadEventHandlers: {
//           progress: function (e) {
//             if (e.lengthComputable) {
//               $scope.showProgress = true;
//               $scope.progressBar = (e.loaded / e.total) * 100;
//               $scope.progressCounter = $scope.progressBar.toFixed(2) + ' %';
//             }
//           },
//         },
//       })
//       .success(function (response) {
//         console.log(response);
//         if (response.error) {
//           $scope.error = true;
//           $scope.errorMessage = response.message;
//         } else {
//           $scope.success = true;
//           $scope.successMessage = response.message;
//         }
//       });

//     $http
//       .post(file, data, {
//         transformRequest: angular.identity,
//         headers: { 'Content-Type': undefined, 'Process-Data': false },
//       })
//       .success(function (response) {
//         $scope.response_msg = response;
//       });
//   };
// });
