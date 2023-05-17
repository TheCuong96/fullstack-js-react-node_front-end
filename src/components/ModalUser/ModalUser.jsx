/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import './ModalUser.scss'
import { useEffect, useState } from 'react'
import userApi from '../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash'
const validInputDefault = {
  email: true,
  phone: true,
  username: true,
  password: true,
  address: true,
  sex: true,
  group: true
}
const formDefault = {
  email: '',
  phone: '',
  username: '',
  password: '',
  address: '',
  sex: '',
  groupId: ''
}
export default function ModalUser(props) {
  const { dataEdit } = props
  const [form, setForm] = useState(formDefault)
  const [validInput, setValidInput] = useState(validInputDefault)
  // const [userData, setUserData] = useState();
  const [userGroup, setUserGroup] = useState([])
  useEffect(() => {
    getGroup()
  }, [])

  const existDataEdit = Object.keys(dataEdit).length === 0
  useEffect(() => {
    if (!existDataEdit) {
      setForm({ ...dataEdit, groupId: dataEdit.Group ? dataEdit.Group.id : '' })
    }
  }, [dataEdit])
  const getGroup = async () => {
    let res = await userApi.fetchGroup()
    if (res && res && res.EC === 0) {
      setUserGroup(res.DT)
      setForm({ ...form, groupId: res.DT[0].id })
    } else {
      toast.error(res.EM)
    }
  }
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  const checkValidateForm = (e) => {
    setValidInput(validInputDefault)
    let arr = ['email', 'phone', 'password', 'group']
    let check = true
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i]
      if (!element) {
        let _validForm = _.cloneDeep(validInputDefault)
        _validForm[element] = false
        setValidInput(_validForm)
        toast.error(`Empty input ${element}`)
        check = false
        break
      }
    }
    return check
  }

  const handleConfirmUser = async (e) => {
    let check = checkValidateForm()
    if (check === true) {
      let res = existDataEdit
        ? await userApi.createNewUser({
            ...form,
            groupId: form['groupId']
          })
        : await userApi.updateUser({
            ...form,
            groupId: form['groupId']
          })
      if (res && res.EC === 0) {
        props.onHide()
        setForm({ ...formDefault, groupId: userGroup[0].id })
      } else {
        toast.error(res.EM)
        let _validInputs = _.cloneDeep()
        _validInputs[res.DT] = false
        setValidInput(_validInputs)
      }
    }
  }

  const handleCloseModalUser = async (e) => {
    props.onHide()
    setForm(formDefault)
    setValidInput(validInputDefault)
  }
  return (
    <Modal show={props.show} onHide={handleCloseModalUser} size='xl' centered>
      <h1>{existDataEdit ? 'Create User' : 'Update User'}</h1>
      <Form>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='email'
              value={form.email}
              onChange={handleOnchange}
              disabled={!existDataEdit}
              className={`${validInput.email || 'is-invalid'} `}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type='Phone'
              name='phone'
              placeholder='Phone'
              value={form.phone}
              onChange={handleOnchange}
              disabled={!existDataEdit}
            />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              placeholder='username'
              value={form.username}
              onChange={handleOnchange}
            />
          </Form.Group>
          {existDataEdit && (
            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Password'
                value={form.password}
                onChange={handleOnchange}
              />
            </Form.Group>
          )}
        </Row>
        <Form.Group className='mb-3' controlId='formGridAddress1'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder='Address'
            name='address'
            value={form.address}
            onChange={handleOnchange}
          />
        </Form.Group>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              defaultValue='Choose...'
              name='sex'
              value={form.sex}
              onChange={handleOnchange}
            >
              <option>Female</option>
              <option>Male</option>
              <option>order</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Group</Form.Label>
            <Form.Select
              defaultValue='Choose...'
              name='groupId'
              value={form.groupId}
              onChange={handleOnchange}
            >
              {userGroup.length > 0 ? (
                userGroup.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  )
                })
              ) : (
                <option>...</option>
              )}
            </Form.Select>
          </Form.Group>
        </Row>
      </Form>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseModalUser}>
          Close
        </Button>
        <Button variant='primary' onClick={handleConfirmUser}>
          {existDataEdit ? 'Save' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
