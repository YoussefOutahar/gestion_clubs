import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField, Autocomplete } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "../../components/Typography";
import useAuth from "../../hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
    height: "100%",
    padding: "32px",
    background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
    background: "#1A2038",
    minHeight: "100vh !important",
    "& .card": {
        maxWidth: 800,
        minHeight: 400,
        margin: "1rem",
        display: "flex",
        borderRadius: 12,
        alignItems: "center",
    },
}));

// inital login credentials
const initialValues = {
    email: "",
    password: "",
    name: "",
    phone: "",
    avatar: "",
    role: "",
    remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, "Password must be 6 character length").required("Password is required!"),
    email: Yup.string().email("Invalid Email address").required("Email is required!"),
});

const JwtRegister = () => {
    const theme = useTheme();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = (values) => {
        setLoading(true);
        try {
            register(values.email, values.name, values.password, values.phone, values.avatar, values.role);
            navigate("/");
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    return (
        <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <img
                                width="100%"
                                alt="Register"
                                src="/assets/images/illustrations/posting_photo.svg"
                            />
                        </ContentBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <Box p={4} height="100%">
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            name="name"
                                            label="Name"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.name}
                                            onChange={handleChange}
                                            helperText={touched.name && errors.name}
                                            error={Boolean(errors.name && touched.name)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            helperText={touched.email && errors.email}
                                            error={Boolean(errors.email && touched.email)}
                                            sx={{ mb: 3 }}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={touched.password && errors.password}
                                            error={Boolean(errors.password && touched.password)}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="phone"
                                            type="phone"
                                            label="Phone"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="avatar"
                                            type="text"
                                            label="Avatar"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.avatar}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        /><Autocomplete
                                        freeSolo={false}
                                        multiple={false}
                                            options={[
                                                { label: "admin" },
                                                { label: "user" },
                                                { label: "guest" },
                                            ]}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    label="Role"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    value={values.avatar}
                                                    onChange={handleChange}
                                                    contentEditable={false}
                                                    sx={{ mb: 2 }}
                                                />
                                            )}
                                        />
                                        <FlexBox gap={1} alignItems="center">
                                            <Checkbox
                                                size="small"
                                                name="remember"
                                                onChange={handleChange}
                                                checked={values.remember}
                                                sx={{ padding: 0 }}
                                            />

                                            <Paragraph fontSize={13}>
                                                I have read and agree to the terms of service.
                                            </Paragraph>
                                        </FlexBox>

                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={loading}
                                            variant="contained"
                                            sx={{ mb: 2, mt: 3 }}
                                        >
                                            Regiser
                                        </LoadingButton>

                                        <Paragraph>
                                            Already have an account?
                                            <NavLink
                                                to="/session/signin"
                                                style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                                            >
                                                Login
                                            </NavLink>
                                        </Paragraph>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </JWTRegister>
    );
};

export default JwtRegister;
