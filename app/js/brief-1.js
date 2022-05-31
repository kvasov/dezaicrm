app.controller('BriefCtrl', function ($scope, $filter, brief1Service) {
  $scope.init = function () {
    var intervalSelect2 = setInterval(function () {
      if ($('.select2').length > 0) {
        $scope.select2Init();
        clearInterval(intervalSelect2);
      }
    });
  };

  $scope.rooms = [
    {
      id: 0,
      name: 'Кухня',
    },
    {
      id: 1,
      name: 'Коридор',
    },
    {
      id: 2,
      name: 'Балкон',
    },
  ];
  $scope.furnitures = [
    {
      id: 0,
      name: 'Диван',
    },
    {
      id: 1,
      name: 'Шкаф',
    },
    {
      id: 0,
      name: 'Кресло',
    },
  ];
  $scope.questions = [
    {
      id: 0,
      name: 'Мебель',
      rooms: [
        {
          id: 0,
          roomType: 0,
          furnitures: [],
        },
      ],
    },
    {
      id: 3,
      name: 'Children',
      val: 1,
      childrens: [
        {
          id: 0,
          sex: 'm',
          y: 12,
        },
      ],
    },
  ];

  $scope.send = function () {
    brief1Service.send($scope.questions);
  };

  $scope.addRoom = function () {
    $scope.questions[0].rooms.push({
      id:
        $scope.questions[0].rooms[$scope.questions[0].rooms.length - 1].id + 1,
      roomType: 0,
      furnitures: [],
    });

    $scope.select2Init();
  };

  $scope.removeRoom = function (i) {
    if ($scope.questions[0].rooms.length == 1) {
      console.log('Нельзя удалить последнюю комнату');
    } else {
      console.log('i = ', i);
      // $scope.questions[0].rooms.splice(i, 1);
      console.log(
        $filter('filter')($scope.questions[0].rooms, function (value, index) {
          return value.id !== i;
        })
      );
      $scope.questions[0].rooms = angular.copy(
        $filter('filter')($scope.questions[0].rooms, function (value, index) {
          return value.id !== i;
        })
      );
    }
  };

  $scope.setChildren = function (value) {
    $scope.questions[1].val = value;
    if (value == 1) {
      $scope.addChildren();
    }
  };

  $scope.addChildren = function () {
    if ($scope.questions[1].childrens.length > 0) {
      id_tmp =
        $scope.questions[1].childrens[$scope.questions[1].childrens.length - 1]
          .id + 1;
    } else {
      id_tmp = 0;
    }
    $scope.questions[1].childrens.push({
      id: id_tmp,
      sex: 'm',
      y: 12,
    });
  };

  $scope.removeChildren = function (i) {
    if ($scope.questions[1].childrens.length == 1) {
      $scope.setChildren(0);
    }
    console.log('i = ', i);
    console.log(
      $filter('filter')($scope.questions[1].childrens, function (value, index) {
        return value.id !== i;
      })
    );
    $scope.questions[1].childrens = angular.copy(
      $filter('filter')($scope.questions[1].childrens, function (value, index) {
        return value.id !== i;
      })
    );
  };

  $scope.select2Init = function () {
    setTimeout(function () {
      $('.select-room select').select2({
        minimumResultsForSearch: -1,
      });
    }, 100);
  };
});

app.service('brief1Service', function ($http) {
  this.send = function (data) {
    console.log(data);
    $http.post('uploadpost.php', { brief: data }).success(function (response) {
      console.log(response);
    });
  };

  return this;
});
