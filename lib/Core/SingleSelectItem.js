var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var SingleSelectItem = function (_Component) {
	_inherits(SingleSelectItem, _Component);

	function SingleSelectItem() {
		_classCallCheck(this, SingleSelectItem);

		return _possibleConstructorReturn(this, (SingleSelectItem.__proto__ || Object.getPrototypeOf(SingleSelectItem)).apply(this, arguments));
	}

	_createClass(SingleSelectItem, [{
		key: 'getClassName',
		value: function getClassName() {
			var itemData = this.props.itemData;
			var selectionManager = this.props.selectionManager;
			var className = 'list-item ';
			if (selectionManager.isSelected(itemData)) {
				className += ' active';
			}
			return className;
		}
	}, {
		key: 'isSelected',
		value: function isSelected() {
			var itemData = this.props.itemData;
			var selectionManager = this.props.selectionManager;
			return selectionManager.isSelected(itemData);
		}
	}, {
		key: 'deselectItem',
		value: function deselectItem() {
			var _props = this.props,
			    itemData = _props.itemData,
			    selectionManager = _props.selectionManager;

			selectionManager.deselect(itemData);
		}
	}, {
		key: 'deSelect',
		value: function deSelect(event) {
			event.preventDefault();
			this.deselectItem();
		}
	}, {
		key: 'render',
		value: function render() {
			var itemData = this.props.itemData;
			var className = this.getClassName();
			return React.createElement(
				'li',
				{ 'data-id': itemData.id, className: className },
				itemData.name
			);
		}
	}]);

	return SingleSelectItem;
}(Component);

export default SingleSelectItem;