var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Agradip.Sarkar .
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
/**
 *  utils function
 */
var omit = function omit(obj) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    if (props.indexOf(key) == -1) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

var pick = function pick(obj) {
  for (var _len2 = arguments.length, props = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    props[_key2 - 1] = arguments[_key2];
  }

  var newObj = {};
  props.forEach(function (key) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

var flatten = function flatten(arr) {
  return arr.reduce(function (accumulator, currentValue, currentIndex, array) {
    return accumulator.concat(currentValue);
  }, []);
};

export var SmartListItem = function (_Component) {
  _inherits(SmartListItem, _Component);

  function SmartListItem() {
    _classCallCheck(this, SmartListItem);

    return _possibleConstructorReturn(this, (SmartListItem.__proto__ || Object.getPrototypeOf(SmartListItem)).apply(this, arguments));
  }

  _createClass(SmartListItem, [{
    key: 'render',
    value: function render() {
      return this.renderContent();
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var itemData = this.props.itemData;
      var tagProps = this.getTagProps();
      React.createElement(
        Grid,
        _extends({}, tagProps, { item: true }),
        itemData.name
      );
    }
  }, {
    key: 'getTagProps',
    value: function getTagProps() {
      return pick(this.props, 'className', 'style');
    }
  }]);

  return SmartListItem;
}(Component);

var SmartList = function (_Component2) {
  _inherits(SmartList, _Component2);

  function SmartList() {
    _classCallCheck(this, SmartList);

    return _possibleConstructorReturn(this, (SmartList.__proto__ || Object.getPrototypeOf(SmartList)).apply(this, arguments));
  }

  _createClass(SmartList, [{
    key: 'renderNoItems',
    value: function renderNoItems() {
      if (!this.props.hideNoItems) {
        var noItemMessage = this.props.noDataMessage || 'No Items Found';
        return React.createElement(
          'li',
          { className: 'no-data' },
          noItemMessage
        );
      } else {
        return null;
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems(items) {
      return items;
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(items) {
      var tagProps = this.getTagProps();
      tagProps.className = tagProps.className || 'list';
      if (items.length === 0) {
        tagProps.className += ' zero-length';
      }
      var ContainerTag = this.props.tagName || 'ul';

      return React.createElement(
        ContainerTag,
        _extends({}, tagProps, { wrap: 'nowrap' }),
        items.length > 0 ? this.renderItems(items) : this.renderNoItems()
      );
    }
  }, {
    key: 'getTagProps',
    value: function getTagProps() {
      return pick(this.props, 'className', 'style');
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      return this.props.items || [];
    }
  }, {
    key: 'getItemClass',
    value: function getItemClass(item) {
      return this.props.ListItem || SmartListItem;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var itemArray = this.getItems();

      var otherProps = omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
      otherProps.tagName = this.props.itemTagName || 'li';
      otherProps.className = this.props.itemClassName || 'list-item';

      var listItems = itemArray.map(function (item, index) {
        var ListItemClass = _this3.getItemClass(item);
        return React.createElement(ListItemClass, _extends({ key: item.id, itemIndex: index, itemData: item }, otherProps));
      });

      return this.renderChildren(listItems);
    }
  }]);

  return SmartList;
}(Component);

export default SmartList;


export var SelectableItem = function (_SmartListItem) {
  _inherits(SelectableItem, _SmartListItem);

  function SelectableItem(props) {
    _classCallCheck(this, SelectableItem);

    var _this4 = _possibleConstructorReturn(this, (SelectableItem.__proto__ || Object.getPrototypeOf(SelectableItem)).call(this, props));

    var _this4$props = _this4.props,
        itemData = _this4$props.itemData,
        selectionManager = _this4$props.selectionManager;

    _this4.state = {
      selected: selectionManager.isSelected(itemData)
    };
    return _this4;
  }

  _createClass(SelectableItem, [{
    key: 'updateSelectionState',
    value: function updateSelectionState() {
      var _props = this.props,
          itemData = _props.itemData,
          selectionManager = _props.selectionManager;

      this.setState({
        selected: selectionManager.isSelected(itemData)
      });
    }
  }, {
    key: 'selectItem',
    value: function selectItem(event) {
      event.preventDefault();
      var _props2 = this.props,
          itemData = _props2.itemData,
          selectionManager = _props2.selectionManager;

      if (selectionManager._multiSelect) {
        selectionManager.toggle(itemData);
      } else {
        selectionManager.select(itemData);
      }
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var itemData = this.props.itemData;
      var tagProps = this.getTagProps();
      return React.createElement(
        Grid,
        _extends({ item: true }, tagProps, { onClick: this.selectItem.bind(this) }),
        itemData.name
      );
    }
  }, {
    key: 'getTagProps',
    value: function getTagProps() {
      return {
        className: this.state.selected ? 'active list-item' : 'list-item'
      };
    }
  }]);

  return SelectableItem;
}(SmartListItem);

export var SmartSelectableList = function (_SmartList) {
  _inherits(SmartSelectableList, _SmartList);

  function SmartSelectableList() {
    _classCallCheck(this, SmartSelectableList);

    return _possibleConstructorReturn(this, (SmartSelectableList.__proto__ || Object.getPrototypeOf(SmartSelectableList)).apply(this, arguments));
  }

  _createClass(SmartSelectableList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this6 = this;

      var selectionManager = this.props.selectionManager;

      if (selectionManager) {
        this.unsubscribeSelection = selectionManager.on('change', function (selection, prevSelection) {
          var fullList = flatten([selection, prevSelection]);
          fullList.forEach(function (item) {
            if (item && item.id != null) {
              _this6['ref_' + item.id].updateSelectionState();
            }
          });
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribeSelection) {
        this.unsubscribeSelection();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var itemArray = this.props.items;
      var ListItemClass = this.props.ListItem || SmartListItem;
      var otherProps = omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
      otherProps.tagName = this.props.itemTagName || 'li';
      otherProps.className = this.props.itemClassName || 'list-item';
      var listItems = itemArray.map(function (item) {
        return React.createElement(ListItemClass, _extends({
          key: item.id,
          ref: function ref(element) {
            if (element && item) {
              _this7['ref_' + item.id] = element;
            }
          },
          itemIndex: item.id,
          itemData: item
        }, otherProps));
      });

      return this.renderChildren(listItems);
    }
  }]);

  return SmartSelectableList;
}(SmartList);

SmartSelectableList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired
};