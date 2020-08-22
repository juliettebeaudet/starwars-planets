import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearAction } from '../actions';

class ClearFilters extends React.Component {

  render() {
    const { clearAll } = this.props;
    return (
      <button className="button-clear" onClick={() => clearAll()}>
        Clear all filters
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearAll: (e) => dispatch(clearAction(e)),
});

ClearFilters.propTypes = {
  clearAll: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ClearFilters);
