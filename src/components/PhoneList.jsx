import React, { Component } from 'react'

export default class PhoneList extends Component {
  render() {
    const phones = ['Apple', 'Samsung', 'Xiaomi', 'Pixel']
    
    return (
      <div>
        <h3>Phone Manufacturers</h3>
        <ul>
          {phones.map((phone) => (
            <li key={phone}>{phone}</li>
          ))}
        </ul>
      </div>
    )
  }
}