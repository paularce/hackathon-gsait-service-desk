jest.unmock('../USAccordionSegment');

import USAccordionSegment from '../USAccordionSegment';

let props = {
    buttonText: 'Accordion Segment',
    updateOpenSegment: jest.fn()
};

describe('<USAccordionSegment /> render', () => {
    it('renders correctly', () => {
        const component = render(<USAccordionSegment {...props} />);
        expect(component).toMatchSnapshot();
    });
});

describe('<USAccordionSegment> UI', () => {
    /* UI cause and effect tests:
     * toggling on/off, open/closed
     * typing or inputing info
     * clicking, hovering, focusing
     * triggering errors and alerts
     * */
    let component = shallow(<USAccordionSegment {...props} />);

    it('starts open, and calls prop function to toggle open/closed when clicked', () => {
        let clickTarget = component.find(`button.usa-accordion-button`);
        expect(component.props().isExpanded).not.toEqual(false);

        clickTarget.simulate('click', {});
        expect(props.updateOpenSegment).toBeCalled();
    });
});
