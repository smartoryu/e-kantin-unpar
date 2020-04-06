// class component
import React, { Component } from "react";
// axios
import Axios from 'axios'
// react-router dom
import { Link, Redirect } from "react-router-dom";
// redux
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'

class LoginPage extends Component {
  state = {
    adminMail: undefined,
    adminPassword: undefined,
    alert: false,
    message: '',
    berhasil: false
  };

  onLoginclick = () => {
    let data = {
      adminMail: this.state.adminMail,
      adminPassword: this.state.adminPassword
    }

    Axios.post(`http://localhost:1919/admin/login`,data)
    .then((res) => {
      console.log(res.data)
      if(res.data.error===false){
        localStorage.setItem('admin',res.data.result.id)
        this.props.LoginSuccessAction(res.data.result)
        this.setState({ berhasil: true })
      }
      this.setState({ 
        alert: res.data.error ,
        message: res.data.message
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {

    if(this.state.berhasil){
      return(
        <Redirect from="/admin/login" to="/admin/manageMerchant" />
      )
    }

    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" >
            <input onChange={(e)=>this.setState({ adminMail:e.target.value })} type="text" placeholder="email" />
            <input onChange={(e)=>this.setState({ adminPassword:e.target.value })} type="password" placeholder="password" />
          </form>
            <div>
              <button onClick={()=>this.onLoginclick()}>login</button>
            </div>

            {this.state.alert ? (
              <div style={{ marginTop: 20 }}>
                <div
                  onClick={() => this.setState({ alert: false })}
                  className="col-sm-12 alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  role="alert"
                  data-brk-library="component__alert"
                  style={{ height: "25px" }}>
                  <strong style={{ fontSize: "12px", top: "-1000%" }} className="font__weight-semibold">
                    {this.state.message}
                  </strong>
                </div>
              </div>
            ) : null}

          
        </div>
      </div>
    );
  }
}

const MapstateToprops =(state)=>{
  return{
      Auth: state.Auth
  }
}

export default connect(MapstateToprops, {LoginSuccessAction}) (LoginPage);
