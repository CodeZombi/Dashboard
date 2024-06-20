import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
  } from "@mui/material"
  import { useEffect, useState } from "react"
  import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined"
  import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined"
  import { ChevronRightOutlined } from "@mui/icons-material"
  import SidebarItem from "./SidebarItem"
  import { useSelector } from "react-redux"
  import { useTheme } from "@emotion/react"
  import Details from "scenes/Details"
  
  const SidebarItemCollapse = ({ item }) => {
    const [open, setOpen] = useState(false)
    const theme = useTheme();
    const lcText = item.sidebarProps.displayText.toLowerCase();
    const [active] = useState("");
    const { appState } = useSelector(state => state.appState)
  
    useEffect(() => {
      if (appState.includes(item.state)) {
        setOpen(true)
      }
    }, [appState, item])
  
    return item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
          }}
        >
          <ListItemIcon
            sx={{
              ml: "2rem",
              color:
                active === lcText
                  ? theme.palette.primary[600]
                  : theme.palette.secondary[200],
            }}
          >
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography>{item.sidebarProps.displayText}</Typography>} />
            {active === lcText && (
              <ChevronRightOutlined sx={{ ml: "auto" }} />
            )}
        
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) =>
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
          
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null
            )}
      
          </List>
        </Collapse>
      </>
    ) : null
  }
  
  export default SidebarItemCollapse
  