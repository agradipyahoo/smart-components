import React, { PureComponent } from 'react';
import FormBuilder from './FormBuilder';
import { FormContext } from './FormContext';

/**
 */
export default class ElementGroup extends FormBuilder {

	render() {
		return <div className={this.props.className}>
			<FormContext.Provider value={this.getContext()}>
				{this.props.children}
			</FormContext.Provider>
		</div>;
	}
}

ElementGroup.propTypes = {
	...FormBuilder.propTypes
}
