import React, { Component } from 'react';
import firebase from '../../firebase';
import SearchResults from '../SearchResults';
import getGeoLocation from '../Helpers/getGeoLocation.js'
import './filters-style.css';

export default class Filters extends Component {
  constructor() {
    super()
    this.state = {
      gradeLevel: '',
      schoolType: '',
      carMode: false,
      publicMode: false,
      walkMode: false,
      commuteDist: 15,
      commuteTime: 30,
      viewFilters: true,
      homeAddress: '',
    }
  }

  handleChange(evt) {
    let key = evt.target.id;
    let val = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    let obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  toggleFilterView() {
    this.setState({ viewFilters: !this.state.viewFilters })
  }

  secondaryFilters(data) {
    let { gradeLevel } = this.state
    let newArr = data.reduce((acc, school) => {
      if (school.GradeLevels.indexOf(gradeLevel) >= 0) {
        acc.push(school);
      } return acc;
    }, [])
    return newArr
  }

  findSchools() {
    let { schoolType } = this.state;

    firebase.database().ref().orderByChild('SchoolTypeDescription').equalTo(schoolType).on('value', snap => {
      //add a function here to filter that each snap has gradeLevel && schoolType
      this.props.setSchools(this.secondaryFilters(snap.val()))

    })
  }

  getCommuteData() {
    let { carMode, publicMode, bikeMode, walkMode } = this.state
    console.log('Commute!')
    console.log(carMode, publicMode, bikeMode, walkMode)
  }


  callback(homeAddressCoords) {
    // this.setState({ homeAddressCoords });
    this.props.setHomeAddress(homeAddressCoords)
  }
  handleHomeAddress(e) {
    getGeoLocation(e.target.value, this.callback.bind(this));
  }

  handleFinder() {
    this.props.setSchools([]);
    this.findSchools();
    this.toggleFilterView();
  }

  render() {
    return (
      <div className='filter-container'>
        {this.state.viewFilters ?
          <div>
            <h2 className='filter-header'>Search Filters</h2>
            <form className='filter-fields'>
              <article className='filter-item'>
                <h4>Home Street Address</h4>
                <input id='homeAddress' type='text' value={ this.state.homeAddress } onChange={ (e) => this.handleChange(e)} onBlur={ (e) => this.handleHomeAddress(e) } />
              </article>
              <article className='filter-item'>
                <h4>Grade Level</h4>
                <select id='gradeLevel' value={ this.state.gradeLevel } onChange={(e) => this.handleChange(e)}>
                  <option value=''>Select grade level...</option>
                  <option value='1'>ECE/Pre-K</option>
                  <option value='2'>K-5</option>
                  <option value='3'>6-8</option>
                  <option value='4'>9-12</option>
                </select>
              </article>
              <article className='filter-item'>
                <h4>School Type</h4>
                <select id='schoolType' value={ this.state.schoolType } onChange={(e) => this.handleChange(e)}>
                  <option value=''>Select school type...</option>
                  <option value='Public'>Public/District</option>
                  <option value='Charter'>Charter</option>
                  <option value='Magnet'>Magnet</option>
                  <option value='Other'>Other</option>
                </select>
              </article>
              <article className='filter-item'>
                <h4>Transportation Options</h4>
                <input type='checkbox' id='carMode' value={ this.state.carMode } onChange={(e) => this.handleChange(e)} />
                <label>Car</label><br/>
                <input type='checkbox' id='publicMode' value={ this.state.publicMode } onChange={(e) => this.handleChange(e)} />
                <label>Public Transit</label><br/>
                <input type='checkbox' id='walkMode' value={ this.state.walkMode } onChange={(e) => this.handleChange(e)} />
                <label>Walk</label><br/>
              </article>
              <article className='filter-item'>
                <h4>Commute Distance</h4>
                <input
                  id='commuteDist'
                  className='slider'
                  type="range"
                  max="30"
                  value={this.state.commuteDist}
                  onChange={(e) => this.handleChange(e)}
                />
                <p className='slider-data'>{this.state.commuteDist} miles</p>
              </article>
              <article className='filter-item'>
                <h4>Commute Time</h4>
                <input
                  id='commuteTime'
                  className='slider'
                  type="range"
                  max="60"
                  value={this.state.commuteTime}
                  onChange={(e) => this.handleChange(e)}
                />
                <p className='slider-data'>{this.state.commuteTime} mins</p>
              </article>
            </form>
            <button
              className='search-btn'
              onClick={ () => this.handleFinder() }
            >Find Schools</button>
          </div>
          :
          <div>
            <h2 className='filter-header'>Search Results</h2>
            <button
            className='filter-back-btn'
            onClick={ () => this.toggleFilterView() }
            >« Search Filters</button>
            {this.props.schoolResults.schools.map((school, i) => {
              return <SearchResults key={ i } schoolData={ school } />
            })}
          </div>
          }
      </div>
    )
  }
}
