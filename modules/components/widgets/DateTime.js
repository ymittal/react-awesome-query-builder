import React, {Component, PropTypes} from 'react';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import moment from 'moment';
import { LocaleProvider } from 'antd';
import {getAntLocale} from '../../utils';


export default class DateTimeWidget extends Component {
    static propTypes = {
        setValue: PropTypes.func.isRequired,
        delta: PropTypes.number.isRequired,
        timeFormat: PropTypes.string,
        dateFormat: PropTypes.string,
        valueFormat: PropTypes.string,
    };

    constructor(props) {
        super(props);

        const {valueFormat, value, setValue} = props;
        let mValue = value ? moment(value, valueFormat) : null;
        if (mValue && !mValue.isValid()) {
            setValue(null);
        }

        moment.locale(this.props.config.settings.locale.short);
    }

    static defaultProps = {
        timeFormat: 'HH:mm',
        dateFormat: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
    };

    handleChange(_value) {
        const {setValue, valueFormat} = this.props;
        const value = _value instanceof moment && _value.isValid() ? _value.format(valueFormat) : null;
        if (value || _value === null)
            setValue(value);
    }

    render() {
        const {dateFormat, timeFormat, valueFormat, value, locale} = this.props;
        let dateValue = value ? moment(value, valueFormat) : null;
        return (
            <LocaleProvider locale={getAntLocale(this.props.config.settings.locale.full2)}>
                <DatePicker 
                    key="widget-datetime"
                    showTime={{ format: timeFormat }}
                    placeholder={this.props.placeholder} 
                    size={this.props.config.settings.renderSize || "small"}
                    format={dateFormat + ' ' + timeFormat}
                    value={dateValue}
                    onChange={this.handleChange.bind(this)}
                    ref="datetime"
                />
            </LocaleProvider>
        );
    }
}