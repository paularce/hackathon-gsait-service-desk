import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class USForm extends PureComponent {
    static propTypes = {
        legend: PropTypes.string.isRequired,
        legendIsSrOnly: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    render() {
        const { className, legendIsSrOnly, legend, children } = this.props;
        return (
            <form className={`usa-form ${className}`}>
                <fieldset>
                    <legend className={legendIsSrOnly ? 'usa-sr-only' : ''}>
                        {legend}
                    </legend>

                    {children}
                </fieldset>
            </form>
        );
    }
}
