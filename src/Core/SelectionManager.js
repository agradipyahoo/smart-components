import EventEmitter from 'events';
/**
 * Selection Manager
 */
export default class SelectionManager extends EventEmitter {
  constructor(config) {
    super(config);
    config = config || {};
    this._dataStoreIndex = {};
    this._deselectCallBacks = {};
    this._multiSelect = config.multiSelect || false;
    this._idAttribute = config.idAttribute || 'id';
    this._selected = null;
  }

  validateItem(item) {
    const { _idAttribute } = this;
    if (typeof item !== 'object' || item[_idAttribute] === undefined) {
      throw new Error(`item must have ${_idAttribute} be selected`);
    } else {
      return true;
    }
  }

  triggerChange() {
    let { _dataStoreIndex } = this;
    let prevSelection = this._selected;
    let curSelection = this.getSelected();
    if (curSelection !== prevSelection) {
      this.trigger('change', curSelection, prevSelection);
      this._selected = curSelection;
    }
  }

  select(selectedItem) {
    let { _multiSelect, _dataStoreIndex, _idAttribute } = this;

    if (this.validateItem(selectedItem) && !this.isSelected(selectedItem)) {
      if (_multiSelect) {
        _dataStoreIndex[selectedItem[_idAttribute]] = selectedItem;
      } else {
        _dataStoreIndex = {};
        _dataStoreIndex[selectedItem[_idAttribute]] = selectedItem;
        this._dataStoreIndex = { [selectedItem[_idAttribute]]: selectedItem };
      }

      this.triggerChange();
    }
  }

  isAllSelected(options){
    return Object.keys(this._dataStoreIndex).length === options.length;
  }

  deselect(deselectedItem) {
    let { _dataStoreIndex, _idAttribute } = this;
    if (this.validateItem(deselectedItem) && this.isSelected(deselectedItem)) {
      delete _dataStoreIndex[deselectedItem[_idAttribute]];
      this.triggerChange();
    }
  }

  toggle(toToggleItem) {
    let { _dataStoreIndex, _idAttribute } = this;
    if (this.validateItem(toToggleItem)) {
      if (_dataStoreIndex[toToggleItem[_idAttribute]]) {
        this.deselect(toToggleItem);
      } else {
        this.select(toToggleItem);
      }
    }
  }

  clearAndSelect(selectedItem){
    if (!this.isEmpty()) {
      this._dataStoreIndex = {};
    }
    this.select(selectedItem);
  }

  clear(silent = false) {
    if (!this.isEmpty()) {
      this._dataStoreIndex = {};
      if(!silent){
        this.triggerChange();
      }
    }
  }

  isEmpty() {
    return Object.keys(this._dataStoreIndex).length === 0;
  }

  getSelected() {
    let { _multiSelect, _dataStoreIndex } = this;
    let selected = Object.keys(_dataStoreIndex).map(keyName => _dataStoreIndex[keyName]);
    if (selected.length > 0) {
      return _multiSelect ? selected : selected[0];
    } else {
      return _multiSelect ? [] : null;
    }
  }

  isSelected(item) {
    const { _idAttribute } = this;
    return this._dataStoreIndex[item[_idAttribute]] !== undefined;
  }

  isMultiSelect() {
    return this._multiSelect;
  }

  selectAll(options){
	  let { _multiSelect, _dataStoreIndex, _idAttribute } = this;
	  if(_multiSelect){
		  options.forEach((v)=>{
			  _dataStoreIndex[v[_idAttribute]] = v;
		  });
		  this.triggerChange();
	  }

  }

  clearAll(){
    this.clear();
  }

  on(event, callback) {
    super.on(event, callback);
    return () => {
      super.removeListener(event, callback);
    };
  }

  trigger() {
    this.emit.apply(this, arguments);
  }
}
