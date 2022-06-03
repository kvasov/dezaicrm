app.controller('BudgetController', function ($scope, BudgetService) {
  $scope.init = function (data) {
    $scope.budgetId = data.budget_id;
    $scope.rooms = data.rooms;
    $scope.initResponse(data);
    $scope.initActiveRoom();
    $scope.initCurrentRoom($scope.rooms[0]);
  };

  $scope.initResponse = function (response) {
    $scope.canToApproval = response.can_to_approval;
    $scope.answers = response.answers;
    $scope.state = response.state;
    $scope.comment = response.comment;
  };

  $scope.updatePrice = function (answerId, price) {
    BudgetService.manage($scope.budgetId, answerId, 'price', {
      price: price,
    })
      .then(function (response) {
        $scope.initResponse(response);
      })
      .catch(function (response) {});
  };

  // $scope.updateComment = function (comment) {
  //   BudgetService.manage($scope.budgetId, null, 'comment', {
  //     comment: comment,
  //   })
  //     .then(function (response) {
  //       $scope.initResponse(response);
  //     })
  //     .catch(function (response) {});
  // };

  $scope.getAnswerValue = function (answerId, value) {
    try {
      return $scope.answers[answerId][value];
    } catch (error) {
      null;
    }
  };

  $scope.answerSelected = function (answerId, price) {
    return $scope.getAnswerValue(answerId, 'price') === price;
  };

  $scope.answerCls = function (answerId, price) {
    if ($scope.answerSelected(answerId, price)) {
      return 'active';
    }
  };

  $scope.answerSelectedCount = function (answerIds) {
    var count;
    count = answerIds.length;
    _.each(answerIds, function (answerId) {
      if ($scope.getAnswerValue(answerId, 'price') === null) {
        count--;
      }
    });
    return count;
  };

  $scope.roomCls = function (answerIds) {
    var count;
    count = $scope.answerSelectedCount(answerIds);
    if (count === answerIds.length) {
      return 'complete';
    } else if (count > 0) {
      return 'current';
    } else {
      return '';
    }
  };

  $scope.amountCls = function () {
    var count;
    count = 0;
    _.each($scope.rooms, function (room) {
      if ($scope.roomCls(room.answer_ids) !== 'complete') {
        count++;
      }
    });

    if (count === 0 && $scope.activeRoom === null) {
      return 'current';
    }
  };

  // $scope.displayAmoun = function () {
  //   return $scope.amountCls() === 'current';
  // };

  $scope.nextCls = function (answerIds) {
    if ($scope.roomCls(answerIds) !== 'complete') {
      return 'disabled';
    }
  };

  $scope.minimizedCls = function (room) {
    if ($scope.minimizedRoom(room)) {
      return 'minimized';
    }
  };

  $scope.inStyle = function (room) {
    if ($scope.minimizedRoom(room)) {
      return 'none';
    } else {
      return 'block';
    }
  };

  $scope.minimizedRoom = function (room) {
    return $scope.roomCls(room.answer_ids) !== '' && $scope.activeRoom !== room;
  };

  $scope.displayRoom = function (room) {
    return $scope.roomCls(room.answer_ids) !== '' || $scope.activeRoom === room;
  };

  $scope.showTxt = function (answerIds) {
    if ($scope.roomCls(answerIds) === 'complete') {
      return 'Изменить';
    } else {
      return 'Вернуться к заполнению';
    }
  };

  $scope.initActiveRoom = function () {
    var selected;
    selected = false;
    _.each($scope.rooms, function (room) {
      if (!selected) {
        if ($scope.roomCls(room.answer_ids) !== 'complete') {
          $scope.activeRoom = room;
          selected = true;
          if ($('.right .room').length) {
            $('html, body').animate(
              {
                scrollTop: $('.right .room').last().offset().top,
              },
              1000
            );
          }
        }
      }
    });
    if (!selected) {
      $scope.activeRoom = null;
    }
  };

  // $scope.indexActiveRoom = function () {
  //   return $scope.rooms.indexOf($scope.activeRoom) + 1;
  // };

  // $scope.nextRoom = function () {
  //   return $scope.initActiveRoom();
  // };

  $scope.roomAmount = function (answerIds) {
    var from, to;
    from = 0;
    to = 0;
    _.each(answerIds, function (answerId) {
      var amounts, price;

      price = $scope.quantityPrice(
        $scope.getAnswerValue(answerId, 'price'),
        $scope.getAnswerValue(answerId, 'quantity')
      );
      if (price !== null) {
        amounts = price.split('-');
        from += Number(amounts[0]);
        to += Number(amounts[1] || amounts[0]);
      }
    });
    return [from, to];
  };

  $scope.amountDisplay = function (result) {
    result =
      result[0] === result[1]
        ? `${$scope.priceTrue(result[0])}`
        : `${$scope.priceTrue(result[0])} - ${$scope.priceTrue(result[1])}`;
    return `≈${result} руб.`;
  };

  $scope.quantityPrice = function (price, quantity) {
    var amounts, from;
    if (price !== null) {
      amounts = price.split('-');
      from = Number(amounts[0]) * Number(quantity);
      if (amounts[1]) {
        return [from, Number(amounts[1]) * Number(quantity)].join('-');
      } else {
        return `${from}`;
      }
    } else {
      return null;
    }
  };

  $scope.quantityPriceV2 = function (price, quantity, index) {
    var amounts, from, prefix, to;
    price = $scope.quantityPrice(price, quantity);
    if (price !== null) {
      amounts = price.split('-');
      from = $scope.priceTrue(Number(amounts[0]));
      if (amounts[1]) {
        to = $scope.priceTrue(Number(amounts[1]));
        return `от ${from} до ${to}`;
      } else {
        prefix = index === 2 ? 'от' : 'до';
        return `${prefix} ${from}`;
      }
    } else {
      return null;
    }
  };

  // $scope.answerAmountDisplay = function (answerIds) {
  //   var price, quantity;
  //   price = $scope.getAnswerValue(answerId, 'price');
  //   return (quantity = $scope.getAnswerValue(answerId, 'quantity'));
  // };

  // $scope.roomsAmount = function () {
  //   var from, to;
  //   from = 0;
  //   to = 0;
  //   _.each($scope.rooms, function (room) {
  //     var result;
  //     result = $scope.roomAmount(room.answer_ids);
  //     from += result[0];
  //     to += result[1];
  //   });
  //   return [from, to];
  // };

  $scope.priceTrue = function (input) {
    var price_true;
    var price, price_true;
    price = Number.prototype.toFixed.call(parseFloat(input) || 0, 0);
    price_true = price.replace(/(\D)/g, ',');
    price_true = price_true.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    return price_true;
  };

  // Admin
  //---------------------------------------------------------------------------------------------
  $scope.initCurrentRoom = function (room) {
    $scope.currentRoom = room;
  };
  // $scope.currentRoomCls = function (room) {
  //   if ($scope.currentRoom === room) {
  //     return 'current';
  //   }
  // };
  // $scope.manageCls = function (answerId) {
  //   if ($scope.getAnswerValue(answerId, 'quantity')) {
  //     return 'active';
  //   }
  // };
  // $scope.manage = function (answerId) {
  //   var action;
  //   action = $scope.getAnswerValue(answerId, 'quantity')
  //     ? 'delete'
  //     : 'create';
  //   return BudgetService.manage($scope.budgetId, answerId, action)
  //     .then(function (response) {
  //       return $scope.initResponse(response);
  //     })
  //     .catch(function (response) {});
  // };
  // $scope.updateQuantity = function (answerId) {
  //   var quantity;
  //   quantity = $scope.getAnswerValue(answerId, 'quantity');
  //   return BudgetService.manage($scope.budgetId, answerId, 'quantity', {
  //     quantity: quantity,
  //   })
  //     .then(function (response) {
  //       return $scope.initResponse(response);
  //     })
  //     .catch(function (response) {});
  // });
});

app.service('BudgetService', [
  '$http',
  function ($http) {
    this.manage = function (budgetId, answerId, action, values = null) {
      $http
        .put('/private/api/v1/budgets/' + budgetId, {
          answer: {
            id: answerId,
            action: action,
            values: values,
          },
        })
        .then(function (response) {
          return response.data;
        });
    };
    return this;
  },
]);
