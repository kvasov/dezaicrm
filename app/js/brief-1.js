app.controller('BriefCtrl', function ($scope, $filter, brief1Service) {
  $scope.init = function (data) {
    var intervalSelect2 = setInterval(function () {
      if ($('.select2').length > 0) {
        $scope.select2Init();
        clearInterval(intervalSelect2);
      }
    });
    $scope.questions[12].val = data.email;
    $scope.questions[13].val = data.phone;
  };

  $scope.canSend = false;

  $scope.files = {
    files_styles: [],
    files_colors: [],
    files_pets: [],
    files_furnituresinc: [],
    files_interior: [],
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
      name: 'King bed',
    },
    {
      id: 1,
      name: 'Single bed',
    },
    {
      id: 2,
      name: 'Sofa',
    },
    {
      id: 3,
      name: 'Bedside tables',
    },
    {
      id: 4,
      name: 'Working zone',
    },
    {
      id: 5,
      name: 'Dresser',
    },
    {
      id: 6,
      name: 'Planned cabinet',
    },
    {
      id: 7,
      name: 'Fireplace',
    },
    {
      id: 8,
      name: 'Fireplace',
    },
    {
      id: 9,
      name: 'Built-in wardrobe',
    },
    {
      id: 10,
      name: 'Cloakroom system',
    },
    {
      id: 11,
      name: 'Audio/video equipment',
    },
    {
      id: 12,
      name: 'Cradle',
    },
    {
      id: 13,
      name: 'Example of a long name variant',
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
      name: 'Modern',
      img: 'modern.jpg',
      val: 0,
    },
    {
      id: 7,
      name: 'Loft',
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

  $scope.colors = [
    {
      id: 0,
      name: 'Consult with a designer',
      val: 0,
    },
    {
      id: 1,
      name: 'White',
      img: 'white.jpg',
      val: 0,
    },
    {
      id: 2,
      name: 'Contrasting colours',
      img: 'contrasting_colours.jpg',
      val: 0,
    },
    {
      id: 3,
      name: 'Monochrome',
      img: 'monochrome.jpg',
      val: 0,
    },
    {
      id: 4,
      name: 'Pastel',
      img: 'pastel.jpg',
      val: 0,
    },
    {
      id: 5,
      name: 'Muted',
      img: 'muted.jpg',
      val: 0,
    },
    {
      id: 6,
      name: 'Warm',
      img: 'warm.jpg',
      val: 0,
    },
    {
      id: 7,
      name: 'Colourful',
      img: 'colourful.jpg',
      val: 0,
    },
    {
      id: 8,
      name: 'Cold',
      img: 'cold.jpg',
      val: 0,
    },
  ];

  $scope.things_dont_like = [
    {
      id: 0,
      name: 'Glossy surfaces',
    },
    {
      id: 1,
      name: 'Open spaces',
    },
    {
      id: 2,
      name: 'Dark colours',
    },
    {
      id: 3,
      name: 'White walls',
    },
    {
      id: 4,
      name: 'Cupboard with glass',
    },
  ];

  $scope.premises = [
    {
      id: 0,
      name: 'Bedroom',
    },
    {
      id: 1,
      name: 'Guest room/2nd bedroom',
    },
    {
      id: 2,
      name: 'Nursery',
    },
    {
      id: 3,
      name: 'Kids room',
    },
    {
      id: 4,
      name: 'Guest room',
    },
    {
      id: 5,
      name: 'Office',
    },
    {
      id: 6,
      name: 'Living room',
    },
    {
      id: 7,
      name: 'Kitchen',
    },
    {
      id: 8,
      name: 'Dining room',
    },
    {
      id: 9,
      name: 'Combined bathroom',
    },
    {
      id: 10,
      name: 'Toilet',
    },
    {
      id: 11,
      name: 'Bathroom',
    },
  ];

  $scope.pets = [
    {
      id: 0,
      name: 'Cat',
    },
    {
      id: 1,
      name: 'Dog',
    },
    {
      id: 2,
      name: 'Exotic pets',
    },
    {
      id: 3,
      name: 'Fishes',
    },
  ];

  $scope.channels = [
    {
      id: 0,
      name: 'E-mail',
    },
    {
      id: 1,
      name: 'WhatsApp',
    },
    {
      id: 2,
      name: 'Telegram',
    },
    {
      id: 3,
      name: 'Phone',
    },
    {
      id: 4,
      name: 'Video Call',
    },
  ];

  $scope.budgets = [
    {
      id: 0,
      name: 'up to 1000€',
    },
    {
      id: 1,
      name: '1 000 — 3 000 €',
    },
    {
      id: 2,
      name: '3 000 — 6 000 €',
    },
    {
      id: 3,
      name: '6 000 — 9 000 €',
    },
    {
      id: 4,
      name: '9 000 + €',
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
    {
      id: 4,
      name: 'Colour palette',
      colors: {
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
    },
    {
      id: 5,
      name: 'Things that you don`t like to see in your interior',
      things: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
      },
      comment: '',
    },
    {
      id: 6,
      name: 'Other things that you want us to know, like materials, items that you like to keep etc.',
      val: 0,
      comment: '',
    },
    {
      id: 7,
      name: 'What premises are planned?',
      premises: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
      },
      comment: '',
    },
    {
      id: 8,
      name: 'Pets',
      pets: {
        0: false,
        1: false,
        2: false,
        3: false,
      },
      comment: '',
    },
    {
      id: 9,
      name: 'Have you got any hobbies?',
      val: 0,
      comment: '',
    },
    {
      id: 10,
      name: 'Do you have any furniture or other items that should be included in the design project? Please add with dimensions.',
      val: 0,
      comment: '',
    },
    {
      id: 11,
      name: 'Preferred communication channels',
      channels: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
      },
      comment: '',
    },
    {
      id: 12,
      name: 'E-mail address',
      val: '',
    },
    {
      id: 13,
      name: 'Phone nr',
      val: '',
    },
    {
      id: 14,
      name: 'Budget for decoration',
      subname: 'This budget includes all materials, lightning and furniture.',
      val: 2,
      comment: '',
    },
    {
      id: 15,
      name: 'Add images that you want your interior to resemble',
      subname: 'Минимум 5 изображений',
      comment: '',
    },
  ];

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
    designer = false;
    for (key in target) {
      if (target[key]) {
        if (key == 0) {
          designer = true;
        }
        countCheckedItems++;
      }
    }
    if (designer) {
      return true;
    } else if (countCheckedItems > 2) {
      return true;
    }
  };

  $scope.checkDesigner = function (target) {
    if (target[0]) {
      for (key in target) {
        if (key != 0) {
          target[key] = false;
        }
      }
    }
  };

  $scope.select2Init = function () {
    setTimeout(function () {
      $('.select-room select').select2({
        minimumResultsForSearch: -1,
      });
    }, 10);
  };

  $scope.removeFile = function (fileType, index) {
    $scope.files[fileType].splice(index, 1);
  };

  $scope.validate = function () {
    $scope.canSend = true;

    $scope.questions[0].rooms.forEach((room, i) => {
      roomHasFurnitures =
        $filter('filter')(room.furnitures, function (value, index) {
          return value == true;
        }).length > 0;
      if (!roomHasFurnitures && $scope.questions[0].rooms.length > 0) {
        $scope.removeRoom(i);
      }
    });
    if (!roomHasFurnitures) {
      $scope.canSend = false;
      $scope.questions[0].error = true;
    } else {
      $scope.questions[0].error = false;
    }

    // question 1
    number_people = parseInt($scope.questions[1].number_people);
    if (Number.isInteger(number_people) && number_people > 0) {
      $scope.questions[1].error = false;
    } else {
      $scope.canSend = false;
      $scope.questions[1].error = true;
    }

    // question 3
    countCheckedItems = 0;
    for (key in $scope.questions[3].styles) {
      if ($scope.questions[3].styles[key]) {
        countCheckedItems++;
      }
    }
    if (countCheckedItems == 0) {
      $scope.canSend = false;
      $scope.questions[3].error = true;
    } else {
      $scope.questions[3].error = false;
    }

    // question 4
    countCheckedItems = 0;
    for (key in $scope.questions[4].colors) {
      if ($scope.questions[4].colors[key]) {
        countCheckedItems++;
      }
    }
    if (countCheckedItems == 0) {
      $scope.canSend = false;
      $scope.questions[4].error = true;
    } else {
      $scope.questions[4].error = false;
    }

    // question 6
    if ($scope.questions[6].val == 1 && $scope.questions[6].comment == '') {
      $scope.canSend = false;
      $scope.questions[6].error = true;
    } else {
      $scope.questions[6].error = false;
    }
  };

  $scope.send = function () {
    $scope.validate();
    if ($scope.canSend) {
      console.log('send');
      // brief1Service.send($scope.questions);
    }
  };
});

app.service('brief1Service', function ($http, httpPostFactory) {
  this.send = function (data) {
    console.log(data);
    $http.post('uploadpost.php', { brief: data }).success(function (response) {
      console.log(response);
    });

    $scope.filesForUploading = false;

    for (var key in $scope.files) {
      if ($scope.files.hasOwnProperty(key) && !/errors/.test(key)) {
        $scope.files[key].forEach((file, i) => {
          var formData = new FormData();

          if (!file.done) {
            formData.append(key + '_' + i, file._file);
            file.done = true;

            httpPostFactory(
              'upload.php?target=' + key,
              formData,
              function (callback) {
                console.log(callback);
              }
            );
          }
        });
      }
    }

    // if ($scope.filesForUploading) {
    //   httpPostFactory('upload.php', formData, function (callback) {
    //     console.log(callback);
    //   });
    // }
  };

  return this;
});
