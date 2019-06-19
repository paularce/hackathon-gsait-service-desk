import USFooter from '../USFooter';
import { MemoryRouter } from 'react-router-dom';
import { footerDisclaimerLead } from '../../../models';
window.scroll = jest.fn();

let props = {};

describe('<USFooter /> render', () => {
    it('renders correctly', () => {
        const component = render(
            <MemoryRouter>
                <USFooter {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });
});

describe('<USFooter /> UI', () => {
    const component = shallow(<USFooter {...props} />);

    it('is of the usa-footer-slim variety', () => {
        expect(component.find('.usa-footer-slim')).toHaveLength(1);
    });

    it('has three links in the contact section: phone, email, and return to top', () => {
        expect(component.find('a')).toHaveLength(2);
    });

    it('has return-to-top functionality', () => {
        jest.spyOn(component.instance(), 'returnToTop');
        component.find(`#return-to-top-link`).simulate('click', {});
    });

    it('has the legal disclaimer', () => {
        const disclaimer = component.find(`.footer-disclaimer`);
        expect(disclaimer).toHaveLength(1);
        expect(disclaimer.text()).not.toBe(undefined);
    });

    it('the legal disclaimer has an important prefix in bold and underline', () => {
        let segment = component.find('u');
        expect(segment).toHaveLength(1);
        expect(segment.text()).toBe(footerDisclaimerLead);

        segment = component.find('strong');
        expect(segment).toHaveLength(1);
        expect(segment.text()).toBe(footerDisclaimerLead);
    });
});
