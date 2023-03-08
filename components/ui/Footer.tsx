import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { BabyChangingStationOutlined, Man2Outlined, Woman2Outlined } from "@mui/icons-material";
import Image from "next/image";


export const Footer: FC = (): ReactElement => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                //   backgroundColor: "primary",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    // alignItems="center"
                    justifyContent={"space-between"}>
                    <Grid item xs={12} sm={4}>
                        <Typography color="black" variant="h6">
                            Categorias:
                        </Typography>
                        {/* <nav aria-label="secondary mailbox folders"> */}
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component="a"
                                    href="/category/men">
                                    <Man2Outlined />
                                    <ListItemText primary="Hombres" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component="a"
                                    href="/category/women">
                                    <Woman2Outlined />
                                    <ListItemText primary="Mujeres" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component="a"
                                    href="/category/kid">
                                    <BabyChangingStationOutlined />
                                    <ListItemText primary="Niños" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        {/* </nav> */}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography color="black" variant="h6" sx={{ mb: 2 }}>
                            Contacto:
                        </Typography>
                        <Typography>
                            <b>Direccion:</b> C/ Prta del Sol, 28013
                        </Typography>
                        <Typography>Madrid, España</Typography>
                        <Typography sx={{ mt: 2 }}>
                            <b>Tel:</b> +34 915 22 99 95
                        </Typography>
                        <Typography sx={{ mt: 2, mb: 2 }}>
                            <b>Email:</b> tiendaonline@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography color="black" variant="h6" sx={{ mb: 2 }}>
                            Proximamente!
                        </Typography>
                        <Image
                            src="/store-apple.png"
                            alt="store"
                            width={"190"}
                            height={"115"}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                    <Typography color="textSecondary" variant="subtitle2">
                        {`© ${new Date().getFullYear()} | JrFullstack`}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
