import { useContext, useState } from 'react';
import { AuthContext, UiContext } from "../../context";
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useRouter } from "next/router";

interface Props {

}

export const SideMenu = () => {

    const router = useRouter();
    const { toggleSideMenu, isMenuOpen } = useContext(UiContext);
    const { isLoggedIn, user, logout } = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;

        navigateTo(`/search/${searchTerm}`);
    }

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }

    return (
        <Drawer
            open={isMenuOpen}
            anchor="right"
            sx={{
                backdropFilter: "blur(4px)",
                transition: "all 0.5s ease-out",
            }}
            onClose={toggleSideMenu}>
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyUp={(e) => e.key === "Enter" && onSearchTerm()}
                            type="text"
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={onSearchTerm}>
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                    
                    {
                        isLoggedIn && (
                            <>
                                {/* <ListItemButton>
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={"Perfil"} />
                                </ListItemButton> */}

                                <ListItemButton 
                                    onClick={() => navigateTo('/orders/history')}
                                
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={"Mis Ordenes"} />
                                </ListItemButton>
                            </>
                            
                        )
                        
                    }
                    

                    <ListItemButton
                        sx={{ display: { xs: "", sm: "none" } }}
                        onClick={() => navigateTo("/category/men")}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Hombres"} />
                    </ListItemButton>

                    <ListItemButton
                        sx={{ display: { xs: "", sm: "none" } }}
                        onClick={() => navigateTo("/category/women")}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Mujeres"} />
                    </ListItemButton>

                    <ListItemButton
                        sx={{ display: { xs: "", sm: "none" } }}
                        onClick={() => navigateTo("/category/kid")}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Niños"} />
                    </ListItemButton>

                    {
                        isLoggedIn ? (
                            
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <LoginOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Salir"} />
                            </ListItemButton>
                            
                        ) : (
                            <ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                                <ListItemIcon>
                                    <VpnKeyOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Ingresar"} />
                            </ListItemButton>
                        )
                    }

                    

                    {/* Admin */}
                    {user?.role === "admin" && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton
                                onClick={() => navigateTo('/admin/')}
                            >
                                <ListItemIcon>
                                    <DashboardOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"} />
                            </ListItemButton>

                            <ListItemButton
                                onClick={() => navigateTo('/admin/products')}

                            >
                                <ListItemIcon>
                                    <CategoryOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Productos"} />
                            </ListItemButton>

                            <ListItemButton
                                onClick={() => navigateTo('/admin/orders')}
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Ordenes"} />
                            </ListItemButton>

                            <ListItemButton
                                onClick={() => navigateTo('/admin/users')}                            
                            >
                                <ListItemIcon>
                                    <AdminPanelSettings />
                                </ListItemIcon>
                                <ListItemText primary={"Usuarios"} />
                            </ListItemButton>
                        </>
                        ) 
                    }
                </List>
            </Box>
        </Drawer>
    );
}