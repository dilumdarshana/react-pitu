"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pagination =
/*#__PURE__*/
function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    var _this;

    _classCallCheck(this, Pagination);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pagination).call(this, props));
    _this.state = {
      paginationOutData: {
        itemsPerPage: 0,
        cursor: 1
      },
      displaySize: 5,
      // how many page buttons show
      displayStartsAt: 1,
      // page buttons start number
      pageButtonsStack: [],
      // page buttons to show on current go
      previousButtonClass: 'lst-disabled',
      nextButtonClass: ''
    };
    return _this;
  }

  _createClass(Pagination, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var perPage;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                perPage = this.props.perPage;
                _context.next = 3;
                return this.setState({
                  paginationOutData: {
                    itemsPerPage: perPage,
                    cursor: 1
                  }
                });

              case 3:
                this.setNextPrevButtonStatus();
                this.createPageButtonStack();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(prevProps) {
        var totalPrev, _this$props, total, perPage;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                totalPrev = prevProps.total;
                _this$props = this.props, total = _this$props.total, perPage = _this$props.perPage;

                if (!(total !== totalPrev)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return this.setState({
                  paginationOutData: {
                    itemsPerPage: perPage,
                    cursor: 1
                  },
                  displayStartsAt: 1
                });

              case 5:
                this.setNextPrevButtonStatus();
                this.createPageButtonStack();

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidUpdate(_x) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "getTotalNumberOfButtons",
    value: function getTotalNumberOfButtons() {
      var itemsPerPage = this.state.paginationOutData.itemsPerPage;
      var total = this.props.total;
      return Math.ceil(total / itemsPerPage);
    }
  }, {
    key: "setNextPrevButtonStatus",
    value: function () {
      var _setNextPrevButtonStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var cursor, maxNumberOfButtons, nextButtonClass, previousButtonClass;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cursor = this.state.paginationOutData.cursor;
                maxNumberOfButtons = this.getTotalNumberOfButtons();
                nextButtonClass = cursor === maxNumberOfButtons ? 'lst-disabled' : '';
                previousButtonClass = cursor === 1 ? 'lst-disabled' : '';
                _context3.next = 6;
                return this.setState({
                  previousButtonClass: previousButtonClass,
                  nextButtonClass: nextButtonClass
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setNextPrevButtonStatus() {
        return _setNextPrevButtonStatus.apply(this, arguments);
      }

      return setNextPrevButtonStatus;
    }()
  }, {
    key: "decideWalkingDirection",
    value: function decideWalkingDirection() {
      var _this$state = this.state,
          cursor = _this$state.paginationOutData.cursor,
          pageButtonsStack = _this$state.pageButtonsStack;
      var middle = pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1];
      var direction = '';

      if (middle > cursor) {
        direction = 'left';
      }

      if (middle < cursor) {
        direction = 'right';
      }

      return direction;
    }
  }, {
    key: "createPageButtonStack",
    value: function () {
      var _createPageButtonStack = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this$state2, displayStartsAt, displaySize, itemsArr, maxNumberOfButtons, displayEnd, i;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$state2 = this.state, displayStartsAt = _this$state2.displayStartsAt, displaySize = _this$state2.displaySize;
                itemsArr = [];
                maxNumberOfButtons = this.getTotalNumberOfButtons();
                displayEnd = maxNumberOfButtons <= displaySize ? maxNumberOfButtons : displaySize;

                for (i = displayStartsAt; i < displayStartsAt + displayEnd; i += 1) {
                  itemsArr.push(i);
                }

                _context4.next = 7;
                return this.setState({
                  pageButtonsStack: itemsArr
                });

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createPageButtonStack() {
        return _createPageButtonStack.apply(this, arguments);
      }

      return createPageButtonStack;
    }()
  }, {
    key: "walkToRight",
    value: function () {
      var _walkToRight = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _this$state3, displayStartsAt, displaySize, pageButtonsStack, cursor, maxNumberOfButtons, cursorGap, maxGapEnd, maxGap;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this$state3 = this.state, displayStartsAt = _this$state3.displayStartsAt, displaySize = _this$state3.displaySize, pageButtonsStack = _this$state3.pageButtonsStack, cursor = _this$state3.paginationOutData.cursor; // check how many buttons can be go

                maxNumberOfButtons = this.getTotalNumberOfButtons();
                cursorGap = cursor - pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1];

                if (!(displayStartsAt + displaySize <= maxNumberOfButtons)) {
                  _context5.next = 9;
                  break;
                }

                maxGapEnd = maxNumberOfButtons - displaySize - displayStartsAt + 1;
                maxGap = displayStartsAt + cursorGap + displaySize >= maxNumberOfButtons ? maxGapEnd : cursorGap;
                _context5.next = 8;
                return this.setState({
                  displayStartsAt: displayStartsAt + maxGap
                });

              case 8:
                this.createPageButtonStack();

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function walkToRight() {
        return _walkToRight.apply(this, arguments);
      }

      return walkToRight;
    }()
  }, {
    key: "walkToLeft",
    value: function () {
      var _walkToLeft = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _this$state4, displayStartsAt, cursor, pageButtonsStack, cursorGap, newStartAt;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$state4 = this.state, displayStartsAt = _this$state4.displayStartsAt, cursor = _this$state4.paginationOutData.cursor, pageButtonsStack = _this$state4.pageButtonsStack;
                cursorGap = Math.abs(pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1] - cursor); // check how many buttons can be go

                if (!(displayStartsAt > 1)) {
                  _context6.next = 7;
                  break;
                }

                newStartAt = displayStartsAt - cursorGap === 0 ? 1 : displayStartsAt - cursorGap;
                _context6.next = 6;
                return this.setState({
                  displayStartsAt: newStartAt
                });

              case 6:
                this.createPageButtonStack();

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function walkToLeft() {
        return _walkToLeft.apply(this, arguments);
      }

      return walkToLeft;
    }()
  }, {
    key: "handlePrevious",
    value: function () {
      var _handlePrevious = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var _this$state$paginatio, cursor, itemsPerPage, onPropertyChange, nextCursor, direction;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this$state$paginatio = this.state.paginationOutData, cursor = _this$state$paginatio.cursor, itemsPerPage = _this$state$paginatio.itemsPerPage;
                onPropertyChange = this.props.onPropertyChange;
                nextCursor = cursor > 1 ? cursor - 1 : cursor;
                _context7.next = 5;
                return this.setState({
                  paginationOutData: {
                    cursor: nextCursor,
                    itemsPerPage: itemsPerPage
                  }
                });

              case 5:
                direction = this.decideWalkingDirection();
                this.setNextPrevButtonStatus();

                if (direction === 'left') {
                  this.walkToLeft();
                }

                onPropertyChange({
                  cursor: nextCursor,
                  itemsPerPage: itemsPerPage
                });

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function handlePrevious() {
        return _handlePrevious.apply(this, arguments);
      }

      return handlePrevious;
    }()
  }, {
    key: "handleNext",
    value: function () {
      var _handleNext = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var _this$state$paginatio2, cursor, itemsPerPage, onPropertyChange, nextCursor, direction;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$state$paginatio2 = this.state.paginationOutData, cursor = _this$state$paginatio2.cursor, itemsPerPage = _this$state$paginatio2.itemsPerPage;
                onPropertyChange = this.props.onPropertyChange;
                nextCursor = cursor < this.getTotalNumberOfButtons() ? cursor + 1 : cursor;
                _context8.next = 5;
                return this.setState({
                  paginationOutData: {
                    cursor: nextCursor,
                    itemsPerPage: itemsPerPage
                  }
                });

              case 5:
                direction = this.decideWalkingDirection();
                this.setNextPrevButtonStatus();

                if (direction === 'right') {
                  this.walkToRight();
                }

                onPropertyChange({
                  cursor: nextCursor,
                  itemsPerPage: itemsPerPage
                });

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function handleNext() {
        return _handleNext.apply(this, arguments);
      }

      return handleNext;
    }()
  }, {
    key: "handleItemsPerPage",
    value: function () {
      var _handleItemsPerPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(e) {
        var newItemsPerPage, onPropertyChange, paginationOutData;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                newItemsPerPage = e.target.value;
                onPropertyChange = this.props.onPropertyChange;
                paginationOutData = {
                  itemsPerPage: newItemsPerPage,
                  cursor: 1
                };
                _context9.next = 5;
                return this.setState({
                  paginationOutData: paginationOutData,
                  displayStartsAt: 1
                });

              case 5:
                this.setNextPrevButtonStatus();
                onPropertyChange(paginationOutData);
                this.createPageButtonStack();

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function handleItemsPerPage(_x2) {
        return _handleItemsPerPage.apply(this, arguments);
      }

      return handleItemsPerPage;
    }()
  }, {
    key: "handleCurrentPage",
    value: function () {
      var _handleCurrentPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(page) {
        var itemsPerPage, onPropertyChange, paginationData, direction;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                itemsPerPage = this.state.paginationOutData.itemsPerPage;
                onPropertyChange = this.props.onPropertyChange;
                paginationData = {
                  cursor: page,
                  itemsPerPage: itemsPerPage
                };
                _context10.next = 5;
                return this.setState({
                  paginationOutData: paginationData
                });

              case 5:
                direction = this.decideWalkingDirection();
                this.setNextPrevButtonStatus();

                if (direction === 'right') {
                  this.walkToRight();
                }

                if (direction === 'left') {
                  this.walkToLeft();
                }

                onPropertyChange(paginationData);

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function handleCurrentPage(_x3) {
        return _handleCurrentPage.apply(this, arguments);
      }

      return handleCurrentPage;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state5 = this.state,
          cursor = _this$state5.paginationOutData.cursor,
          pageButtonsStack = _this$state5.pageButtonsStack,
          previousButtonClass = _this$state5.previousButtonClass,
          nextButtonClass = _this$state5.nextButtonClass;
      var _this$props2 = this.props,
          total = _this$props2.total,
          perPage = _this$props2.perPage;
      var paginationPerPageList = [5, 10, 15];
      var defaultPerPage = 5;
      var perPageItemOptions = paginationPerPageList.map(function (option) {
        return _react["default"].createElement("option", {
          key: option
        }, option);
      });
      var paginationButtons = pageButtonsStack.map(function (elm) {
        return _react["default"].createElement("button", {
          type: "button",
          key: elm,
          className: "page number ".concat(elm === cursor ? 'active' : ''),
          onClick: function onClick(e) {
            return _this2.handleCurrentPage(elm);
          }
        }, elm);
      });
      return total > 0 && _react["default"].createElement("div", {
        className: "pagination-wrapper"
      }, _react["default"].createElement("span", {
        className: "per-page"
      }, "Per Page", _react["default"].createElement("select", {
        className: "form-control",
        value: perPage || defaultPerPage,
        onChange: function onChange(e) {
          return _this2.handleItemsPerPage(e);
        }
      }, perPageItemOptions)), _react["default"].createElement("div", {
        className: "page-wrapper mobile-custom-margin"
      }, _react["default"].createElement("button", {
        type: "button",
        className: "page prev-page ".concat(previousButtonClass),
        onClick: function onClick(e) {
          return _this2.handlePrevious();
        }
      }, _react["default"].createElement("img", {
        src: "../assets/images/paginate-left.png",
        alt: ""
      })), paginationButtons, _react["default"].createElement("button", {
        type: "button",
        className: "page next-page ".concat(nextButtonClass),
        onClick: function onClick(e) {
          return _this2.handleNext();
        }
      }, _react["default"].createElement("img", {
        src: "../assets/images/paginate-right.png",
        alt: ""
      }))));
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  total: _propTypes["default"].number.isRequired,
  perPage: _propTypes["default"].number,
  onPropertyChange: _propTypes["default"].func
};
Pagination.defaultProps = {
  onPropertyChange: null,
  perPage: 5
};
var _default = Pagination;
exports["default"] = _default;
//# sourceMappingURL=index.js.map