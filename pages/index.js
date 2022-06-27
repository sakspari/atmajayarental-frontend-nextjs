import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import transport from "../assets/drawkit-transport-scene-3.svg"
import {useDispatch, useSelector} from "react-redux";
import {loginAuth, resetErrors, resetMessage} from "../util/store/actions/auth";
import CustomSnackbars from "../components/Snackbar";
import {setSnackbar} from "../util/store/actions/snackbars";
import {IconButton, InputAdornment} from "@material-ui/core";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Button, OutlinedInput} from "@mui/material";
import {LoginOutlined} from "@mui/icons-material";


export default function Home() {

    const dispatch = useDispatch()
    const {isAuthenticate, isLoading, errors, message} = useSelector(state => state.auth)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [unerror, setUnerror] = useState("")
    const [pwderror, setPwderror] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")

    const login = () => {
        const user = {
            email: username,
            password: password
        }
        dispatch(loginAuth(user))
    }

    const closeSnackbar = () => {
        setIsOpen(false)
        dispatch(resetErrors())
    }

    const validate = () => {
        const errors = {}
        if (username === "")
            errors.username = "email tidak boleh kosong!"
        if (password === "")
            errors.password = "password tidak boleh kosong!"

        return Object.keys(errors).length === 0 ? null : errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errorsField = validate()
        if (errorsField) {
            setUnerror(errorsField.username)
            setPwderror(errorsField.password)
        } else {
            setUnerror("")
            setPwderror("")
            // login()
            const user = {
                email: username,
                password: password
            }
            dispatch(loginAuth(user))
            // routesTo()
        }
    }

    const router = useRouter()

    const routesTo = () => {
        router.push('/dashboard')
    }

    // const authenticated = useSelector(state => state.auth.isAuthenticate)
    useEffect(() => {
        if (isAuthenticate) {
            routesTo()
        }
    }, [isAuthenticate])

    useEffect(() => {
        if (errors !== null) {
            if (errors.hasOwnProperty('email')) {
                setUnerror(errors.email)
            } else {
                // setResponseMsg(errors)
                setUnerror("")
                dispatch(setSnackbar({
                    'snackbarOpen': true,
                    'snackbarType': "error",
                    'snackbarMessage': errors,
                }))
            }
        } else if (message !== undefined && message !== null) {
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message,
            }))

        }
        dispatch(resetErrors())
        dispatch(resetMessage())

    }, [isLoading])


    return (
        <div className="mt-8 sm:mx-auto sm:w-full">
            <CustomSnackbars/>
            <div
                className="py-8 px-6 rounded-lg sm:px-10
                 flex flex-col items-center space-y-6 sm:shadow-none">
                <Image
                    src={transport}
                    alt={""}
                    height={900}
                />
                <header className="text-6xl font-black text-amber-600 text-center">Atma Jaya Rental</header>
                <form onSubmit={handleSubmit} className="mb-0 space-y-4 w-96">
                    <header className="text-3xl text-amber-600 text-center bg-amber-100 py-4">
                        Login
                    </header>
                    <OutlinedInput
                        className="w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="email"
                        variant="outlined"
                        type="email"
                        required
                        error={unerror !== ""}
                        helperText={unerror}
                    />

                    <OutlinedInput
                        className="w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        required
                        error={pwderror !== ""}
                        helperText={pwderror}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                    }}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <div className="pt-1w-full flex items-center justify-center">
                        <span className="w-full text-center">
                            mendaftar sebagai customer baru?
                            <a
                                className="pl-1 font-bold text-indigo-500"
                                href={'/customer/registration'}
                            >
                                register
                            </a>
                        </span>
                    </div>
                    <div className="pt-4 w-full flex items-center justify-center">
                        {/*<Button variant="primary" text={isLoading ? "Loading..." : "Login"}/>*/}
                        {/*<LoadingButton*/}
                        {/*    variant="contained"*/}
                        {/*    size="medium"*/}
                        {/*    color={"primary"}*/}
                        {/*    loading={isLoading}*/}
                        {/*    loadingPosition={"end"}*/}
                        {/*    onClick={handleSubmit}*/}
                        {/*    endIcon={<LoginOutlined/>}*/}
                        {/*>*/}
                        {/*    Login*/}
                        {/*</LoadingButton>*/}
                        <Button onClick={handleSubmit}
                                disabled={isLoading}
                                variant={'contained'}>
                            {isLoading ? 'loading...' : 'Login'}
                            <LoginOutlined/>
                        </Button>
                    </div>
                </form>
            </div>

            {/*{isOpen && (*/}
            {/*    <Snackbar message={responseMsg} type={snackbarType} action={() => {*/}
            {/*        closeSnackbar()*/}
            {/*    }}/>*/}
            {/*)}*/}

        </div>
    )
}
