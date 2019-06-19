import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import USAccordionSegment from './USAccordionSegment';

export default class USAccordion extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
            .isRequired,
        initialOpenSegment: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            openSegment: props.initialOpenSegment || ''
        };
    }

    updateOpenSegment = id => {
        this.setState({ openSegment: id });
    };

    render() {
        let managedChildren = this.props.children.map(child => {
            return (
                <USAccordionSegment
                    {...child.props}
                    key={child.props.id}
                    updateOpenSegment={this.updateOpenSegment}
                    isExpanded={child.props.id === this.state.openSegment}
                />
            );
        });

        return <ul className="usa-accordion">{managedChildren}</ul>;
    }
}
