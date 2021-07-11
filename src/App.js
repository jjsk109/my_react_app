import React, { Component } from "react";
import TOC from "./componoents/TOC"
import ReadContent from "./componoents/ReadContent"
import CreateContent from "./componoents/CreateContent"
import UpdateContent from "./componoents/UpdateContent"
import Subject from "./componoents/Subject"
import Control from "./componoents/Control"
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state={
      mode:'welcome',
      selected_content_id:2,
      welcome:{title:'Welcome',desc:'Hello React!!'},
      subject:{title:'WEB', sub:'world wide web!'},
      contents:[
        {id:1, title:'HTML',desc:'HTML is HyperText ...'},
        {id:2, title:'CSS',desc:'CSS is design'},
        {id:3, title:'JavaScript',desc:'JavaScrips is interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        console.log(data);
        return data;
      }
      i = i + 1;
    }
   
  }
  getContent(){
    var _title, _desc,_article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article =  <ReadContent title={_title} desc={_desc}/>;
    }else if(this.state.mode === 'read'){
      
      var _content = this.getReadContent();
      console.log("_content",_content.title);
      _article =  <ReadContent  title={_content.title} desc={_content.desc}/>;
    }else if(this.state.mode === 'create'){
      _article =  <CreateContent onSubmit={function(_title,_desc){
        // add content to this.state.contents
        console.log(_title,_desc);
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title,desc:_desc}
        // );
        // var _cibtebts = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id,title:_title,desc:_desc});
        this.setState({
          contents:newContents
        });
      }.bind(this)} />;
    }else if(this.state.mode === 'update'){
      var _content = this.getReadContent();

      _article =  <UpdateContent data = {_content} onSubmit={function(_title,_desc){
        
        console.log(_title,_desc);
        this.max_content_id = this.max_content_id + 1;
       
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id,title:_title,desc:_desc});
        this.setState({
          contents:newContents
        });
      }.bind(this)} />;
    }
    return _article;
  }
  
  render(){
   
  
    return (
      <div className="App">
      <Subject title={this.state.subject.title} 
                sub={this.state.subject.sub}
                onChangePage={function(){
                  this.setState({
                    mode:'welcome',
                  });
                }.bind(this)}
      />
      <TOC  
        onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}
        data={this.state.contents}/>
      <Control
        onChangePage={function(_mode){
          this.setState({
            mode:_mode
          });
        }.bind(this)}
      />
      {this.getContent()}
     
      </div>
    );
  }
}

export default App;
