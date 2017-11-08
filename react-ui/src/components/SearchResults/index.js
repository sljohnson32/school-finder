import React, { Component } from 'react';
import FavoriteButton from '../../containers/FavoriteButton-container';
import './searchresults-style.css';

export default class SearchResults extends Component {
  toggleSchoolSelect() {
    if (this.props.schoolData.name === this.props.selectedSchool) {
      this.props.selectSchool('');
    } else this.props.selectSchool(this.props.schoolData);
  }

  render() {
    const {
      name,
      address,
      website,
      commute
    } = this.props.schoolData;
    const {
      refNum,
      schoolData,
      userId,
      commuteType
    } = this.props;

    return (
      <div>

        <div className={this.props.selectedSchool === name ? 'school-container selected' : 'school-container'} onClick={() => this.toggleSchoolSelect()}>
          <h3 className="results-fields">{`${refNum + 1}. ${name}`}</h3>
          <p className="results-fields">{address}</p>
          <a href={website} className="school-url results-fields" target="_blank">School Website</a>
          <section className="commute-info results-fields">
            <h4 className="results-fields">
              Commute Time:
              <span className="commute-info">
                {commute.time.text}
              </span>
            </h4>
            <h4 className="results-fields">
              Commute Distance: 
              <span className="commute-info">
                {commute.distance.text}
              </span>
            </h4>
          </section>
        </div>

        <FavoriteButton schoolInfo={ schoolData } commuteInfo={ commute } commuteType={ commuteType } userId={ userId } />
      </div>
    );
  }
}
