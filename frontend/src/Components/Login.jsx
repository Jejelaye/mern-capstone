import { useState, useEffect, useContext } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const {
    user, setUser,
    isLoading, setIsLoading,
    isError, setIsError,
    isSuccess, setIsSuccess,
    errMessage, setErrMessage
  } = useContext( AuthContext )

  useEffect(() => {
    if (isError) toast.error(errMessage)

    if (isSuccess || user) navigate('/')
  }, [user, isError, isSuccess, errMessage, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)

    const userData = {
      email,
      password,
    }

    try {
      AuthService.login(userData).then(data => {
        setIsSuccess(true)
      })
    } catch (error) {

      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

      setIsLoading(false)

      setIsError(true)

      setErrMessage(message)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
