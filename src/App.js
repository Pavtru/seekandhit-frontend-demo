import React, { Component } from 'react';
import './App.css';
import Movierow from "./movierow.js";
import $ from "jquery"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'



class App extends Component {
  constructor(props){
    super(props)


    
      this.state= {
        selectedOption: "G", 
        selectedgenre: [],
        options: ["Movie","Series"],
       curroption:"",
       ratingover:"0",
       metaover:"0",
       comedyover:"0",
       newgrouprow1: [],
       newgrouprow2: [],
       newgrouprow3: [],
       movietype: "typeone",
       seriestype:"typetwo",

      }
     
    this.performfilter()
  }
  

  performfilter(){
      
      const urlstr= "http://localhost:3001/movies"
      $.ajax({
        url: urlstr,
        success: (filterresult) => {
         
        
          const movies= filterresult
          var movierows = [], newrow1 =[], newrow2 =[], newrow3 =[]
          this.setState({ratingover: ""})
          this.setState({metaover: ""})
          this.setState({comedyover: ""})
          var tempr = 0;
          var tempm = 0;
          var tempc = 0;
          movies.forEach(movies => {
            
            const movie= <Movierow movie={movies} />
         
              if(movies.rated === this.state.selectedOption && movies.genre.some(r=> this.state.selectedgenre.includes(r)) && movies.type === this.state.curroption.toLowerCase() )
                 {
                  if(parseInt(movies.rating,10) > 7){++tempr; this.setState({ratingover: tempr});  newrow1.push(movie)}
                  
                  if(parseInt(movies.metascore,10) > 70){++tempm; this.setState({metaover: tempm}); newrow2.push(movie)}

                  if(movies.genre.includes("Comedy") ){++tempc; this.setState({comedyover: tempc}); newrow3.push(movie)}

                   movierows.push(movie) 
                 }   
           });

          this.setState({rows: movierows})
          this.setState({newgrouprow1: newrow1})
          this.setState({newgrouprow2: newrow2})
          this.setState({newgrouprow3: newrow3})
         
        },

        error: (xhr, status, err) => {
          console.error("filter failed")
        }
    })    
  }
 
   handleOptionChange(changeEvent){
      this.performfilter()
      this.setState({selectedOption: changeEvent.target.value})
   }


   handleCheckChange(event){
    
    var newgenre = this.state.selectedgenre;
    if(newgenre.includes(event.target.value)){
      var index = newgenre.indexOf(event.target.value)
      newgenre.splice(index,1)
    }
    else{
      newgenre.push(event.target.value)
    this.setState({selectedgenre: newgenre})
    }
    
    
    this.performfilter()
        this.setState({isChecked: event.target.value.checked})
        
   }

   handlebtnclick(event){
    
    
     
    if(event.target.value === "ratingofm"){ 
      var grouprow1 = this.state.newgrouprow1
    
     this.setState({rows: grouprow1})
    }
    if(event.target.value === "metascoreofm"){
      var grouprow2 = this.state.newgrouprow2
     
     this.setState({rows: grouprow2})
    }
    if(event.target.value === "commedym"){
      var grouprow3 = this.state.newgrouprow3
    
     this.setState({rows: grouprow3})
    }
  
   }
   handledrop(e){
    console.log(e.value)
    if(e.value==="Movie"){this.setState({movietype: "typeone"}); this.setState({seriestype: "typetwo"})}
    if(e.value==="Series"){this.setState({seriestype: "typeone"}); this.setState({movietype: "typetwo"})}
    this.setState({curroption: e.value})
    this.performfilter()
   
    
  }
 

