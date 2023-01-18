import { useState } from "react";
import NextLink from "next/link";
import { Box, Button, Grid, TextField, Typography, Link, Chip } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { tiendaOnlineApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";

type FormData = {
    name: string;
    email: string;
    password: string;
};

const RegisterPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    
    const onRegisteForm = async ({ email, password, name }: FormData) => {

        setShowError(false);

        try {
            const { data } = await tiendaOnlineApi.post("/user/register", {
                name,
                email,
                password,
            });

            const { token, user } = data;
            console.log({ token, user });

        } catch (error) {
            console.log("Error en las credenciales");
            setShowError(true);
            // ocultar nuevamente el error
            setTimeout(() => setShowError(false), 3000);
        }
    };
    return (
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={handleSubmit(onRegisteForm)} noValidate>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">
                                Crear cuenta
                            </Typography>
                            <Chip
                                label="No podemos registrar ese usuario / contraseña"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? "flex" : "none" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre completo"
                                variant="filled"
                                fullWidth
                                {...register("name", {
                                    required: "Este campo es requerido",
                                    minLength: {
                                        value: 2,
                                        message: "Minimo 2 caracteres",
                                    },
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register("email", {
                                    required: "Este campo es requerido",
                                    validate: validations.isEmail,
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type={"password"}
                                variant="filled"
                                fullWidth
                                {...register("password", {
                                    required: "Este campo es requerido",
                                    minLength: {
                                        value: 6,
                                        message: "Minimo 6 caracteres",
                                    },
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className="circular-btn"
                                size="large"
                                fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink
                                href="/auth/login"
                                passHref
                                legacyBehavior>
                                <Link underline="always">
                                    Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
