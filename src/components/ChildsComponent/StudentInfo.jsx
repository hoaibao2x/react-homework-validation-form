import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentInfo extends Component {

  handleChange = (event) => {
    let { name, value } = event.target;
    let newVal = { ...this.props.sinhVien.values, [name]: value };

    let newErrorsVal = { ...this.props.sinhVien.errors };
    let errorMess = '';

    // Check empty
    if (value.trim() === '') {
      errorMess = `${name} không được để trống !`;
    }

    let typeVal = event.target.getAttribute('inputname');
    if (typeVal === 'maSV') {
      // Check validation id
      let regExId = /^[0-9]+$/;
      if (!regExId.test(value)) {
        errorMess = 'ID phải là kiểu số !';
      }
      // Check duplication id
      for (let i = 0; i < this.props.mangSinhVien.length; i++) {
        if (this.props.mangSinhVien[i].maSV === value) {
          errorMess = 'ID ko được trùng !';
        }
      }
    } else if (typeVal === 'hoTen') {
      // Check validation name
      let regExName = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
      if (!regExName.test(value)) {
        errorMess = 'Họ tên không đúng định dạng !';
      }
    } else if (typeVal === 'sdt') {
      // Check validation phone number
      let regExPhone = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/;
      if (!regExPhone.test(value)) {
        errorMess = 'Số điện thoại không đúng định dạng !';
      }
    } else if (typeVal === 'email') {
      let regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regExEmail.test(value)) {
        errorMess = 'Email không đúng định dạng !';
      }
    }

    newErrorsVal[name] = errorMess;

    let action = {
      type: 'HANDLE_CHANGE',
      sinhVien: {
        values: newVal,
        errors: newErrorsVal
      }
    }

    this.props.dispatch(action)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    for (const key in this.props.sinhVien.errors) {
      if (this.props.sinhVien.errors[key] !== '') {
        isValid = false;
        break
      }
    }

    for (const key in this.props.sinhVien.values) {
      if (this.props.sinhVien.values[key] === '') {
        isValid = false;
        break
      }
    }

    if (!isValid) {
      alert('Dữ liệu không hợp lệ !');
      return;
    }

    let action = {
      type: 'THEM_SINH_VIEN',
      sinhVien: this.props.sinhVien.values
    }
    this.props.dispatch(action);
  }

  render() {
    return (
      <div className="card my-5">
        <div className="card-header text-left bg-dark text-white"><h2>Thông tin sinh viên</h2></div>
        <div className="card-body">
          <form onSubmit={(event) => {
            this.handleSubmit(event);
          }}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="maSV">Mã SV</label>
                  <input onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='maSV' name='maSV' inputname='maSV' />
                  <span className='text-danger'>{this.props.sinhVien.errors.maSV}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="hoTen">Họ tên</label>
                  <input onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='hoTen' name='hoTen' inputname='hoTen' />
                  <span className='text-danger'>{this.props.sinhVien.errors.hoTen}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="sdt">Số điện thoại</label>
                  <input onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='sdt' name='sdt' inputname='sdt' />
                  <span className='text-danger'>{this.props.sinhVien.errors.sdt}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="email">Email</label>
                  <input onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='email' name='email' inputname='email' />
                  <span className='text-danger'>{this.props.sinhVien.errors.email}</span>
                </div>
              </div>
            </div>
            <div className="form-group text-left">
              <button className='btn btn-success'>Thêm sinh viên</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    sinhVien: rootReducer.QLSinhVienReducer.sinhVien,
    mangSinhVien: rootReducer.QLSinhVienReducer.mangSinhVien
  }
}


export default connect(mapStateToProps)(StudentInfo)