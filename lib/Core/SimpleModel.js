var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SimpleEmitter from './SimpleEmitter';

var modelCounter = 0;

var SimpleModel = function (_SimpleEmitter) {
  _inherits(SimpleModel, _SimpleEmitter);

  function SimpleModel(props) {
    _classCallCheck(this, SimpleModel);

    var _this = _possibleConstructorReturn(this, (SimpleModel.__proto__ || Object.getPrototypeOf(SimpleModel)).call(this, props));

    _this._dataIndex = {};
    _this._modelId = 'model' + modelCounter;
    modelCounter++;
    if (props) {
      _this.set(props);
    }
    return _this;
  }

  _createClass(SimpleModel, [{
    key: 'set',
    value: function set(map, options) {
      this._changed = {};
      options = options || {};
      var isSilent = options.silent || false;
      for (var prop in map) {
        var oldValue = this._dataIndex[prop];
        var value = map[prop];
        if (oldValue !== value) {
          this._dataIndex[prop] = value;
          if (!isSilent) {
            this.triggerPropChange(prop, value, oldValue);
          }
        }
      }

      if (Object.keys(this._changed).length !== 0 && !isSilent) {
        this.triggerChange(this._changed, this._dataIndex);
      }
    }
  }, {
    key: 'reset',
    value: function reset(map) {
      this._changed = {};
      for (var prop in this._dataIndex) {
        if (map[prop] === undefined) {
          var oldValue = this._dataIndex[prop];
          delete this._dataIndex[prop];
          this.triggerPropChange(prop, undefined, oldValue);
        }
      }

      for (var _prop in map) {
        var _oldValue = this._dataIndex[_prop];
        var value = map[_prop];
        if (_oldValue !== value) {
          this._dataIndex[_prop] = value;
          this.triggerPropChange(_prop, value, _oldValue);
        }
      }

      if (Object.keys(this._changed).length !== 0) {
        this.triggerChange(this._changed, this._dataIndex);
      }
    }
  }, {
    key: 'get',
    value: function get(prop) {
      return this._dataIndex[prop];
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var toReturn = {};
      for (var prop in this._dataIndex) {
        toReturn[prop] = this._dataIndex[prop];
      }
      return toReturn;
    }
  }, {
    key: 'triggerPropChange',
    value: function triggerPropChange(prop, value, oldValue) {
      this._changed[prop] = value;
      this.emit('change:' + prop, value, oldValue);
    }
  }, {
    key: 'triggerChange',
    value: function triggerChange(changed, allData) {
      this.emit('change', changed, allData);
    }
  }, {
    key: 'clearData',
    value: function clearData() {
      this._dataIndex = {};
      this.triggerChange();
    }
  }]);

  return SimpleModel;
}(SimpleEmitter);

export default SimpleModel;