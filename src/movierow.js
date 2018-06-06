import React from 'react';

class Movierow extends React.Component{
    render(){
        return <table key={this.props.movie.imdbID} className="rowcss" >
        <tbody >
          <tr>
            <td>
              <img alt="Movie poster" width="100" src={this.props.movie.poster}/>
            </td>
            <td>
              <h4>{this.props.movie.title} ({this.props.movie.year})</h4>
              <p>{this.props.movie.plot}</p>
              
            </td>
          </tr>  
        </tbody>
    </table>
    }

}

export default Movierow