import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {server} from "../../config";
import { toast } from 'react-toastify';

const axios = require('axios').create({
    baseURL: server,
    headers: { 'Content-Type': 'application/json' }
});

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            phone: '',
            jwt: 'unknown',
        }
    }

    async componentDidMount() {
        const jwt = await sessionStorage.getItem('jwt');
        this.setState({jwt: JSON.parse(jwt)});
    }

    async onSubmit() {
        const {username, email, password, name, phone} = this.state;
        try {
            await axios.post('/users/signup', {username, email, password, name, phone});
            toast('با موفقیت ثبت‌نام انجام شد.', {type: toast.TYPE.SUCCESS});
            window.location.href = '/login';
        } catch (e) {
            if (e.response.data.msg) {
                toast(e.response.data.msg, {type: toast.TYPE.ERROR});
            }

            if (e.response.data.errors) {
                const [error] = e.response.data.errors;
                switch (error.param) {
                    case 'username':
                        toast('نام کاربری باید فقط با حروف و اعداد باشد', {type: toast.TYPE.ERROR});
                        break;
                    case 'email':
                        toast('فرمت ایمیل نا معتبر است', {type: toast.TYPE.ERROR});
                        break;
                    case 'password':
                        toast('رمز ورود باید حداقل از ۵ حرف تشکیل شود', {type: toast.TYPE.ERROR});
                        break;
                    case 'name':
                        toast('نام را وارد کنید', {type: toast.TYPE.ERROR});
                        break;
                    case 'phone':
                        toast('فرمت شماره موبایل نادرست است', {type: toast.TYPE.ERROR});
                        break;
                    default:
                        toast('خطای سیستمی رخ داده است', {type: toast.TYPE.ERROR});
                        break;
                }
            }
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ثبت‌نام
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    // variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="نام و نام خانوادگی"
                                    name="name"
                                    autoComplete="name"
                                    value={this.state.name}
                                    onChange={e => this.setState({ name: e.target.value })}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="شماره موبایل"
                                    name="phone"
                                    autoComplete="phone"
                                    value={this.state.phone}
                                    onChange={e => this.setState({ phone: e.target.value })}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="نام کاربری"
                                    name="username"
                                    autoComplete="username"
                                    value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="ایمیل"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="رمز عبور"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => this.onSubmit()}
                        >
                            ثبت نام
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    اکانت دارید؟ ورود
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(SignUp);