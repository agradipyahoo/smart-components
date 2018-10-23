var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import FormElement from './FormElement';
import SelectionManager from '../Core/SelectionManager';

var SelectionFormElement = function (_FormElement) {
	_inherits(SelectionFormElement, _FormElement);

	function SelectionFormElement(props) {
		_classCallCheck(this, SelectionFormElement);

		var _this = _possibleConstructorReturn(this, (SelectionFormElement.__proto__ || Object.getPrototypeOf(SelectionFormElement)).call(this, props));

		_this.multiSelect = _this.props.multiSelect === true;
		_this.selectionManager = new SelectionManager({ multiSelect: _this.multiSelect });
		_this.changeSubscription = _this.selectionManager.on('change', _this.onChange.bind(_this));
		return _this;
	}

	_createClass(SelectionFormElement, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			_get(SelectionFormElement.prototype.__proto__ || Object.getPrototypeOf(SelectionFormElement.prototype), 'componentWillMount', this).call(this);
			var defaultValue = this.getDefaultValue();
			this.applyValue(defaultValue);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			if (newProps.options && newProps.options !== this.props.options) {
				this.selectionManager.clear();
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(selection) {
			var valueToSet = void 0;
			if (!this.selectionManager.isEmpty()) {
				if (this.multiSelect) {
					valueToSet = selection.map(function (v) {
						return v.id;
					});
				} else {
					valueToSet = selection.id;
				}
			} else {
				valueToSet = this.props.emptyValue !== undefined ? this.props.emptyValue : selection;
			}
			this.setValue(valueToSet);
			this.onChangeUpdates(valueToSet);
		}
	}, {
		key: 'onChangeUpdates',
		value: function onChangeUpdates() {
			// to be overridden by components
		}
	}, {
		key: 'applyValue',
		value: function applyValue(value) {
			if (this.multiSelect) {
				value = value || [];
				var options = this.props.options;
				value = value.map(function (valueId) {
					return options.find(function (item) {
						return item.id === valueId;
					});
				});
				value = value.filter(function (v) {
					return v;
				});
				this.selectionManager.clear(true);
				this.selectionManager.selectAll(value);
			} else {
				this.selectById(value);
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.selectionManager.clear();
		}
	}, {
		key: 'selectById',
		value: function selectById(value) {
			var options = this.props.options;
			var selectionManager = this.selectionManager;

			var toSelectItem = options.find(function (item) {
				return item.id === value;
			});
			if (toSelectItem) {
				if (this.multiSelect) {
					selectionManager.toggle(toSelectItem);
				} else {
					var isAlreadySelected = selectionManager.isSelected(toSelectItem);
					if (!isAlreadySelected) {
						selectionManager.select(toSelectItem);
					} else {
						selectionManager.trigger('change', toSelectItem, toSelectItem);
					}
				}
			}
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler(event) {
			var target = event.target;
			if (target.classList.contains('list-item')) {
				var dataId = target.dataset.id;
				this.selectById(dataId);
			}
		}
	}]);

	return SelectionFormElement;
}(FormElement);

export default SelectionFormElement;