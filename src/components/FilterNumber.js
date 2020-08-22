import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterNumberAction } from '../actions';

class FilterNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.hChange = this.hChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  hChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    const { getNumberInput } = this.props;
    const { column, comparison, value } = this.state;
    getNumberInput(column, comparison, value);
  }
  
  render() {
    const { hChange, handleClick } = this;
    const { fetching, filterNumber } = this.props;
    const columnOptions = ['', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const comparisonOptions = ['', 'more than', 'less than', 'equal to'];
    const columnFilters = filterNumber.map((filter) => filter.column);
    const remainingColumns = columnOptions.filter((column) => !columnFilters.includes(column));
    return (
      <div>
        {!fetching && (
          <div>
            <h4>Apply more filters:</h4>
            <select name="column" data-testid="column-filter" onChange={hChange}>
              <option hidden disabled selected value>By Column</option>
              {remainingColumns.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select name="comparison" data-testid="comparison-filter" onChange={hChange}>
              <option hidden disabled selected value>By Comparison</option>
              {comparisonOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input data-testid="value-filter" type="number" name="value" onChange={hChange} placeholder="Insert value"/>
            <button type="button" data-testid="button-filter" onClick={handleClick}>
              Filter
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetching: state.planetReducer.fetching,
  filterNumber: state.filters.filterByNumericValues,
});

const mapDispatchToProps = (dispatch) => ({
  getNumberInput: (column, comparison, value) =>
    dispatch(filterNumberAction(column, comparison, value)),
});

FilterNumber.propTypes = {
  fetching: propTypes.bool.isRequired,
  getNumberInput: propTypes.func.isRequired,
  filterNumber: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterNumber);
