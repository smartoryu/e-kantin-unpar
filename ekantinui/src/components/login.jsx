import React, { Component } from "react";

class LoginPage extends Component {
  state = {
    alert: true,
    message: "Email yang Anda masukan tidak terdaftar!",
  };
  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>login</button>

            {this.state.alert ? (
              <div style={{ marginTop: 20 }}>
                <div
                  onClick={() => this.setState({ alert: false })}
                  className="col-sm-12 alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  role="alert"
                  data-brk-library="component__alert"
                  style={{ height: "20px" }}>
                  <strong style={{ fontSize: "10px", top: "-1000%" }} className="font__weight-semibold">
                    {this.state.message}
                  </strong>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
