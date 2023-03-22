import { act } from 'react-dom/test-utils';

import * as CategoriesActionCreators from './Actions/categoryActions';
import * as ProductActionCreators from './Actions/productActions';
import * as AccountActionCreators from './Actions/accountActions';
const actions = {
	...CategoriesActionCreators, ...ProductActionCreators, ...AccountActionCreators
};
export default actions;