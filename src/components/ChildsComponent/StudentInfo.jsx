import React, { Component } from 'react'

export default class StudentInfo extends Component {

  handleChange = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
  }

  render() {
    return (
      <div className="card my-5">
        <div className="card-header text-left bg-dark text-white"><h2>Thông tin sinh viên</h2></div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group text-left">
                <label htmlFor="maSV">Mã SV</label>
                <input onChange={(event) => {
                  this.handleChange(event)
                }} type="text" className="form-control" id='maSV' name='maSV' />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group text-left">
                <label htmlFor="hoTen">Họ tên</label>
                <input type="text" className="form-control" id='hoTen' />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group text-left">
                <label htmlFor="soDT">Số điện thoại</label>
                <input type="text" className="form-control" id='soDT' />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group text-left">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id='email' />
              </div>
            </div>
          </div>
          <div className="form-group text-left">
            <button className='btn btn-success'>Thêm sinh viên</button>
          </div>
        </div>
      </div>
    )
  }
}
