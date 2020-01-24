import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {server} from '../../config';
import Link from "@material-ui/core/Link";
import {toast} from "react-toastify";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            jwt: 'unknown',
        }
    }

    async componentDidMount() {
        const jwt = await sessionStorage.getItem('jwt');
        this.setState({jwt: JSON.parse(jwt)});
    }

    async onSubmit() {
        const {username, password} = this.state;

        try {
            const res = await axios.post('/users/login', {username, password});
            const {jwt} = res.data;
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
            window.location.href = '/chat';
        } catch (e) {
            if (e.response.data.msg) {
                toast(e.response.data.msg, {type: toast.TYPE.ERROR});
            }
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ورود
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            // variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                        <TextField
                            // variant="outlined"
                            margin="normal"
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
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => this.onSubmit()}
                        >
                            ورود
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"اکانت ندارید؟ ثبت‌نام"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(SignIn);