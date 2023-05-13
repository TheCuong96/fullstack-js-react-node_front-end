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
  group: ''
}
export default function ModalUser(props) {
  const [form, setForm] = useState(formDefault)
  const [validInput, setValidInput] = useState(validInputDefault)
  // const [userData, setUserData] = useState();
  const [userGroup, setUserGroup] = useState([])
  useEffect(() => {
    getGroup()
  }, [])
  const getGroup = async () => {
    let res = await userApi.fetchGroup()
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT)
      setForm({ ...form, group: res.data.DT[0].id })
    } else {
      toast.error(res.data.EM)
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
      let res = await userApi.createNewUser({
        ...form,
        groupId: form['group']
      })
      console.log('res ', res)
      if (res.data && res.data.EC === 0) {
        props.onHide()
        setForm({ ...formDefault, group: userGroup[0].id })
      } else {
        toast.error(`Error create user...`)
      }
    }
  }
  return (
    <Modal show={props.show} onHide={props.onHide} size='xl' centered>
      <h1>title</h1>
      <Form>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='email'
              onChange={handleOnchange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type='Phone'
              name='phone'
              placeholder='Phone'
              onChange={handleOnchange}
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
              onChange={handleOnchange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleOnchange}
            />
          </Form.Group>
        </Row>
        <Form.Group className='mb-3' controlId='formGridAddress1'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder='Address'
            name='address'
            onChange={handleOnchange}
          />
        </Form.Group>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              defaultValue='Choose...'
              name='sex'
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
              name='group'
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
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button variant='primary' onClick={handleConfirmUser}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
