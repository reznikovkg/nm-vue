import Points from "../classes/view/Points";
import Spline from "../classes/nm/Spline";
import pNewton from "../classes/nm/pNewton";

import PointsForm from '../components/Forms/Scene2D/Points'
import SplineForm from '../components/Forms/Scene2D/Spline'

export default {
	points: {
		name: 'Points',
		class: Points,
		form: PointsForm
	},
	spline: {
		name: 'Spline',
		class: Spline,
		form: SplineForm
	},
	pNewton: {
		name: 'pNewton',
		class: pNewton
	}
}
