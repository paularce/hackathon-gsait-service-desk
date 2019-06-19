jest.unmock('../USAlert');

import USAlert from '../USAlert';

let props = {
    heading: 'Alert'
};

describe('<USAlert /> render', () => {
    it('renders correctly', () => {
        const component = render(<USAlert {...props} />);
        expect(component).toMatchSnapshot();
    });

    //TODO: test other error modes
    //TODO: test that 'info' is default mode
});
