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

  $scope.styles = [
    {
      id: 0,
      name: 'Consult with a designer',
      val: 0,
    },
    {
      id: 1,
      name: 'Classic',
      img: 'classic.jpg',
      val: 0,
    },
    {
      id: 2,
      name: 'Modern classic',
      img: 'modern_classic.jpg',
      val: 0,
    },
    {
      id: 3,
      name: 'Art deco',
      img: 'art_deco.jpg',
      val: 0,
    },
    {
      id: 4,
      name: 'Minimalist',
      img: 'minimalist.jpg',
      val: 0,
    },
    {
      id: 5,
      name: 'Hi-Tech',
      img: 'hi_tech.jpg',
      val: 0,
    },
    {
      id: 6,
      name: 'modern',
      img: 'modern.jpg',
      val: 0,
    },
    {
      id: 7,
      name: 'loft',
      img: 'loft.jpg',
      val: 0,
    },
    {
      id: 8,
      name: 'Contemporary style',
      img: 'contemporary.jpg',
      val: 0,
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
      comment: '',
    },
    {
      id: 1,
      name: 'How many people live in your property?',
      number_people: 3,
    },
    {
      id: 2,
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
    {
      id: 3,
      name: 'Style preference quiz',
      subname: 'Please choose at least 3 different styles',
      styles: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
      },
      comment: '',
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

    $scope.select2Init();
  };

  $scope.setChildren = function (value) {
    $scope.questions[2].val = value;
    if (value == 1 && $scope.questions[2].childrens.length == 0) {
      $scope.addChildren();
    }
    if (value == 0) {
      $scope.questions[2].childrens = [];
    }
  };

  $scope.addChildren = function () {
    if ($scope.questions[2].childrens.length > 0) {
      id_tmp =
        $scope.questions[2].childrens[$scope.questions[2].childrens.length - 1]
          .id + 1;
    } else {
      id_tmp = 0;
    }
    $scope.questions[2].childrens.push({
      id: id_tmp,
      sex: 'm',
      y: 12,
    });
  };

  $scope.removeChildren = function (i) {
    if ($scope.questions[2].childrens.length == 1) {
      $scope.setChildren(0);
    }
    $scope.questions[2].childrens = angular.copy(
      $filter('filter')($scope.questions[2].childrens, function (value, index) {
        return value.id !== i;
      })
    );
  };

  $scope.disabledWhen3Items = function (target) {
    countCheckedItems = 0;
    for (key in target) {
      if (target[key]) {
        countCheckedItems++;
      }
    }
    if (countCheckedItems > 2) {
      return true;
    }
  };

  $scope.select2Init = function () {
    setTimeout(function () {
      $('.select-room select').select2({
        minimumResultsForSearch: -1,
      });
    }, 10);
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
