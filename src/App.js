import React from 'react';
import './App.css';

// Show the rendered table (grid of numbers).
class TableDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styleKey = '--width-' + this.props.table;
    const styleVal = this.props.w + '%';

    return (
      <div>
        <table className={'table-' + this.props.table} style={{[styleKey] : styleVal}}>
          {createTableBody(this.props.n, this.props.x, this.props.m, this.props.d)}
        </table>
      </div>
    );
  }
}

// Create all the rows in the table.
function createTableBody(start, increment, limit, ltr) {
  const istart = parseInt(start);
  const iincrement = parseInt(increment);
  const ilimit = parseInt(limit);
  const numRows = Math.ceil((ilimit - istart) / iincrement / 5);

  var bltr = (ltr == 'true')
  var rows = [];
  for (let i = 0; i < numRows; i++) {
    let offset = i * 5 * increment;
    rows.unshift(createRow(istart + offset, iincrement, ilimit, bltr))
    bltr = !bltr;
  }
  return <tbody>{rows}</tbody>;
}

// Create one row in the table. If ltr is true, then push each
// value to the end to simulate counting up. If ltr is false,
// then push each value to the front to simulate counting down.
function createRow(start, increment, limit, ltr) {
  var cells = [];
  for (let i = 0; i < 5; i++) {
    let number = start + (i * increment);
    let enabled = number <= limit;
    if (ltr) {
      cells.push(createCell(number, enabled));
    } else {
      cells.unshift(createCell(number, enabled))
    }
  }
  return <tr>{cells}</tr>;
}

// Create one cell in a row.
function createCell(number, enabled) {
  return <td id={number} className={'cell-enabled-' + enabled}>{number}</td>;
}

// The form for modifying the table attributes.
class TableForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.n = React.createRef();
    this.x = React.createRef();
    this.m = React.createRef();
    this.w = React.createRef();
    this.d = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormChange(this.n.current.name, this.n.current.value);
    this.props.onFormChange(this.x.current.name, this.x.current.value);
    this.props.onFormChange(this.m.current.name, this.m.current.value);
    this.props.onFormChange(this.w.current.name, this.w.current.value);
    this.props.onFormChange(this.d.current.name, this.d.current.value);
    this.props.onConfigAction();
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.onConfigAction();
  }

  render() {
    return (
      <div id="results" className="search-results">
      <form onSubmit={this.handleSubmit}>
        <table id="input">
          <tbody>
            <tr>
              <td><label>table: </label><label>{this.props.table}</label></td>
            </tr>
            <tr>
              <td>
                <label>n: </label>
                <input type="text" name="n" defaultValue={this.props.n} ref={this.n} maxlength="5" size="5" />
              </td>
            </tr>
            <tr>
              <td>
                <label>x: </label>
                <input type="text" name="x" defaultValue={this.props.x} ref={this.x} maxlength="5" size="5" />
              </td>
            </tr>
            <tr>
              <td>
                <label>m: </label>
                <input type="text" name="m" defaultValue={this.props.m} ref={this.m} maxlength="5" size="5" />
              </td>
            </tr>
            <tr>
              <td>
                <label>w: </label>
                <input type="text" name="w" defaultValue={this.props.w} ref={this.w} maxlength="5" size="5" />
                %
              </td>
            </tr>
            <tr>
              <td>
                <label>d: </label>
                <select name="d" defaultValue={this.props.d} ref={this.d}>
                  <option value="true">LTR-UP</option>
                  <option value="false">RTL-UP</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Ok" />
                <input type="button" value="Cancel" onClick={this.handleCancel} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
    );
  }
}

// The component containing the rendered table and its form.
class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      table: this.props.table,
      n: this.props.n,
      x: this.props.x,
      m: this.props.m,
      w: this.props.w,
      d: this.props.d
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({show: !this.state.show})
  }

  handleInputChange(name, value) {
    this.setState({[name]: value});
  }

  render() {
    const table = this.state.table;
    const n = this.state.n;
    const x = this.state.x;
    const m = this.state.m;
    const w = this.state.w;
    const d = this.state.d;

    return (
      <div>
        <TableDisplay table={table} n={n} x={x} m={m} w={w} d={d} />
        <div>
          <input type="button" value="Configure" onClick={this.onClick} />
          { this.state.show ? <TableForm
              table={table} n={n} x={x} m={m} w={w} d={d}
              onFormChange={(name, value) => this.handleInputChange(name, value)}
              onConfigAction={() => this.onClick()}
              /> : null }
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <table className="main-table">
        <tbody>
          <tr>
            <td>
              <Table table='red' n='8' x='1' m='29' w='20' d='true' />
            </td>
            <td>
              <Table table='green' n='231' x='1' m='247' w='30' d='true' />
            </td>
            <td>
              <Table table='blue' n='47' x='2' m='81' w='40' d='false' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
