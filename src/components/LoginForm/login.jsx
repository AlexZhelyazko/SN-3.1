import './login.sass'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUserTC } from "../../redux/auth-reducer";
import { Preloader } from '../Preloader/preloader';

export const LoginForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm({mode: 'onBlur', reValidateMode: 'onChange '})
    const onSubmit = data => dispatch(loginUserTC(data.email, data.password, true))
    const isAuth = useSelector((state) => state.auth)
    if (isAuth.isAuth) return <Navigate to='/profile' />
    return (
        <div className='login__form-wrap'>
            <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder='email' className='login__form-input' type='text' {...register("email",
                        { 
                            required: true,
                            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
                        })} style={{border: errors.password && 'solid red 1px'}}/>
                    {errors.password && <span className="login__error">Password is required</span>}
                </div>
                <div>
                    <input placeholder='password' className='login__form-input' type='password' {...register("password", { required: true })} />
                    {errors.email && <span className="login__error">Email is required</span>}
                </div>
                <input className='login__form-button' value='Log In' type='submit'/>
                <div>{isAuth.errorMessage}</div>
            </form>
        </div>
    )
}