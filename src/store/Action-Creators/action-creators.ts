import { act } from 'react-dom/test-utils';

import * as CategoriesActionCreators from './Actions/categoryActions';
import * as ProductActionCreators from './Actions/productActions';

const actions = {
	...CategoriesActionCreators, ...ProductActionCreators
};
export default actions;