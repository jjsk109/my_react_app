import React, { Component } from "react";

class UpdateContent extends Component{
    shouldComponentUpdate(){
        
    }
    render(){
        console.log("UpdateContent render");
        console.log(this.props.data);
        return(
           <article>
               <h2>Update</h2>
               <form action="/create_pocess" method="post"
                    onSubmit={function(e){
                        e.preventDefault()
                        
                        this.props.onSubmit(
                            e.target.title.value,
                            e.target.desc.value
                        )
                    }.bind(this)}
               >
                   <p><input type="text" name="title" placeholder="title" value={this.props.data.title} ></input></p>
                   <p>
                       <textarea name="desc" placeholder="description"value={this.props.data.desc}></textarea>
                   </p>
                   <p>
                       <input type="submit"></input>
                   </p>
               </form>
           </article>
        )
    }
}

export default UpdateContent;