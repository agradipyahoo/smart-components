import React, {Component} from 'react';

export default class SingleSelectItem extends Component {
	getClassName() {
		let itemData = this.props.itemData;
		let selectionManager = this.props.selectionManager;
		let className = 'list-item ';
		if (selectionManager.isSelected(itemData)) {
			className += ' active';
		}
		return className;
	}
	isSelected(){
		let itemData = this.props.itemData;
		let selectionManager = this.props.selectionManager;
		return selectionManager.isSelected(itemData);
	}
	deselectItem() {
		let {itemData, selectionManager} = this.props;
		selectionManager.deselect(itemData);
	}

	deSelect(event) {
		event.preventDefault();
		this.deselectItem();
	}

	render() {
		let itemData = this.props.itemData;
		let className = this.getClassName();
		return <li data-id={itemData.id} className={className}>
			{itemData.name}
		</li>;

	}
}
