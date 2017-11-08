import { connect } from 'react-redux';
import { updateAddress, patchUserAddress, setSchools, clearSchools, setHomeAddress, setDirections, clearDirections, toggleInfoWindow, activeSearchToggle } from '../actions';

const mapStateToProps = state => (
  {
    schoolResults: state.FilterResults,
    activeSearch: state.FilterResults.activeSearch,
    CurrentUser: state.CurrentUser,
    comparedSchools: state.ComparedSchools,
    favorites: state.Favorites
  }
);

const mapDispatchToProps = dispatch => (
  {
    setSchools: (schoolResults, commuteTime, commuteDistance) => {
      dispatch(setSchools(schoolResults, commuteTime, commuteDistance));
    },
    clearSchools: () => {
      dispatch(clearSchools());
    },
    setHomeAddress: (homeAddress) => {
      dispatch(setHomeAddress(homeAddress));
    },
    setDirections: (directions) => {
      dispatch(setDirections(directions));
    },
    clearDirections: () => {
      dispatch(clearDirections());
    },
    toggleInfoWindow: (marker) => {
      dispatch(toggleInfoWindow(marker));
    },
    activeSearchToggle: () => {
      dispatch(activeSearchToggle());
    },
    patchUser: (address, userId) => {
      dispatch(patchUserAddress(address, userId));
    },
    updateAddress: (address) => {
      dispatch(updateAddress(address));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps);
