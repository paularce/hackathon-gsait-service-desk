import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class USAlert extends PureComponent {
    static propTypes = {
        heading: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        level: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
    };

    static defaultProps = {
        children: null,
        level: 'info'
    };

    render() {
        return (
            <div className={`usa-alert usa-alert--${this.props.level}`}>
                <div
                    className="usa-alert__body"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <h3 className="usa-alert__heading">{this.props.heading}</h3>
                    <p className="usa-alert__text">{this.props.children}</p>
                </div>
            </div>
        );
    }
}
