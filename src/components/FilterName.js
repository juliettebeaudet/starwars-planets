import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterNameAction, fullListAction } from '../actions';

class FilterName extends React.Component {

  render() {
    const { fetching, getInput, fullList } = this.props;
    return (
      <div>
        {!fetching && (
          <div>
            <h4>Search for specific planet:</h4>
            <input
              data-testid="name-filter"
              type="text"
              name=""
              onChange={(e) => getInput(e.target.value)}
            />
          </div>
        )}
        <button onClick={() => fullList('')}>Back to full list</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetching: state.planetReducer.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  getInput: (input) => dispatch(filterNameAction(input)),
  fullList: (input) => dispatch(fullListAction(input)),
});

FilterName.propTypes = {
  fetching: propTypes.bool.isRequired,
  getInput: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterName);
