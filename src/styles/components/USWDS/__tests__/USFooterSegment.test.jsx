import USFooterSegment from '../USFooterSegment';
import { MemoryRouter } from 'react-router-dom';
jest.unmock('../USFooterSegment');

let props = {
    id: 'footer-section',
    topic: 'Footer Topic 1'
};

describe('<USFooterSegment> render', () => {
    it('renders correctly', () => {
        const component = render(
            <MemoryRouter>
                <USFooterSegment {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });
});

describe('<USFooterSegment> UI', () => {
    /* UI cause and effect tests:
     * toggling on/off, open/closed
     * typing or inputing info
     * clicking, hovering, focusing
     * triggering errors and alerts
     * */
    let component = shallow(<USFooterSegment {...props} />);

    it('starts open, and toggles open/closed when clicked', () => {
        let clickTarget = component.find(`#${props.id} .segment-header`);
        expect(component.state().isExpanded).toEqual(true);

        clickTarget.simulate('click', {});
        component.update(); //wait for state change to finish
        expect(component.state().isExpanded).toEqual(false);

        clickTarget.simulate('click', {});
        component.update(); //wait for state change to finish
        expect(component.state().isExpanded).toEqual(true);
    });
});

describe('<USFooterSegment> integration', () => {
    //N/A
});
