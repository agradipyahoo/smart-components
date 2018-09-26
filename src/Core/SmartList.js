/**
 * Created by Agradip.Sarkar .
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
/**
 *  utils function
 */
const omit = (obj, ...props) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (props.indexOf(key) == -1) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const pick = (obj, ...props) => {
  const newObj = {};
  props.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const flatten = arr => {
  return arr.reduce(function(accumulator, currentValue, currentIndex, array) {
    return accumulator.concat(currentValue);
  }, []);
};

export class SmartListItem extends Component {
  render() {
    return this.renderContent();
  }

  renderContent() {
    let itemData = this.props.itemData;
    let tagProps = this.getTagProps();
    <Grid {...tagProps} item>
      {itemData.name}
    </Grid>;
  }

  getTagProps() {
    return pick(this.props, 'className', 'style');
  }
}

export default class SmartList extends Component {
  renderNoItems() {
    if (!this.props.hideNoItems) {
      let noItemMessage = this.props.noDataMessage || 'No Items Found';
      return <li className="no-data">{noItemMessage}</li>;
    } else {
      return null;
    }
  }

  renderItems(items) {
    return items;
  }

  renderChildren(items) {
    let tagProps = this.getTagProps();
    tagProps.className = tagProps.className || 'list';
    if (items.length === 0) {
      tagProps.className += ' zero-length';
    }
    let ContainerTag = this.props.tagName || 'ul';

    return (
      <ContainerTag {...tagProps} wrap={'nowrap'}>
        {items.length > 0 ? this.renderItems(items) : this.renderNoItems()}
      </ContainerTag>
    );
  }

  getTagProps() {
    return pick(this.props, 'className', 'style');
  }

  getItems() {
    return this.props.items || [];
  }

  getItemClass(item) {
    return this.props.ListItem || SmartListItem;
  }

  render() {
    let itemArray = this.getItems();

    let otherProps = omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
    otherProps.tagName = this.props.itemTagName || 'li';
    otherProps.className = this.props.itemClassName || 'list-item';

    let listItems = itemArray.map((item, index) => {
      let ListItemClass = this.getItemClass(item);
      return <ListItemClass key={item.id} itemIndex={index} itemData={item} {...otherProps} />;
    });

    return this.renderChildren(listItems);
  }
}

export class SelectableItem extends SmartListItem {
  constructor(props) {
    super(props);
    let { itemData, selectionManager } = this.props;
    this.state = {
      selected: selectionManager.isSelected(itemData),
    };
  }

  updateSelectionState() {
    let { itemData, selectionManager } = this.props;
    this.setState({
      selected: selectionManager.isSelected(itemData),
    });
  }

  selectItem(event) {
    event.preventDefault();
    let { itemData, selectionManager } = this.props;
    if (selectionManager._multiSelect) {
      selectionManager.toggle(itemData);
    } else {
      selectionManager.select(itemData);
    }
  }

  renderContent() {
    let itemData = this.props.itemData;
    let tagProps = this.getTagProps();
    return (
      <Grid item {...tagProps} onClick={this.selectItem.bind(this)}>
          {itemData.name}
      </Grid>
    );
  }

  getTagProps() {
    return {
      className: this.state.selected ? 'active list-item' : 'list-item',
    };
  }
}

export class SmartSelectableList extends SmartList {
  componentDidMount() {
    const { selectionManager } = this.props;
    if (selectionManager) {
      this.unsubscribeSelection = selectionManager.on('change', (selection, prevSelection) => {
        let fullList = flatten([selection, prevSelection]);
        fullList.forEach(item => {
          if (item && item.id !=null) {
            this['ref_' + item.id].updateSelectionState();
          }
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeSelection) {
      this.unsubscribeSelection();
    }
  }

  render() {
    let itemArray = this.props.items;
    let ListItemClass = this.props.ListItem || SmartListItem;
    let otherProps = omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
    otherProps.tagName = this.props.itemTagName || 'li';
    otherProps.className = this.props.itemClassName || 'list-item';
    const listItems = itemArray.map(item => {
      return (
        <ListItemClass
          key={item.id}
          ref={element => {
            if (element && item) {
              this[`ref_${item.id}`] = element;
            }
          }}
          itemIndex={item.id}
          itemData={item}
          {...otherProps}
        />
      );
    });

    return this.renderChildren(listItems);
  }
}

SmartSelectableList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
};
