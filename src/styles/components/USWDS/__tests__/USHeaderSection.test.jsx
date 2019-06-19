jest.unmock('../USHeaderSection');

import USHeaderSection from '../USHeaderSection';
import { MemoryRouter } from 'react-router-dom';

let props = {
    id: 'header-section',
    title: 'Header section',
    isExpanded: false,
    setAsExpanded: jest.fn()
};

describe('<USHeaderSection /> render', () => {
    it('renders correctly when closed', () => {
        const component = render(
            <MemoryRouter>
                <USHeaderSection {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders correctly when open', () => {
        props.isExpanded = true;
        const component = render(
            <MemoryRouter>
                <USHeaderSection {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });
});

describe('<USHeaderSection> UI', () => {
    it('starts as closed on mobile', () => {
        let component = shallow(<USHeaderSection {...props} />);
        expect(component.props().isExpanded).not.toBe(true);
    });

    it('toggles open when closed', () => {
        props.isExpanded = false;
        let component = shallow(<USHeaderSection {...props} />);
        component.find(`.usa-accordion-button`).simulate('click', {});
        expect(props.setAsExpanded).toHaveBeenCalledWith(props.id);
    });

    it('toggles closed when open', () => {
        props.isExpanded = true;
        let component = shallow(<USHeaderSection {...props} />);
        component.find(`.usa-accordion-button`).simulate('click', {});
        expect(props.setAsExpanded).toHaveBeenCalledWith('');
    });
});
