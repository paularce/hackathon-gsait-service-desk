import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

//Note: A USAccordionSegment belongs within a <ul> with class "usa-accordion".
export default class USAccordionSegment extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        isExpanded: PropTypes.bool,
        buttonText: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        updateOpenSegment: PropTypes.func.isRequired
    };

    static defaultProps = {
        isExpanded: false
    };

    onClick = () => {
        this.props.updateOpenSegment(this.props.id);
    };

    render() {
        return (
            <li id={this.props.id}>
                <button
                    className="usa-accordion__button"
                    aria-expanded={this.props.isExpanded}
                    aria-controls={this.props.id}
                    onClick={this.onClick}
                >
                    {this.props.buttonText}
                </button>
                <div
                    className="usa-accordion__content"
                    aria-hidden={!this.props.isExpanded}
                >
                    {this.props.children}
                </div>
            </li>
        );
    }
}
