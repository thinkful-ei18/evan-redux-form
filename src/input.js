import React from 'react';

export default class Input extends React.Component {

  render() {
    const {input: {value, onChange}} = this.props;
    let err;
    if (this.props.meta.touched && this.props.meta.error) {
      err = <span><br/><b> {this.props.meta.error.message} </b></span>;
    }
    return (
      <div className='tracking-input'>
        <label htmlFor='trackNumber'>Tracking Number
         {err}
        </label>
        <input name='trackingNumber' onChange={onChange} value={value} id='trackNumber'/>
      </div>
    )
  }
}