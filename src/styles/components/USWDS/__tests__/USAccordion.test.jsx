import USAccordion from '../USAccordion';
jest.mock('../USAccordionSegment');

let props = {
    children: [],
    initialOpenSegment: undefined
};

describe('<USAccordion /> render', () => {
    it('renders correctly with no items', () => {
        const component = render(<USAccordion {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly with many items', () => {
        props.children = [{ props: { id: 'foo' } }, { props: { id: 'bar' } }];
        const component = render(<USAccordion {...props} />);
        expect(component).toMatchSnapshot();
    });
});

describe('<USAccordion /> UI', () => {
    const component = shallow(<USAccordion {...props} />);

    it('starts closed, and keeps track of open segment', () => {
        expect(component.state().openSegment).toEqual('');
        const updateOpenSegment = jest.spyOn(
            component.instance(),
            'updateOpenSegment'
        );
        updateOpenSegment(1);
        expect(component.state().openSegment).toEqual(1);
    });
});
