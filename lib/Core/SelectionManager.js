var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import EventEmitter from 'events';
/**
 * Selection Manager
 */

var SelectionManager = function (_EventEmitter) {
  _inherits(SelectionManager, _EventEmitter);

  function SelectionManager(config) {
    _classCallCheck(this, SelectionManager);

    var _this = _possibleConstructorReturn(this, (SelectionManager.__proto__ || Object.getPrototypeOf(SelectionManager)).call(this, config));

    config = config || {};
    _this._dataStoreIndex = {};
    _this._deselectCallBacks = {};
    _this._multiSelect = config.multiSelect || false;
    _this._idAttribute = config.idAttribute || 'id';
    _this._selected = null;
    return _this;
  }

  _createClass(SelectionManager, [{
    key: 'validateItem',
    value: function validateItem(item) {
      var _idAttribute = this._idAttribute;

      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object' || item[_idAttribute] === undefined) {
        throw new Error('item must have ' + _idAttribute + ' be selected');
      } else {
        return true;
      }
    }
  }, {
    key: 'triggerChange',
    value: function triggerChange() {
      var _dataStoreIndex = this._dataStoreIndex;

      var prevSelection = this._selected;
      var curSelection = this.getSelected();
      if (curSelection !== prevSelection) {
        this.trigger('change', curSelection, prevSelection);
        this._selected = curSelection;
      }
    }
  }, {
    key: 'select',
    value: function select(selectedItem) {
      var _multiSelect = this._multiSelect,
          _dataStoreIndex = this._dataStoreIndex,
          _idAttribute = this._idAttribute;


      if (this.validateItem(selectedItem) && !this.isSelected(selectedItem)) {
        if (_multiSelect) {
          _dataStoreIndex[selectedItem[_idAttribute]] = selectedItem;
        } else {
          _dataStoreIndex = {};
          _dataStoreIndex[selectedItem[_idAttribute]] = selectedItem;
          this._dataStoreIndex = _defineProperty({}, selectedItem[_idAttribute], selectedItem);
        }

        this.triggerChange();
      }
    }
  }, {
    key: 'deselect',
    value: function deselect(deselectedItem) {
      var _dataStoreIndex = this._dataStoreIndex,
          _idAttribute = this._idAttribute;

      if (this.validateItem(deselectedItem) && this.isSelected(deselectedItem)) {
        delete _dataStoreIndex[deselectedItem[_idAttribute]];
        this.triggerChange();
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(toToggleItem) {
      var _dataStoreIndex = this._dataStoreIndex,
          _idAttribute = this._idAttribute;

      if (this.validateItem(toToggleItem)) {
        if (_dataStoreIndex[toToggleItem[_idAttribute]]) {
          this.deselect(toToggleItem);
        } else {
          this.select(toToggleItem);
        }
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (!this.isEmpty()) {
        this._dataStoreIndex = {};
        this.triggerChange();
      }
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return Object.keys(this._dataStoreIndex).length === 0;
    }
  }, {
    key: 'getSelected',
    value: function getSelected() {
      var _multiSelect = this._multiSelect,
          _dataStoreIndex = this._dataStoreIndex;

      var selected = Object.keys(_dataStoreIndex).map(function (keyName) {
        return _dataStoreIndex[keyName];
      });
      if (selected.length > 0) {
        return _multiSelect ? selected : selected[0];
      } else {
        return _multiSelect ? [] : null;
      }
    }
  }, {
    key: 'isSelected',
    value: function isSelected(item) {
      var _idAttribute = this._idAttribute;

      return this._dataStoreIndex[item[_idAttribute]] !== undefined;
    }
  }, {
    key: 'isMultiSelect',
    value: function isMultiSelect() {
      return this._multiSelect;
    }
  }, {
    key: 'selectAll',
    value: function selectAll(options) {
      var _multiSelect = this._multiSelect,
          _dataStoreIndex = this._dataStoreIndex,
          _idAttribute = this._idAttribute;

      if (_multiSelect) {
        options.forEach(function (v) {
          _dataStoreIndex[v[_idAttribute]] = v;
        });
        this.triggerChange();
      }
    }
  }, {
    key: 'clearAll',
    value: function clearAll() {
      this.clear();
    }
  }, {
    key: 'on',
    value: function on(event, callback) {
      var _this2 = this;

      _get(SelectionManager.prototype.__proto__ || Object.getPrototypeOf(SelectionManager.prototype), 'on', this).call(this, event, callback);
      return function () {
        _get(SelectionManager.prototype.__proto__ || Object.getPrototypeOf(SelectionManager.prototype), 'removeListener', _this2).call(_this2, event, callback);
      };
    }
  }, {
    key: 'trigger',
    value: function trigger() {
      this.emit.apply(this, arguments);
    }
  }]);

  return SelectionManager;
}(EventEmitter);

export default SelectionManager;