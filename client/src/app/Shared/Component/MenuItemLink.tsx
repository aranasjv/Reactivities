import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({ children, to }: { children: ReactNode, to: string }) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold', 
                fontSize:'1.2rem',
                color: 'inherit',
                '&.active': {
                    color: '#eeff00ff'
                }
            }}>
            {children}
        </MenuItem>
    )
}