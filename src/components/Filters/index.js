import React, { Component } from 'react';
import { Link } from 'react-router';
import './filters-style.css';

export default class Filters extends Component {
  constructor() {
    super()
    this.state = {
      gradeLevel: '',
      schoolType: '',
      carMode: false,
      publicMode: false,
      bikeMode: false,
      walkMode: false,
    }
  }

  handleChange(evt) {
    let key = evt.target.id;
    let val = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  render() {
    return (
      <div className='filter-container'>
        <h2 className='filter-header'>Search Filters</h2>
        <section className='filter-fields'>
          <article className='filter-item'>
            <h4>Grade Level</h4>
            <select id='gradeLevel' value={ this.state.gradeLevel } onChange={(e) => this.handleChange(e)}>
              <option value=''>Select Grade Level...</option>
              <option value='ece-prek'>ECE/Pre-K</option>
              <option value='k-5'>K-5</option>
              <option value='6-8'>6-8</option>
              <option value='9-12'>9-12</option>
            </select>
          </article>
          <article className='filter-item'>
            <h4>School Type</h4>
            <select id='schoolType' value={ this.state.schoolType } onChange={(e) => this.handleChange(e)}>
              <option value=''>Select School Type...</option>
              <option value='public'>Public/District</option>
              <option value='charter'>Charter</option>
              <option value='magnet'>Magnet</option>
              <option value='9-12'>9-12</option>
            </select>
          </article>
          <article className='filter-item'>
            <h4>Transportation Options</h4>
            <input type='checkbox' id='carMode' value={ this.state.gradeLevel } onChange={(e) => this.handleChange(e)} />
            <label>Car</label><br/>
            <input type='checkbox' id='publicMode' value={ this.state.gradeLevel } onChange={(e) => this.handleChange(e)} />
            <label>Public Transit</label><br/>
            <input type='checkbox' id='bikeMode' value={ this.state.gradeLevel } onChange={(e) => this.handleChange(e)} />
            <label>Bike</label><br/>
            <input type='checkbox' id='walkMode' value={ this.state.gradeLevel } onChange={(e) => this.handleChange(e)} />
            <label>Walk</label>
          </article>
          <article className='filter-item'>
            <h4>Commute Distance(miles)</h4>
            distance slider
          </article>
          <article className='filter-item'>
            <h4>Commute Time(mins)</h4>
            time slider
          </article>
        </section>
        <button className='search-btn'>Find Schools</button>
      </div>
    )
  }
}
