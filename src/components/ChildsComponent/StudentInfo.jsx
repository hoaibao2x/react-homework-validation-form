import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentInfo extends Component {

  state = {
    sinhVienState: {
      maSV: '',
      hoTen: '',
      sdt: '',
      email: ''
    }
  }

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

  handleSubmit = () => {
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
      return isValid;
    }

    let action = {
      type: 'THEM_SINH_VIEN',
      sinhVien: this.props.sinhVien.values
    }
    this.props.dispatch(action);

    return isValid;
  }

  static getDerivedStateFromProps(newProps, currentState) {

    if (newProps.sinhVien.values.maSV !== currentState.sinhVienState.maSV) {
      return {
        ...currentState, values: newProps.sinhVien.values
      }
    }

    return currentState;
  }

  render() {
    let { maSV, hoTen, sdt, email } = this.props.sinhVien.values;
    let isVisible = this.props.isVisible;
    return (
      <div className="card my-5">
        <div className="card-header text-left bg-dark text-white"><h2>Thông tin sinh viên</h2></div>
        <div className="card-body">
          <form onSubmit={(event) => {
            event.preventDefault();
            this.handleSubmit(event);
          }}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="maSV">Mã SV</label>
                  <input disabled={isVisible ? true : false} onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='maSV' name='maSV' inputname='maSV' value={maSV} /><span className='text-danger'>{this.props.sinhVien.errors.maSV}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="hoTen">Họ tên</label>
                  <input onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='hoTen' name='hoTen' inputname='hoTen' value={hoTen} /><span className='text-danger'>{this.props.sinhVien.errors.hoTen}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="sdt">Số điện thoại</label>
                  <input onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='sdt' name='sdt' inputname='sdt' value={sdt} /><span className='text-danger'>{this.props.sinhVien.errors.sdt}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group text-left">
                  <label htmlFor="email">Email</label>
                  <input onChange={(event) => {
                    this.handleChange(event)
                  }} type="text" className="form-control" id='email' name='email' inputname='email' value={email} /><span className='text-danger'>{this.props.sinhVien.errors.email}</span>
                </div>
              </div>
            </div>
            <div className="form-group text-left">
              {!isVisible ? <button className='btn btn-success mr-3'>Thêm sinh viên</button> : null}
              {}
              {isVisible ? <button onClick={() => {
                if (this.handleSubmit()) {
                  let action = {
                    type: 'CAP_NHAT_SINH_VIEN',
                    svCapNhat: this.props.sinhVien.values
                  }
                  this.props.dispatch(action);
                  alert('Cập nhật thành công !');
                }
              }} type='button' className='btn btn-info mr-3'>Cập nhật</button> : null}
              <button onClick={() => {
                let action = {
                  type: 'RESET_FORM'
                }
                this.props.dispatch(action)
              }} type='button' className='btn btn-secondary'>Reset</button>
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
    mangSinhVien: rootReducer.QLSinhVienReducer.mangSinhVien,
    isVisible: rootReducer.QLSinhVienReducer.isVisible
  }
}


export default connect(mapStateToProps)(StudentInfo)