  render() {
    return (
      <div className="App">
        <table className="app-test" >
          <tbody>
            <tr>
              <td valign="top">
              <h3 >Type</h3> 
              <Dropdown options={this.state.options} onClick={this._onSelect} onChange={this.handledrop.bind(this)}  value={this.state.curroption} placeholder="Select a type" />
              
              <form >
               
    <div className="form-field">
    <h3>Rated</h3>

    <div className={this.state.movietype}>
    <div  className="form-fieldradio">
      <label className="radiocontainer" >
        <input   type="radio"  value="G"  checked={this.state.selectedOption === 'G'} onChange={this.handleOptionChange.bind(this)} />
        G   
        <span class="radiocheckmark"></span>   
      </label>
    </div>
    <div className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="PG" checked={this.state.selectedOption === 'PG'}  onChange={this.handleOptionChange.bind(this)}/>
        PG
        <span class="radiocheckmark"></span>
      </label>
    </div>
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="PG-13" checked={this.state.selectedOption === 'PG-13'} onChange={this.handleOptionChange.bind(this)}/>
        PG-13
        <span class="radiocheckmark"></span>
      </label>
    </div>
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="R" checked={this.state.selectedOption === 'R'} onChange={this.handleOptionChange.bind(this)} />
        R
        <span class="radiocheckmark"></span>
      </label>
    </div>
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="NC-17" checked={this.state.selectedOption === 'NC-17'} onChange={this.handleOptionChange.bind(this)} />
        NC-17
        <span class="radiocheckmark"></span>
      </label>
    </div>
    
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="NOT RATED" checked={this.state.selectedOption === 'NOT RATED' } onChange={this.handleOptionChange.bind(this)}/>
        Not rated
        <span class="radiocheckmark"></span>
      </label>
    </div>
    </div>

    <div className={this.state.seriestype}>

      <div  className="form-fieldradio">
      <label className="radiocontainer"  >
        <input   type="radio"  value="TV-Y7"  checked={this.state.selectedOption === 'TV-Y7'} onChange={this.handleOptionChange.bind(this)} />
        TV-Y7  
        <span class="radiocheckmark"></span>    
      </label>
    </div>
    <div className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="TV-G" checked={this.state.selectedOption === 'TV-G'}  onChange={this.handleOptionChange.bind(this)}/>
        TV-G
        <span class="radiocheckmark"></span>
      </label>
    </div>
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="TV-PG" checked={this.state.selectedOption === 'TV-PG'} onChange={this.handleOptionChange.bind(this)}/>
        TV-PG
        <span class="radiocheckmark"></span>
      </label>
    </div>
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="TV-14" checked={this.state.selectedOption === 'TV-14'} onChange={this.handleOptionChange.bind(this)} />
        TV-14
        <span class="radiocheckmark"></span>
      </label>
    </div>
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="TV-MA" checked={this.state.selectedOption === 'TV-MA'} onChange={this.handleOptionChange.bind(this)} />
        TV-MA
        <span class="radiocheckmark"></span>
      </label>
    </div>
    
    <div  className="form-fieldradio">
      <label className="radiocontainer">
        <input type="radio" value="N/A" checked={this.state.selectedOption === 'N/A' } onChange={this.handleOptionChange.bind(this)}/>
        N/A
        <span class="radiocheckmark"></span>
      </label>
    </div>

    </div>




    <h3>Genre</h3>
    </div>
    <div>
    <div className="form-field">
      <div className="row">
       
      
          <div className="form-field" onSubmit={this.handleFormSubmit}>
          
          <div  className="checkdiv">          
          <label className="checkcontainer">
          <input type="checkbox" value="Action" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} /> Action  
          <span class="checkmark"></span>
          </label>
          </div>
          
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Adventure" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} /> Adventure
          <span class="checkmark"></span>
          </label>
          </div>
          
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Comedy" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} /> Comedy 
          <span class="checkmark"></span>
          </label>
          </div>
         
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Crime" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} /> Crime
          <span class="checkmark"></span>
          </label>
          </div>
         
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Drama" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} /> Drama
          <span class="checkmark"></span>
          </label>
          </div>
         
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Family" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} /> Family
          <span class="checkmark"></span>
          </label>
          </div>
          
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Fantasy" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} /> Fantasy 
          <span class="checkmark"></span>
          </label>
          </div>
         
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Horror" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} />Horror
          <span class="checkmark"></span>
          </label>
          </div>
          
          <div className="checkdiv">
          <label  className="checkcontainer">
          <input type="checkbox" value="Romance" checked={this.state.isChecked} onClick={this.handleCheckChange.bind(this)} />Romance
          <span class="checkmark"></span>
          </label>
          </div>
         
            <button className="btn" >Save current filter</button>
          </div>
         
        
      </div>
    </div>
    </div>
  </form>


              </td>
             
              <td className="vertical">
                <div ></div>
              </td>

                <td className="top-align">
                  <table>
                    <tbody >
                      <tr>
                        <td>
                      <h3>From current filter:</h3>
                        </td>
                      </tr>  
                      <tr className="topbtn">
                      
                        <td  >
                        <div className="hardbtnwrap">
                        <table valign="top">
                          <tbody>
                            <tr>
                              <td className="topbtntable">
                        <button className="hardbuton" value="ratingofm" type="submit" onClick={this.handlebtnclick.bind(this)}>{this.state.ratingover}</button>
                        <p className="topbtntable">Rating > 7</p>
                        </td>
                        
                        
                        <td className="topbtntable">
                        <button className="hardbuton" value="metascoreofm" type="submit" onClick={this.handlebtnclick.bind(this)}>{this.state.metaover}</button>
                        <p className="topbtntable">Metascore > 75</p>
                        </td>
                        
                        <td className="topbtntable">
                        <button className="hardbuton" value="commedym" type="submit" onClick={this.handlebtnclick.bind(this)}>{this.state.comedyover}</button>
                        <p className="topbtntable">Comedy genre</p>
                        </td>
                        </tr>
                        
                        </tbody>
                        </table>
                        </div>
                        </td>
                        
                        
                      </tr>
                      <tr ><td className="horizontal"></td></tr>
                    <tr>
                      <td>
                        {this.state.rows}
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default App;
