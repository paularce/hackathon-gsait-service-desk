jest.unmock('../USForm');

import USForm from '../USForm';

let props = {
    legend: 'Example form'
};

describe('<USForm /> render', () => {
    it('renders correctly', () => {
        const component = render(<USForm {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly with a hidden legend', () => {
        props.legendIsSrOnly = true;
        const component = render(<USForm {...props} />);
        expect(component).toMatchSnapshot();
    });
});
