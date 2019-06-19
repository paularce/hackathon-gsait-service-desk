import USHeader from '../USHeader';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../USHeaderSection');

let history = {
    location: {
        pathname: ''
    },
    listen: jest.fn().mockReturnValue({ pathname: '/hello-world' })
};
let props = {
    roles: [],
    history: history
};

describe('<USHeader /> render', () => {
    it('renders correctly when unauthenticated', () => {
        const component = render(
            <MemoryRouter>
                <USHeader {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders correctly for data scientist', () => {
        props.roles = ['ROLE_DATASCIENTIST'];
        const component = render(
            <MemoryRouter>
                <USHeader {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders correctly for product owner', () => {
        props.roles = ['ROLE_PRODUCTOWNER'];
        const component = render(
            <MemoryRouter>
                <USHeader {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders correctly for master user', () => {
        props.roles = ['ROLE_PRODUCTOWNER', 'ROLE_DATASCIENTIST'];
        props.userIsAuthenticated = true;
        const component = render(
            <MemoryRouter>
                <USHeader {...props} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('has a skip link', () => {
        const component = shallow(<USHeader {...props} />);
        expect(
            component.find('a[children="Skip to main content"]').length
        ).toBe(1);
    });

    it('displays the app title as an h1', () => {
        const component = shallow(<USHeader {...props} />);
        expect(component.find('h1[children="Galileo"]').length).toBe(1);
    });

    it('after authentication, shows a navigation link for Home for all roles', () => {
        props.roles = ['foo', 'bar'];
        const component = mount(
            <MemoryRouter>
                <USHeader {...props} />
            </MemoryRouter>
        );
        expect(component.find('span[children="Home"]').length).toBe(1);
    });

    it('after authentication, shows Research nav link for proper role', () => {
        props.roles = ['ROLE_PRODUCTOWNER'];
        const component = mount(
            <MemoryRouter>
                <USHeader {...props} />
            </MemoryRouter>
        );
        expect(component.find('span[children="Research"]').length).toBe(1);
    });

    it('after authentication, shows Raw Data nav link for proper role', () => {
        props.roles = ['ROLE_DATASCIENTIST'];
        const component = mount(
            <MemoryRouter>
                <USHeader {...props} />
            </MemoryRouter>
        );
        expect(component.find('span[children="Raw Data"]').length).toBe(1);
    });

    it('listens to history since constructor', () => {
        const component = shallow(<USHeader {...props} />);
        component.setState({
            currentPath: '/research'
        });
        component.update();
        expect(component.instance().props.history).toEqual(props.history);
        expect(props.history.listen).toHaveBeenCalled();
    });

    it('ignores updateCurrentPath if the path has changed', () => {
        const component = shallow(<USHeader {...props} />);
        component.setState({
            currentPath: '/research'
        });
        component.instance().updateCurrentPath('/hello-world');
        component.update();
        expect(component.instance().state.currentPath).toBe('/hello-world');
    });

    it('renders a link as active when it matches currentPath in state', () => {
        let component = shallow(<USHeader {...props} />);
        component.setState({
            currentPath: '/research'
        });
        component.update();

        expect(
            component.instance().renderNavLink('/home', 'Home', true)
        ).toMatchSnapshot();
        expect(
            component.instance().renderNavLink('/research', 'Research', true)
        ).toMatchSnapshot();
    });
});

describe('<USHeader> UI', () => {
    let component = shallow(<USHeader {...props} />);

    it('mobile menu starts closed, and toggles open/closed when icon button is clicked', () => {
        expect(component.state().mobileMenuIsExpanded).not.toBe(true);

        expect(component.find('button[children="Menu"]').length).toBe(1);
        component.find(`button[children="Menu"]`).simulate('click', {});
        component.update(); //wait for state change to finish
        expect(component.state().mobileMenuIsExpanded).toBe(true);

        expect(component.find('.usa-nav-close').length).toBe(1);
        component.find(`.usa-nav-close`).simulate('click', {});
        component.update(); //wait for state change to finish
        expect(component.state().mobileMenuIsExpanded).toBe(false);
    });

    it('updates the open sections when called', () => {
        expect(component.state().expandedSection).toBe('');
        const setAsExpanded = jest.spyOn(component.instance(), 'setAsExpanded');
        setAsExpanded(1);
        expect(component.state().expandedSection).toBe(1);
    });
});
